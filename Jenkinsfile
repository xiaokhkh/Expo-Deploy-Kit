pipeline {
  agent any
  parameters {
    string(name: "BRANCH_TO_BUILD", defaultValue: "dev", description: "Git branch to build")
    choice(name: "TARGET_ENV", choices: ["dev", "prod"], description: "Target environment")
    string(name: "CHANNEL", defaultValue: "production", description: "Release channel")
    choice(name: "PLATFORM", choices: ["android", "ios", "both"], description: "Release platform")
    choice(name: "RELEASE_TYPE", choices: ["PACKAGE", "HOTPATCH"], description: "Release type")
    choice(name: "ANDROID_ARTIFACT", choices: ["APK", "AAB"], description: "Android artifact type")
    string(name: "ROLLBACK_TO", defaultValue: "", description: "Optional rollback record ID")
  }
  environment {
    TARGET_ENV = "${params.TARGET_ENV}"
    CHANNEL = "${params.CHANNEL}"
    PLATFORM = "${params.PLATFORM}"
    RELEASE_TYPE = "${params.RELEASE_TYPE}"
    ANDROID_ARTIFACT = "${params.ANDROID_ARTIFACT}"
    ROLLBACK_TO = "${params.ROLLBACK_TO}"
  }
  stages {
    stage("Checkout") {
      steps {
        checkout scm
        sh "git checkout ${params.BRANCH_TO_BUILD}"
      }
    }
    stage("Install") {
      steps {
        sh "corepack enable"
        sh "pnpm install --frozen-lockfile"
      }
    }
    stage("Release") {
      steps {
        sh "pnpm run release"
      }
    }
  }
}
