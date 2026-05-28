pipeline {
agent any

environment {
    DOCKER_IMAGE = "komaljoshi17/polyglot-sandbox-automator"
}

stages {

    stage('Clone Repository') {
        steps {
            git branch: 'main', url: 'https://github.com/KomalJoshi17/polyglot_sandbox_automater.git'
        }
    }

    stage('Install Dependencies') {
        steps {
            bat 'npm install'
        }
    }

    stage('Build Project') {
        steps {
            bat 'npm run build'
        }
    }

    stage('Build Docker Image') {
        steps {
            bat 'docker build -t %DOCKER_IMAGE% .'
        }
    }

    stage('Push Docker Image') {
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'dockerhub-creds',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {

                bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'

                bat 'docker push %DOCKER_IMAGE%'
            }
        }
    }
}

}