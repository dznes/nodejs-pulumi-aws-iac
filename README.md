# 🚀 AWS Deployment Workshop

This repository contains the steps needed to set up a deployment environment on AWS using AWS CLI, Pulumi, and Docker.
This is a DevOps base project using IaC (Infrastructure as Code), using Typescript in this case.
Configuring your AWS and Pulumi credentials, you are able to manage and control the project insfrastructure with your prefered code.

---

## 📦 Prerequisites
Ensure you are using a Linux-based machine (preferably Ubuntu/Debian).
If using another OS make the ajustments needed to run on it.

### ✅ Tools to Install:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html)
- [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
- [Docker](https://docs.docker.com/engine/install/)

**Verify Installation**

```sh
aws --version
pulumi version
docker -v
```

---

## 🔧 Installing Required Tools

### 1. Update packages and install basic dependencies

```sh
sudo apt update
sudo apt install -y python3 python3-pip unzip curl
```

---

### 2. Install AWS CLI

```sh
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 3. Configure AWS Credentials

```sh
aws configure
```

**You will be prompted to enter:**

- **AWS Access Key ID**: Your access key
- **AWS Secret Access Key**: Your secret key
- **Default region name**: e.g., `us-east-1` or `sa-east-1`
- **Default output format**: `json` (recommended)

---

### 4. Install Pulumi CLI

```sh
curl -fsSL https://get.pulumi.com | sh
```

⚠️ After installation, you may need to add Pulumi to your `PATH`:

```sh
export PATH=$PATH:$HOME/.pulumi/bin
```

---

### 5. Login with browser

```sh
pulumi login
```

## 🐳 Build and Run Docker Image

1. Build the image and run the container:

```sh
docker build . -t workshop-api
docker run -p 3333:3333 workshop-api
```

---

## ✅ All Set!

Your environment is now ready for deploying using AWS, Pulumi, and Docker.

---

### Pulumi commands:
Iniciate new project:
You need to be in a empty folder to run it.

```sh
pulumi new
```

Deploy and run:
With this command Pulumi idenfity the updates in the repository and ask for confirmation to push the changes.

```sh
pulumi up
```
