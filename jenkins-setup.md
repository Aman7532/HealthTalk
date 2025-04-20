# Jenkins Setup Guide

This guide will walk you through setting up Jenkins for the Healthcare Chatbot application.

## Prerequisites

- JDK 11 or later
- Docker installed and running
- Docker Hub account
- Kubernetes cluster (like minikube)

## Step 1: Install Jenkins

### On macOS:

```bash
brew install jenkins-lts
```

### On Ubuntu/Debian:

```bash
sudo apt-get update
sudo apt-get install openjdk-11-jdk
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

## Step 2: Start Jenkins

### On macOS:

```bash
brew services start jenkins-lts
```

### On Ubuntu/Debian:

```bash
sudo systemctl start jenkins
```

## Step 3: Access Jenkins

1. Open a browser and navigate to: `http://localhost:8080/`
2. Follow the instructions to unlock Jenkins using the initial admin password
3. Install suggested plugins when prompted

## Step 4: Install Required Plugins

1. Go to "Manage Jenkins" > "Manage Plugins" > "Available"
2. Search for and install the following plugins:
   - Docker Pipeline
   - Docker
   - Kubernetes CLI Plugin
   - Git Integration

## Step 5: Configure Credentials

1. Go to "Manage Jenkins" > "Manage Credentials" > "Jenkins" > "Global credentials" > "Add Credentials"
2. Add the following credentials:
   - Kind: Username with password
   - ID: DockerHubCred
   - Username: Your Docker Hub username
   - Password: Your Docker Hub password
   - Description: Docker Hub Credentials

3. Add another credential:
   - Kind: Secret text
   - ID: SUDO_PASSWORD
   - Secret: Your system sudo password
   - Description: Sudo Password

## Step 6: Create Pipeline Job

1. From the Jenkins dashboard, click on "New Item"
2. Enter a name for your pipeline (e.g., "HealthcareChatbot")
3. Select "Pipeline" and click "OK"
4. In the configuration page:
   - Under "Pipeline", select "Pipeline script from SCM"
   - Select "Git" as the SCM
   - Enter your repository URL in the "Repository URL" field
   - Specify the branch (usually "main" or "master")
   - Script Path: Jenkinsfile
5. Click "Save"

## Step 7: Run the Pipeline

1. From the Jenkins dashboard, click on your pipeline job
2. Click "Build Now" to run the pipeline

## Step 8: Troubleshooting

### Docker Access Issues

If Jenkins cannot access Docker, run:

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Kubernetes Access

Make sure your Jenkins user has access to the Kubernetes configuration:

```bash
sudo cp ~/.kube/config /var/lib/jenkins/.kube/
sudo chown jenkins:jenkins /var/lib/jenkins/.kube/config
```

## Additional Notes

- Make sure Docker Hub repository names in Kubernetes YAML files match your Docker Hub username
- Update the Google API key in kubernetes/backend.yaml if needed
- For local development, you can use minikube: `minikube start` 