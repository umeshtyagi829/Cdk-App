
pipeline {
    agent any

    tools {nodejs "node"}
    
    environment {
        // AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        // AWS_SECRET_ACCESS_KEY = ('AWS_SECRET_ACCESS_KEY')
        // AWS_SESSION_TOKEN= ('AWS_SESSION_TOKEN')  
        }
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github', url: 'git@github.com:umeshtyagi829/cdk-pipeline.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install -g aws-cdk'
            }
        }

        stage('Build') {
            steps {  
                    'npm ci'
                    'npm run build'
                    'npx cdk synth -c VPC_NAME=VPC -c ENV_NAME=DEV'
            }
        }    

        stage('Deploy') {
            steps {
                sh 'cdk deploy'
            }
        }
    }     
}