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

# Install the rest of the requirements
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project directory
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "chatpdf1.py"]
