# 🚀 Polyglot Sandbox Automator — PSA-2 DevOps CI/CD Project

## 📌 Project Overview

Polyglot Sandbox Automator is a containerized automated code-execution platform inspired by systems like LeetCode and Replit.
It allows users to execute code securely inside isolated Docker containers using a TypeScript REST API.

This PSA-2 iteration extends the previous project by implementing a complete DevOps CI/CD pipeline using:

* Jenkins
* Terraform
* Ansible
* Docker
* SonarQube
* Nexus Repository
* AWS EC2
* DockerHub

The project demonstrates Infrastructure as Code (IaC), CI/CD automation, container orchestration, artifact management, and secure cloud deployment.

---

# 📌 Features

* ✅ TypeScript REST API (`POST /execute`)
* ✅ Secure isolated Python & Node.js execution runners
* ✅ Docker containerization
* ✅ Docker Compose orchestration
* ✅ Jenkins CI/CD Pipeline
* ✅ GitHub Poll SCM Automation
* ✅ SonarQube Static Code Analysis
* ✅ Quality Gate Enforcement
* ✅ Terraform-based AWS Infrastructure Provisioning
* ✅ Ansible-based Environment Setup
* ✅ Nexus Artifact Repository Integration
* ✅ DockerHub Image Publishing
* ✅ AWS EC2 Deployment with Elastic IP
* ✅ Non-root secure execution containers
* ✅ Resource-limited sandbox execution

---

# 🏗️ System Architecture

```text
Developer Pushes Code → GitHub Repository
                ↓
        Jenkins Poll SCM Trigger
                ↓
          Checkout Source Code
                ↓
          SonarQube Code Scan
                ↓
          Quality Gate Check
                ↓
          Docker Image Build
                ↓
 ┌───────────────────────────────┐
 │                               │
 ↓                               ↓
Push to DockerHub         Push to Nexus
 │                               │
 └──────────────┬────────────────┘
                ↓
         Deploy on AWS EC2
                ↓
      Containerized Application
```

---

# 📂 Project Structure

```text
polyglot-sandbox-automator/
│
├── src/                    # TypeScript REST API
├── scripts/                # Automation scripts
├── containers/
│   ├── api/                # API Dockerfile
│   ├── python/             # Python runner Dockerfile
│   └── nodejs/             # Node.js runner Dockerfile
│
├── terraform/              # Terraform IaC files
├── ansible/                # Ansible playbooks
├── Jenkinsfile             # Jenkins CI/CD Pipeline
├── docker-compose.yml
├── sonar-project.properties
└── README.md
```

---

# ⚙️ Technologies Used

| Category                 | Technologies           |
| ------------------------ | ---------------------- |
| Programming              | TypeScript, Node.js    |
| Containerization         | Docker, Docker Compose |
| CI/CD                    | Jenkins                |
| IaC                      | Terraform              |
| Configuration Management | Ansible                |
| Code Quality             | SonarQube              |
| Artifact Repository      | Sonatype Nexus         |
| Cloud Platform           | AWS EC2                |
| Version Control          | Git & GitHub           |

---

# ☁️ AWS Infrastructure Provisioning (Terraform)

Terraform was used to automate:

* EC2 instance creation
* Elastic IP allocation
* Infrastructure provisioning

### Terraform Features

* Infrastructure as Code
* Automated EC2 deployment
* Elastic IP management
* Reproducible infrastructure

### Commands Used

```bash
terraform init
terraform plan
terraform apply
```

---

# 🛠️ Environment Setup (Ansible)

Ansible was used for automated environment configuration.

### Automated Tasks

* Docker installation
* Package updates
* Service management

### Command Used

```bash
ansible-playbook -i inventory.ini playbook.yml --private-key ~/.ssh/psa2-key.pem
```

---

# 🐳 Docker Containerization

The project is fully containerized.

### Containers Used

* API Container
* Python Runner
* Node.js Runner
* Redis
* Nexus Repository
* SonarQube

### Security Best Practices

* Non-root containers
* Resource limits
* Ephemeral execution
* Automatic cleanup

---

# 🔄 Jenkins CI/CD Pipeline

A complete Jenkins pipeline was implemented.

## Pipeline Stages

### 1. Checkout

Fetches source code from GitHub.

### 2. SonarQube Scan

Performs static code analysis.

### 3. Quality Gate

Stops pipeline if quality gate fails.

### 4. Docker Build

Builds production Docker image.

### 5. Push DockerHub

Publishes image publicly.

### 6. Push Nexus

Publishes image to Nexus artifact repository.

### 7. Deploy

Deploys application container automatically.

---

# 🔍 SonarQube Integration

SonarQube was integrated with Jenkins for:

* Static code analysis
* Code smell detection
* Security vulnerability scanning
* Quality Gate validation

### Quality Gate

The pipeline automatically proceeds only if:

* No major issues
* Quality threshold passes

---

# 📦 Nexus Repository Integration

Sonatype Nexus was configured as:

* Docker hosted repository
* Artifact management system

### Features

* Docker image hosting
* Artifact versioning
* Centralized storage

---

# 🌐 DockerHub Image

Public Docker image:

```text
https://hub.docker.com/r/komaljoshi17/polyglot-sandbox-automator
```

---

# 💻 GitHub Repository

Public GitHub repository:

```text
https://github.com/KomalJoshi17/polyglot_sandbox_automater
```

---

# 🚀 Running the Project Locally

## Clone Repository

```bash
git clone https://github.com/KomalJoshi17/polyglot_sandbox_automater.git
cd polyglot_sandbox_automater
```

---

## Docker Compose

```bash
docker-compose up --build
```

---

## Access API

```text
http://localhost:3000
```

---

# 🧪 API Example

## Execute Python Code

### Endpoint

```http
POST /execute
```

### Request

```json
{
  "language": "python",
  "code": "print('Hello World')"
}
```

### Response

```json
{
  "output": "Hello World"
}
```

---

# 🔐 Security Measures

* Non-root Docker containers
* Resource-limited execution
* Temporary file cleanup
* Isolated runner containers
* Secure deployment workflow

---

# 📊 DevOps Workflow

| Tool      | Purpose                     |
| --------- | --------------------------- |
| GitHub    | Source Control              |
| Jenkins   | CI/CD Automation            |
| SonarQube | Code Quality Analysis       |
| Docker    | Containerization            |
| Nexus     | Artifact Hosting            |
| Terraform | Infrastructure Provisioning |
| Ansible   | Environment Configuration   |
| AWS EC2   | Cloud Deployment            |

---

# 📸 Project Screenshots

Include screenshots of:

* Terraform Apply
* AWS EC2 Dashboard
* Jenkins Pipeline Success
* SonarQube Dashboard
* Nexus Repository
* DockerHub Image
* Running Application
* Ansible Playbook Success

---

# 🎯 Learning Outcomes

This project demonstrates:

* Infrastructure as Code (IaC)
* CI/CD Automation
* Container Security
* Cloud Deployment
* DevOps Pipeline Management
* Artifact Repository Integration
* Automated Quality Analysis

---

# 👨‍💻 Author

## Komal Joshi

B.Tech CSE Student
Lovely Professional University

---

# 📜 License

This project is developed for academic and educational purposes under PSA-2 DevOps coursework.
