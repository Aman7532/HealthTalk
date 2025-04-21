# Use a known working version of Python
FROM python:3.7-slim

# Set the working directory
WORKDIR /app

# Install essential packages first
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libc6-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install packages with specific versions
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir flask==1.1.4 && \
    pip install --no-cache-dir werkzeug==1.0.1 && \
    pip install --no-cache-dir numpy==1.21.6 && \
    pip install --no-cache-dir scipy==1.7.3 && \
    pip install --no-cache-dir pandas==1.3.5 && \
    pip install --no-cache-dir scikit-learn==1.0.2 && \
    pip install --no-cache-dir nltk==3.6.7 && \
    pip install --no-cache-dir python-dotenv==1.0.0 && \
    pip install --no-cache-dir PyPDF2==3.0.1 && \
    pip install --no-cache-dir faiss-cpu==1.7.3 && \
    pip install --no-cache-dir flask_cors==3.0.10 && \
    pip install --no-cache-dir torch==1.10.0 && \
    pip install --no-cache-dir python-logstash==0.4.8 && \
    pip install --no-cache-dir python-logstash-async==2.5.0 && \
    pip install --no-cache-dir langchain==0.0.200 || echo "Failed to install langchain" && \
    pip install --no-cache-dir google-generativeai==0.1.0rc1 || echo "Failed to install google-generativeai"

# Download NLTK data
RUN python -c "import nltk; nltk.download('punkt')"

# Copy application files
COPY . .

# Create environment override file
RUN echo 'import os; os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY", "AIzaSyBmspDxrTg51U-kRKRCXEmVv5n3Bki8HXw")' > set_env.py

# Expose the Flask port
EXPOSE 8000

# Start the application
CMD ["python", "chatpdf1.py"]