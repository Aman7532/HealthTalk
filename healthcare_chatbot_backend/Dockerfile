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

# Copy the requirements file
COPY requirements.txt .

# Install specific versions of critical packages first
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir setuptools wheel && \
    pip install --no-cache-dir flask==1.1.4 && \
    pip install --no-cache-dir werkzeug==1.0.1 && \
    pip install --no-cache-dir jinja2==2.11.3 && \
    pip install --no-cache-dir markupsafe==2.0.1

# Install scientific packages
RUN pip install --no-cache-dir numpy==1.19.5 && \
    pip install --no-cache-dir scipy==1.7.3 && \
    pip install --no-cache-dir pandas==1.3.5 && \
    pip install --no-cache-dir scikit-learn==1.0.2

# Install AI related packages
RUN pip install --no-cache-dir torch==1.10.2 && \
    pip install --no-cache-dir nltk==3.6.7 && \
    pip install --no-cache-dir faiss-cpu==1.7.2 || pip install --no-cache-dir faiss-cpu==1.7.0

# Install Flask-related packages
RUN pip install --no-cache-dir flask_cors==3.0.10 && \
    pip install --no-cache-dir python-dotenv==1.0.0

# Install PDF and file handling libraries
RUN pip install --no-cache-dir PyPDF2==2.12.1

# Install logging libraries
RUN pip install --no-cache-dir python-logstash==0.4.8 && \
    pip install --no-cache-dir python-logstash-async==2.5.0

# Install LangChain and Google AI packages
RUN pip install --no-cache-dir langchain==0.0.150 || pip install --no-cache-dir langchain==0.0.139 && \
    pip install --no-cache-dir langchain-community==0.0.5 || pip install --no-cache-dir langchain-community==0.0.4 && \
    pip install --no-cache-dir google-api-python-client && \
    pip install --no-cache-dir google-auth

# Attempt to install Google Generative AI packages
RUN pip install --no-cache-dir google-generativeai==0.1.0rc1 || echo "Could not install google-generativeai" && \
    pip install --no-cache-dir langchain-google-genai==0.0.1 || echo "Could not install langchain-google-genai"

# Download NLTK data
RUN python -c "import nltk; nltk.download('punkt')"

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Set environment variable for the API key
ENV GOOGLE_API_KEY="AIzaSyBmspDxrTg51U-kRKRCXEmVv5n3Bki8HXw"

# Run the application
CMD ["python", "chatpdf1.py"]