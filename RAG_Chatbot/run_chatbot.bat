@echo off
cd /d "%~dp0"
call ..\.venv\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo Virtual environment not found. Please ensure .venv is in the parent directory.
    pause
    exit /b
)
echo Installing/Updating dependencies...
pip install -r requirements.txt
echo Starting Chatbot...
streamlit run app.py
pause
