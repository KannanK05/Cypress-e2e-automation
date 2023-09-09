pipeline {
    agent {
        docker {
            image 'cypress/included:latest' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Install Dependencies') { 
            steps {
                echo 'Installing Dependencies'
            }
        }
        stage('Build') { 
            steps {
                echo 'Build...'
            }
        }
        stage('Test') { 
            steps {
                sh 'npm run test:chrome'
            }
        }
    }
}