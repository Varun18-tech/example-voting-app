pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Build All Services') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Test Application') {
            steps {
                echo 'Deploying services temporarily to run tests...'
                sh 'docker-compose up -d'
                sh 'docker-compose run --rm tests'
                // Clean up the temporary test environment
                sh 'docker-compose down' 
            }
        }
        stage('Deploy Final Application') {
            steps {
                echo 'Tests passed! Deploying the final application stack...'
                // This command now starts the services and leaves them running
                sh 'docker-compose up -d'
            }
        }
    }
    post {
        // The post section no longer stops the containers
        always {
            echo 'Pipeline finished.'
            sh 'docker image prune -f'
        }
    }
}
