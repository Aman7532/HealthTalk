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
        
        stage('Setup Conda Environment') {
            steps {
                sh '''
                    # Install miniconda if not already installed
                    if [ ! -d "$HOME/miniconda3" ]; then
                        curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
                        bash Miniconda3-latest-MacOSX-x86_64.sh -b
                        rm Miniconda3-latest-MacOSX-x86_64.sh
                    fi
                    
                    # Add conda to path
                    export PATH="$HOME/miniconda3/bin:$PATH"
                    
                    # Remove existing environment if it exists
                    conda env remove -n healthcare_env -y || true
                    
                    # Create conda environment
                    conda create -y -n healthcare_env python=3.9
                    
                    # Activate conda environment
                    source $HOME/miniconda3/bin/activate healthcare_env
                    
                    # Install packages with conda first
                    conda install -y numpy=1.23.5 scipy pandas scikit-learn=1.2.2
                    
                    # Install remaining packages with pip
                    pip install flask google-generativeai python-dotenv langchain PyPDF2 faiss-cpu
                    pip install langchain_google_genai torch langchain-community nltk flask_cors python-logstash python-logstash-async
                    
                    # Deactivate conda environment
                    conda deactivate
                '''
            }
        }

        stage('Test Model') {
            steps {
                sh '''
                    export PATH="$HOME/miniconda3/bin:$PATH"
                    source $HOME/miniconda3/bin/activate healthcare_env
                    python3 training/test.py
                    conda deactivate
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
                        export PATH="$HOME/miniconda3/bin:$PATH"
                        source $HOME/miniconda3/bin/activate healthcare_env
                        
                        # Install kubernetes python client if needed
                        pip install kubernetes
                        
                        kubectl apply -f kubernetes/frontend.yaml
                        kubectl apply -f kubernetes/backend.yaml
                        kubectl apply -f kubernetes/elasticsearch.yaml
                        kubectl apply -f kubernetes/kibana.yaml
                        kubectl apply -f kubernetes/logstash.yaml
                        
                        conda deactivate
                    '''
                }
            }
        }
    }
}