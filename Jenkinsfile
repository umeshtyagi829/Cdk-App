
// retriving the AWS credentila from the jenkins credential
def awsCredentials = [[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws_sandbox']]

pipeline {
    agent any
    // jenkins nodejs global tool 
    tools {
        nodejs "NodeJS"
    }
    // setting up the aws region
    environment {
         AWS_REGION = 'us-east-1'
    }
    // setting up the aws credentials
    options {
        withCredentials(awsCredentials)
    }   
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github', url: 'git@github.com:umeshtyagi829/cdk-pipeline.git'
            }
        }
        // installing the aws cdk tool and typescript
        stage('Install') {
            steps {
                sh 'npm install -g aws-cdk typescript'

            }
        }
        // bootstrapping the aws environment
        stage('Bootstrap') {
            steps {
                sh 'npx cdk bootstrap'
            }
        }
        // building the aws cdk app
        stage('Build') {
            steps {  
                sh 'npm ci'
                sh 'npm run build'
                sh 'npx cdk synth -c VPC_NAME=VPC -c ENV_NAME=DEV'
            }
        }    
        // deploying the aws cdk app
        stage('Deploy') {
            steps {
                sh 'npx cdk deploy --require-approval=never'
            }
        }

        // destroying the aws cdk app
        stage('Destroy') {
            steps {
                sh 'npx cdk destroy --require-approval=never'
            }
        }
    }     
}


