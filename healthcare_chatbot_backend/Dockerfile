# Use a specific Python version to avoid compatibility issues
FROM python:3.9-slim

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

# Install werkzeug with a compatible version first
RUN pip install --no-cache-dir werkzeug==2.0.3

# Install Flask with a compatible version
RUN pip install --no-cache-dir flask==2.0.3

# Install other packages individually to ensure compatibility
RUN pip install --no-cache-dir python-dotenv==1.0.0 && \
    pip install --no-cache-dir PyPDF2==3.0.1 && \
    pip install --no-cache-dir pandas==1.5.3 && \
    pip install --no-cache-dir flask_cors==4.0.0 && \
    pip install --no-cache-dir python-logstash==0.4.8 && \
    pip install --no-cache-dir python-logstash-async==2.5.0

# Install AI packages with fallbacks
RUN pip install --no-cache-dir google-generativeai || pip install --no-cache-dir google-generativeai==0.1.0rc1
RUN pip install --no-cache-dir langchain || pip install --no-cache-dir langchain==0.0.200
RUN pip install --no-cache-dir langchain-community || pip install --no-cache-dir langchain-community==0.0.5
RUN pip install --no-cache-dir faiss-cpu || pip install --no-cache-dir faiss-cpu==1.7.3
RUN pip install --no-cache-dir torch || pip install --no-cache-dir torch==1.13.0

# Try to install Google AI packages with fallbacks
RUN pip install --no-cache-dir google-ai-generativelanguage || echo "Could not install google-ai-generativelanguage, proceeding anyway"
RUN pip install --no-cache-dir langchain-google-genai || echo "Could not install langchain-google-genai, proceeding anyway"

# Copy the entire project directory
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "chatpdf1.py"]