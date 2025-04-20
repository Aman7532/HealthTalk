pipeline {
    agent any

    environment {
        // Retrieve the sudo password from Jenkins credentials
        SUDO_PASSWORD = credentials('SUDO_PASSWORD')
        GOOGLE_API_KEY = "AIzaSyBmspDxrTg51U-kRKRCXEmVv5n3Bki8HXw"
    }

    stages {
        stage('Checkout') {
            steps {
                // Replace with your GitHub repository URL
                git branch: 'main', url: 'https://github.com/Aman7532/HealthTalk.git'
            }
        }
        
        stage('Setup Python Environment') {
    steps {
        sh '''
            # Install venv if not already installed
            python3 -m pip install virtualenv
            
            # Create and activate a virtual environment
            python3 -m venv venv
            
            # Install packages in a specific order with fixed versions
            . venv/bin/activate
            pip install numpy==1.23.5
            pip install scikit-learn==1.2.2
            pip install -r healthcare_chatbot_backend/requirements.txt
            deactivate
        '''
    }
}

        stage('Test Model') {
            steps {
                sh '''
                    . venv/bin/activate
                    python3 training/test.py
                    deactivate
                '''
            }
        }

        stage('Train Model') {
            steps {
                script {
                    def trainImage = docker.build("aman7532/train-model:latest", '-f training/Dockerfile training')
                    withDockerRegistry([credentialsId: "DockerHubCred", url: ""]) {
                        trainImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }

        stage('Build Docker Frontend Image') {
            steps {
                dir('healthcare_chatbot_frontend') {
                    script {
                        frontendImage = docker.build("aman7532/react-app:frontend1")
                    }
                }
            }
        }

        stage('Push Docker Frontend Image') {
            steps {
                script {
                    withDockerRegistry([credentialsId: "DockerHubCred", url: ""]) {
                        frontendImage.push()
                    }
                }
            }
        }

        stage('Build Docker Backend Image') {
            steps {
                dir('healthcare_chatbot_backend') {
                    script {
                        backendImage = docker.build("aman7532/flask-app:backend1")
                    }
                }
            }
        }

        stage('Push Docker Backend Image') {
            steps {
                script {
                    withDockerRegistry([credentialsId: "DockerHubCred", url: ""]) {
                        backendImage.push()
                    }
                }
            }
        }

        stage('Deploy with Kubernetes') {
            steps {
                script {
                    sh '''
                        . venv/bin/activate
                        # Install kubectl if needed
                        pip install kubernetes
                        
                        kubectl apply -f kubernetes/frontend.yaml
                        kubectl apply -f kubernetes/backend.yaml
                        kubectl apply -f kubernetes/elasticsearch.yaml
                        kubectl apply -f kubernetes/kibana.yaml
                        kubectl apply -f kubernetes/logstash.yaml
                        
                        deactivate
                    '''
                }
            }
        }
    }
}