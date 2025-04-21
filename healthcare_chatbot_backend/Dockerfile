# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install the dependencies
COPY requirements.txt .

# Install packages with specific versions to fix compatibility issues
RUN pip install numpy==1.23.5
RUN pip install scipy==1.9.3
RUN pip install scikit-learn==1.2.2

# Install the rest of the requirements
RUN pip install --no-cache-dir -r requirements.txt

# Download necessary NLTK data
RUN python -c "import nltk; nltk.download('punkt')"

# Copy the entire project directory
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "chatpdf1.py"]