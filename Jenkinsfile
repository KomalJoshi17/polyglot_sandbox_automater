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
                    -Dsonar.host.url=http://localhost:9000
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
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push DockerHub') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Push Nexus') {
            steps {
                sh '''
                docker tag $DOCKER_IMAGE $NEXUS_IMAGE
                docker push $NEXUS_IMAGE
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop psa2-app || true
                docker rm psa2-app || true

                docker run -d -p 3000:3000 \
                --name psa2-app \
                $DOCKER_IMAGE
                '''
            }
        }
    }
}