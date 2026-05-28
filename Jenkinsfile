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

    stage('Install Dependencies & Build') {
        agent {
            docker {
                image 'node:20'
                reuseNode true
            }
        }

        steps {
            sh 'npm install'
            sh 'node node_modules/typescript/bin/tsc'
        }
    }

    stage('Build Docker Image') {
        steps {
            sh 'docker build -t $DOCKER_IMAGE .'
        }
    }

    stage('Push Docker Image') {
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'dockerhub-creds',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {

                sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                sh 'docker push $DOCKER_IMAGE'
            }
        }
    }
}

}