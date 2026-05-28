pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "komaljoshi17/polyglot-sandbox-automator"
        NEXUS_IMAGE = "localhost:8083/polyglot-sandbox-automator"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/KomalJoshi17/polyglot_sandbox_automater.git'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    sonar-scanner \
                    -Dsonar.projectKey=polyglot-sandbox-automator \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://localhost:9000 \
                    -Dsonar.login=YOUR_SONAR_TOKEN
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'sudo docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push DockerHub') {
            steps {
                sh 'sudo docker push $DOCKER_IMAGE'
            }
        }

        stage('Push Nexus') {
            steps {
                sh '''
                sudo docker tag $DOCKER_IMAGE $NEXUS_IMAGE
                sudo docker push $NEXUS_IMAGE
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                sudo docker stop psa2-app || true
                sudo docker rm psa2-app || true

                sudo docker run -d -p 3000:3000 \
                --name psa2-app \
                $DOCKER_IMAGE
                '''
            }
        }
    }
}