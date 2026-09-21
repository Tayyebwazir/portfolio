import streamlit as st
import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Page Config
st.set_page_config(page_title="Tayyeb's AI Assistant", page_icon="🤖", layout="wide")

# Custom CSS
st.markdown("""
<style>
    #MainMenu, footer, header { visibility: hidden; }
    .stApp { background: linear-gradient(145deg, #120913, #090d12 58%, #231021); color: #fff; }
    .block-container { padding: 1.4rem 1.2rem 6rem; max-width: 900px; }
    h1 { color: #fff !important; font-size: 1.65rem !important; }
    .stChatMessage { border: 1px solid rgba(255, 103, 156, .26); border-radius: 14px; padding: 12px; margin-bottom: 9px; background: rgba(255,255,255,.035); }
    .stChatMessage p, .stChatMessage div, [data-testid="stChatMessageContent"], [data-testid="stChatMessageContent"] p { color: #ffffff !important; }
    .stButton button { background: #311326; color: #ffd9e7; border: 1px solid #e84f86; border-radius: 10px; width: 100%; text-align: left; }
    .stButton button:hover { background: #e94c82; color: white; border-color: #ff83ae; }
    [data-testid="stChatInput"] { background: #000000 !important; border: 1px solid #ef5d91; border-radius: 14px; box-shadow: 0 0 25px rgba(239, 93, 145, .18); }
    [data-testid="stChatInput"] textarea, [data-testid="stChatInput"] [data-baseweb="textarea"], [data-testid="stChatInput"] [data-baseweb="base-input"] { color: #ffffff !important; background: #000000 !important; font-size: 1rem !important; }
    [data-testid="stChatInput"] textarea::placeholder { color: #ffbad1 !important; opacity: 1; }
    [data-testid="stChatInput"] textarea, [data-testid="stChatInput"] textarea:focus { caret-color: #ff6d9e !important; background: #000000 !important; }
    [data-testid="stChatInput"] button { color: #ff77a6; }
</style>
""", unsafe_allow_html=True)

st.title("Ask About Tayyeb")
st.markdown("**Your CV-powered AI assistant.** Ask about Tayyeb's skills, AI experience, professional journey, or projects.")

@st.cache_resource
def load_and_process_data():
    documents = []
    
    # Load CV
    cv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "TayyebUllah_Final_Resume .pdf")
    if os.path.exists(cv_path):
        try:
            loader = PyPDFLoader(cv_path)
            documents.extend(loader.load())
        except Exception as e:
            st.error(f"Error loading CV: {e}")
    else:
        st.warning(f"CV file not found at {cv_path}")

    if not documents:
        return None

    # Split documents
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)
    
    # Create Embeddings (CPU fix)
    embeddings = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2",
        model_kwargs={'device': 'cpu'}
    )
    
    # Create Vector Store
    vectorstore = FAISS.from_documents(texts, embeddings)
    return vectorstore

def get_conversation_chain(vectorstore):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        st.error("GROQ_API_KEY not found in environment. Please check your .env file.")
        st.stop()

    llm = ChatGroq(
        temperature=0, 
        model_name="openai/gpt-oss-20b", 
        groq_api_key=api_key
    )
    
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
    
    # Contextualize question prompt
    contextualize_q_system_prompt = (
        "Given a chat history and the latest user question "
        "which might reference context in the chat history, "
        "formulate a standalone question which can be understood "
        "without the chat history. Do NOT answer the question, "
        "just reformulate it if needed and otherwise return it as is."
    )
    contextualize_q_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", contextualize_q_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    history_aware_retriever = create_history_aware_retriever(
        llm, retriever, contextualize_q_prompt
    )

    # Answer question prompt
    system_prompt = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer "
        "the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the "
        "answer concise."
        "\n\n"
        "{context}"
    )
    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
    return rag_chain

# Initialize Session State
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []
if "process_complete" not in st.session_state:
    st.session_state.process_complete = False

# Sidebar Info
st.sidebar.header("About")
st.sidebar.info("This bot uses RAG to answer questions about Tayyeb Ullah's CV .")

# Main Processing
with st.spinner("Initializing Chatbot..."):
    vectorstore = load_and_process_data()
    if vectorstore:
        st.session_state.qa_chain = get_conversation_chain(vectorstore)
        st.session_state.process_complete = True
    else:
        st.error("Could not load any data. Please check files and connections.")

# Chat Interface
if st.session_state.process_complete:
    user_query = st.chat_input("Ask anything about Tayyeb's CV...")
    final_query = user_query

    if final_query:
        # Display chat history
        for message in st.session_state.chat_history:
            if isinstance(message, HumanMessage):
                with st.chat_message("user"):
                    st.markdown(message.content)
            else:
                with st.chat_message("assistant"):
                    st.markdown(message.content)

        # Process new query
        with st.chat_message("user"):
            st.markdown(final_query)
        
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                response = st.session_state.qa_chain.invoke({
                    "input": final_query,
                    "chat_history": st.session_state.chat_history
                })
                answer = response["answer"]
                st.markdown(answer)
        
        # Update history
        st.session_state.chat_history.extend([
            HumanMessage(content=final_query),
            AIMessage(content=answer)
        ])
else:
    st.info("👋 Please wait while we prepare the chatbot.")
