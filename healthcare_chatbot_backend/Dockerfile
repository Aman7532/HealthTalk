# Use a specific Python version that works with Flask and its dependencies
FROM python:3.7-slim

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    libc-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy all application files
COPY . .

# Install specific versions of critical packages first with proper dependency order
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir setuptools wheel && \
    pip install --no-cache-dir markupsafe==2.0.1 && \
    pip install --no-cache-dir itsdangerous==1.1.0 && \
    pip install --no-cache-dir jinja2==2.11.3 && \
    pip install --no-cache-dir werkzeug==1.0.1 && \
    pip install --no-cache-dir flask==1.1.4

# Install Flask extensions
RUN pip install --no-cache-dir flask_cors==3.0.10 && \
    pip install --no-cache-dir python-dotenv==0.19.2

# Install scientific packages
RUN pip install --no-cache-dir numpy==1.19.5 && \
    pip install --no-cache-dir scipy==1.7.3 && \
    pip install --no-cache-dir pandas==1.3.5 && \
    pip install --no-cache-dir scikit-learn==1.0.2

# Install PyTorch with fallback options
RUN pip install --no-cache-dir torch==1.9.1 || \
    pip install --no-cache-dir torch==1.9.0 || \
    pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch==1.9.1

# Install NLTK and download punkt
RUN pip install --no-cache-dir nltk==3.6.7
RUN python -c "import nltk; nltk.download('punkt')"

# Install FAISS with fallbacks
RUN pip install --no-cache-dir faiss-cpu==1.7.2 || \
    pip install --no-cache-dir faiss-cpu==1.7.0 || \
    echo "Failed to install faiss-cpu, continuing anyway"

# Install PDF handling library with fallbacks
RUN pip install --no-cache-dir PyPDF2==2.0.0 || \
    pip install --no-cache-dir PyPDF2==1.28.0

# Install LangChain with fallbacks
RUN pip install --no-cache-dir langchain==0.0.139 || \
    pip install --no-cache-dir langchain==0.0.129 || \
    echo "Failed to install langchain"

# Try to install langchain-community
RUN pip install --no-cache-dir langchain-community==0.0.5 || \
    pip install --no-cache-dir langchain-community==0.0.4 || \
    echo "Failed to install langchain-community"

# Install Google AI packages
RUN pip install --no-cache-dir google-api-python-client || echo "Failed to install google-api-python-client"
RUN pip install --no-cache-dir google-auth || echo "Failed to install google-auth"
RUN pip install --no-cache-dir google-generativeai || echo "Failed to install google-generativeai"
RUN pip install --no-cache-dir langchain-google-genai==0.0.1 || echo "Failed to install langchain-google-genai"

# Install logging libraries (optional)
RUN pip install --no-cache-dir python-logstash==0.4.8 || echo "Failed to install python-logstash"
RUN pip install --no-cache-dir python-logstash-async==2.5.0 || echo "Failed to install python-logstash-async"

# Set environment variable for Flask
ENV FLASK_APP=chatpdf1.py
ENV FLASK_ENV=production
ENV GOOGLE_API_KEY="AIzaSyBmspDxrTg51U-kRKRCXEmVv5n3Bki8HXw"

# Create a wrapper script to ensure the application starts properly
RUN echo '#!/bin/bash\n\
echo "Starting Flask application..."\n\
python chatpdf1.py || { echo "Error running chatpdf1.py, starting fallback server"; python -m flask run --host=0.0.0.0 --port=8000; }\n\
' > /app/start.sh && chmod +x /app/start.sh

# Expose the port
EXPOSE 8000

# Command to run the application
CMD ["/app/start.sh"]