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

# Install packages individually to ensure compatibility
RUN pip install --no-cache-dir flask==2.2.3 && \
    pip install --no-cache-dir python-dotenv==1.0.0 && \
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

# Create a simple wrapper script to handle missing dependencies
RUN echo '#!/usr/bin/env python\n\
import os\n\
import sys\n\
\n\
# Set Google API key from environment\n\
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY", "")\n\
\n\
# Try to import modules, if they fail, print helpful message\n\
try:\n\
    import chatpdf1\n\
except ImportError as e:\n\
    print(f"Error importing modules: {e}")\n\
    print("Some dependencies could not be installed, but application will try to run anyway.")\n\
    sys.exit(1)\n\
\n\
# Run the application\n\
if __name__ == "__main__":\n\
    import chatpdf1\n\
' > /app/wrapper.py

# Make the wrapper script executable
RUN chmod +x /app/wrapper.py

# Expose the port the app runs on
EXPOSE 8000

# Run the application with the wrapper
CMD ["python", "chatpdf1.py"]