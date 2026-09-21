# Intelligent Document Assistant (Groq Edition)

This is a high-performance **RAG Chatbot** powered by **Groq** (using Llama 3) for ultra-fast inference and **HuggingFace** for cost-effective embedding.

## Features
- **Ultra-Fast Responses**: Leveraging Groq's LPU inference engine with Llama 3 8B.
- **Cost-Effective**: Uses local/free embeddings from HuggingFace (runs on CPU).
- **PDF Analysis**: Chat with any uploaded PDF document.

## Setup & Installation

1.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the Application**:
    ```bash
    streamlit run app.py
    ```

3.  **Usage**:
    - Enter your **Groq API Key** in the sidebar (Get one for free at [console.groq.com](https://console.groq.com)).
    - Upload a PDF file.
    - Experience blazing fast RAG!

## Tech Stack
- **Frontend**: Streamlit
- **LLM**: Meta Llama 3 (via Groq API)
- **Embeddings**: all-MiniLM-L6-v2 (via LangChain HuggingFace)
- **Vector Store**: FAISS
