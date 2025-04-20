# Docker and Kubernetes Setup Guide

This guide will help you set up Docker and Kubernetes for the Healthcare Chatbot application.

## Docker Setup

### Installing Docker

#### On macOS:
1. Download and install Docker Desktop from [Docker's website](https://www.docker.com/products/docker-desktop/)
2. Launch Docker Desktop after installation

#### On Ubuntu/Debian:
```bash
# Update package index
sudo apt-get update

# Install dependencies
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Add your user to the docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Verify Docker Installation
```bash
docker --version
docker run hello-world
```

## Docker Hub Setup

1. Create an account on [Docker Hub](https://hub.docker.com/)
2. Login to Docker Hub from command line:
```bash
docker login
```

## Kubernetes Setup with Minikube

### Installing Minikube

#### On macOS:
```bash
# Using Homebrew
brew install minikube

# Or using direct download
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

#### On Ubuntu/Debian:
```bash
# Download the binary
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

# Install the binary
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

### Install kubectl
kubectl is a command-line tool for controlling Kubernetes clusters.

#### On macOS:
```bash
brew install kubectl
```

#### On Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

### Start Minikube
```bash
minikube start
```

### Verify Kubernetes Installation
```bash
kubectl version
kubectl get nodes
```

## Deploying the Application

1. Build and push Docker images:
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

2. Update Kubernetes YAML files:
   - Make sure to replace `YOUR_DOCKERHUB_USERNAME` in the YAML files with your actual Docker Hub username

3. Apply Kubernetes configurations:
```bash
kubectl apply -f kubernetes/backend.yaml
kubectl apply -f kubernetes/frontend.yaml
kubectl apply -f kubernetes/elasticsearch.yaml
kubectl apply -f kubernetes/kibana.yaml
kubectl apply -f kubernetes/logstash.yaml
```

4. Verify deployments:
```bash
kubectl get pods
kubectl get services
```

5. Access the application:
```bash
# Get frontend URL
minikube service react-service --url

# Get backend URL
minikube service flask-service --url
```

## Troubleshooting

### Docker Issues
- If you get permission errors, make sure your user is in the docker group:
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Kubernetes Issues
- If pods are not pulling images, check if the images exist in your Docker Hub account
- Verify that image names in YAML files match what you've pushed to Docker Hub
- Check pod status and logs:
```bash
kubectl get pods
kubectl describe pod POD_NAME
kubectl logs POD_NAME
``` 