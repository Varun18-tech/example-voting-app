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
        // This is the new stage that runs your tests
        stage('Test Application') {
            steps {
                echo 'Deploying services temporarily to run tests...'
                // Start all services in the background so they can be tested
                sh 'docker-compose up -d'

                echo 'Running health check tests...'
                // Run the 'tests' service. If any tests fail, it will stop the pipeline.
                sh 'docker-compose run --rm tests'
            }
        }
        stage('Deploy Application Stack') {
            steps {
                echo 'Tests passed! Redeploying the final stack...'
                // We run 'up -d' again to ensure everything is running fresh after the tests.
                sh 'docker-compose up -d'
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished. Tearing down the environment...'
            // This command will always run to stop and remove containers after the build.
            sh 'docker-compose down' 
            sh 'docker image prune -f'
        }
    }
}
