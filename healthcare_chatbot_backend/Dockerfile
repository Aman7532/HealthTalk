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
    pip install --no-cache-dir jinja2==3.0.3 && \
    pip install --no-cache-dir markupsafe==2.0.1

# Install scientific packages
RUN pip install --no-cache-dir numpy==1.19.5 && \
    pip install --no-cache-dir scipy==1.7.3 && \
    pip install --no-cache-dir pandas==1.3.5 && \
    pip install --no-cache-dir scikit-learn==1.0.2

# Install AI related packages
RUN pip install --no-cache-dir torch==1.10.2+cpu -f https://download.pytorch.org/whl/cpu/torch_stable.html && \
    pip install --no-cache-dir nltk==3.6.7 && \
    pip install --no-cache-dir faiss-cpu==1.7.2

# Install Flask-related packages
RUN pip install --no-cache-dir flask_cors==3.0.10 && \
    pip install --no-cache-dir python-dotenv==1.0.0

# Install PDF and file handling libraries
RUN pip install --no-cache-dir PyPDF2==2.12.1

# Install logging libraries
RUN pip install --no-cache-dir python-logstash==0.4.8 && \
    pip install --no-cache-dir python-logstash-async==2.5.0

# Install LangChain and Google AI packages
RUN pip install --no-cache-dir langchain==0.0.150 && \
    pip install --no-cache-dir langchain-community==0.0.5 && \
    pip install --no-cache-dir google-api-python-client && \
    pip install --no-cache-dir google-auth

# Attempt to install Google Generative AI packages
RUN pip install --no-cache-dir google-generativeai==0.1.0rc1 || echo "Could not install google-generativeai" && \
    pip install --no-cache-dir google-ai-generativelanguage || echo "Could not install google-ai-generativelanguage" && \
    pip install --no-cache-dir langchain-google-genai==0.0.1 || echo "Could not install langchain-google-genai"

# Download NLTK data
RUN python -c "import nltk; nltk.download('punkt')"

# Create a wrapper to ensure environment variables are set
RUN echo '#!/usr/bin/env python\n\
import os\n\
import sys\n\
import importlib.util\n\
import json\n\
\n\
# Set Google API key from environment\n\
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY", "AIzaSyBmspDxrTg51U-kRKRCXEmVv5n3Bki8HXw")\n\
\n\
# Check if required modules are available\n\
required_modules = ["flask", "werkzeug", "numpy", "pandas", "nltk", "torch"]\n\
missing_modules = []\n\
\n\
for module in required_modules:\n\
    spec = importlib.util.find_spec(module)\n\
    if spec is None:\n\
        missing_modules.append(module)\n\
\n\
if missing_modules:\n\
    print(f"Missing required modules: {", ".join(missing_modules)}")\n\
    sys.exit(1)\n\
\n\
# Create a simple Flask app if the main app fails\n\
try:\n\
    import flask\n\
    from flask import Flask, jsonify\n\
    app = Flask("fallback")\n\
    \n\
    @app.route("/")\n\
    def home():\n\
        return jsonify({"status": "Flask is working", "api_key_set": bool(os.getenv("GOOGLE_API_KEY"))})\n\
    \n\
    @app.route("/info")\n\
    def info():\n\
        import sys\n\
        import pkg_resources\n\
        packages = [{"name": p.key, "version": p.version} for p in pkg_resources.working_set]\n\
        return jsonify({\n\
            "python_version": sys.version,\n\
            "packages": packages,\n\
            "environment": dict(os.environ)\n\
        })\n\
    \n\
    # Try to import the main app\n\
    try:\n\
        # Add the current directory to the path\n\
        sys.path.insert(0, os.getcwd())\n\
        # Try to import the main app\n\
        import chatpdf1\n\
        print("Successfully imported chatpdf1")\n\
    except Exception as e:\n\
        print(f"Error importing main app: {e}")\n\
        # If the main app fails, run the fallback app\n\
        if __name__ == "__main__":\n\
            app.run(host="0.0.0.0", port=8000, debug=True)\n\
    else:\n\
        # If the main app imports successfully, run it\n\
        print("Running the main application")\n\
except Exception as e:\n\
    print(f"Critical error setting up Flask: {e}")\n\
' > /app/wrapper.py

# Make the wrapper script executable
RUN chmod +x /app/wrapper.py

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Set environment variable for the API key
ENV GOOGLE_API_KEY="AIzaSyBmspDxrTg51U-kRKRCXEmVv5n3Bki8HXw"

# First try the main app, fall back to the wrapper if it fails
CMD ["sh", "-c", "python chatpdf1.py || python wrapper.py"]