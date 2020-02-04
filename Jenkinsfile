node{
  def gitUrl        = "https://github.com/ErickYataco/back-jenkins.git"
  def ImageName     = "erickyataco/lemon-back"
  def gitCred 	    = "github"
  def dockerhubCred = "dockerhub"

  try{
  stage('Checkout'){
    git credentialsId: "$gitCred", url: "$gitUrl"
    // tag image with th commit id
    sh "git rev-parse --short HEAD > .git/commit-id"
    imageTag = readFile('.git/commit-id').trim()

  }
  stage('RUN Unit Tests'){
      sh "npm install"
    //   sh "npm test"
  }
  stage('Docker Build, Push'){
    withDockerRegistry([credentialsId: "${dockerhubCred}", url: 'https://index.docker.io/v1/']) {
      sh "docker build -t ${ImageName}:${imageTag} ."
      sh "docker tag ${ImageName}:${imageTag} ${ImageName}:latest"
      sh "docker push ${ImageName}"
        }

  }

  stage('Deploy back'){
    sh "aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId]' --filters 'Name=tag-value,Values=MYTAG' --output text |
        grep stopped |
        awk '{print $2}'"

  }

  } catch (err) {
      currentBuild.result = 'FAILURE'
  }
}