# Healthcare Chatbot Application

A medical chat application with disease prediction capabilities, built with React frontend and Flask backend. This project uses containerization with Docker and Kubernetes for deployment.

## Project Overview

This healthcare chatbot application consists of:
- React frontend for user interaction
- Flask backend with ML models for disease prediction and medical consultation
- Containerized with Docker
- Deployed with Kubernetes
- CI/CD pipeline with Jenkins

## Prerequisites

- Docker
- Kubernetes (minikube or other Kubernetes cluster)
- Jenkins
- Git
- Python 3.x
- Node.js
- kubectl

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Aman7532/HealthTalk
cd YOUR_REPO
```

### 2. Configure Jenkins

1. Install Jenkins on your machine or server.
2. Install the following Jenkins plugins:
   - Docker Pipeline
   - Kubernetes CLI
   - Git Integration

3. Add the following credentials to Jenkins:
   - DockerHubCred: Your Docker Hub credentials
   - SUDO_PASSWORD: Your sudo password for local operations

### 3. Configure Kubernetes

1. Start your Kubernetes cluster (e.g., minikube):
```bash
minikube start
```

2. Update the Kubernetes YAML files in the `kubernetes` directory:
   - Replace `YOUR_DOCKERHUB_USERNAME` with your actual Docker Hub username
   - The Google API key is already set in the configuration

### 4. Configure the Jenkins Pipeline

1. Create a new pipeline job in Jenkins
2. Point it to your GitHub repository
3. Use the Jenkinsfile in the repository for the pipeline definition

### 5. Manual Deployment (Optional)

If you want to deploy the application manually:

**Build and Push Docker Images:**
```bash
# Backend
cd healthcare_chatbot_backend
docker build -t YOUR_DOCKERHUB_USERNAME/flask-app:backend1 .
docker push YOUR_DOCKERHUB_USERNAME/flask-app:backend1

# Frontend
cd ../healthcare_chatbot_frontend
docker build -t YOUR_DOCKERHUB_USERNAME/react-app:frontend1 .
docker push YOUR_DOCKERHUB_USERNAME/react-app:frontend1
```

**Deploy to Kubernetes:**
```bash
kubectl apply -f kubernetes/backend.yaml
kubectl apply -f kubernetes/frontend.yaml
kubectl apply -f kubernetes/elasticsearch.yaml
kubectl apply -f kubernetes/kibana.yaml
kubectl apply -f kubernetes/logstash.yaml
```

### 6. Accessing the Application

Once deployed, you can access the application using these commands:

```bash
# Get the URL for the frontend service
minikube service react-service --url

# Get the URL for the backend service
minikube service flask-service --url
```

## Architecture

- **Frontend**: React application that provides the user interface
- **Backend**: Flask API that integrates with Google's generative AI for chat functionality and uses ML models for disease prediction
- **ELK Stack**: For logging and monitoring
- **CI/CD**: Jenkins pipeline for continuous integration and deployment
- **Containerization**: Docker for packaging the application
- **Orchestration**: Kubernetes for container orchestration and scaling

## License

[Include license information here]