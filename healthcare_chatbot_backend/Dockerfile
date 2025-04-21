# Use a specific Python version to avoid compatibility issues
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file 
COPY requirements.txt .

# Install NumPy and other dependencies with specific versions before other packages
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir numpy==1.21.6 && \
    pip install --no-cache-dir scipy==1.7.3 && \
    pip install --no-cache-dir scikit-learn==1.0.2 && \
    pip install --no-cache-dir nltk==3.7

# Now install NLTK data before other requirements
RUN python -m nltk.downloader punkt

# Install packages individually to ensure compatibility
RUN pip install --no-cache-dir flask==2.2.3 && \
    pip install --no-cache-dir google-generativeai==0.3.1 && \
    pip install --no-cache-dir python-dotenv==1.0.0 && \
    pip install --no-cache-dir langchain==0.0.267 && \
    pip install --no-cache-dir PyPDF2==3.0.1 && \
    pip install --no-cache-dir pandas==1.5.3 && \
    pip install --no-cache-dir faiss-cpu==1.7.4 && \
    pip install --no-cache-dir langchain-community==0.0.10 && \
    pip install --no-cache-dir flask_cors==4.0.0 && \
    pip install --no-cache-dir python-logstash==0.4.8 && \
    pip install --no-cache-dir python-logstash-async==2.5.0 && \
    pip install --no-cache-dir torch==1.13.1 && \
    pip install --no-cache-dir google-ai-generativelanguage==0.3.3

# Install langchain_google_genai with compatibility flag
RUN pip install --no-cache-dir langchain-google-genai==0.0.3 || echo "Could not install langchain-google-genai, proceeding anyway"

# Copy the entire project directory
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "chatpdf1.py"]