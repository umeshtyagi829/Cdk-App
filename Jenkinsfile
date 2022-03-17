
def awsCredentials = [[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws_sandbox']]

pipeline {
    agent any

    tools {
        tool name: 'NodeJS', type: 'nodejs'
    }
    
    environment {
         AWS_REGION = 'us-east-1'
    }

    options {
        disableConcurrentBuilds()
        parallelsAlwaysFailFast()
        timestamps()
        withCredentials(awsCredentials)
    }   
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github', url: 'git@github.com:umeshtyagi829/cdk-pipeline.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install -g aws-cdk typescript'

            }
        }

        stage('Build') {
            steps {  
                sh 'npm ci'
                sh 'npm run build'
                sh 'npx cdk synth -c VPC_NAME=VPC -c ENV_NAME=DEV'
            }
        }    

        stage('Deploy') {
            steps {
                sh 'cdk deploy --require-approval=never'
            }
        }
    }     
}


