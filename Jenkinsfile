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
                // Changed to 'docker compose'
                sh 'docker compose build'
            }
        }
        stage('Test Application') {
            steps {
                echo 'Deploying services temporarily to run tests...'
                // Changed to 'docker compose'
                sh 'docker compose up -d'

                echo 'Running health check tests...'
                // Changed to 'docker compose'
                sh 'docker compose run --rm tests'

                // Clean up the temporary test environment
                // Changed to 'docker compose'
                sh 'docker compose down' 
            }
        }
        stage('Deploy Final Application') {
            steps {
                echo 'Tests passed! Deploying the final application stack...'
                // This command now starts the services and leaves them running
                // Changed to 'docker compose'
                sh 'docker compose up -d'
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
