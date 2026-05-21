# Polyglot Sandbox Automator

A containerized, automated, multi-language code execution platform inspired by online coding environments like LeetCode and Replit.

This project provides a secure sandboxed environment to execute untrusted Python and JavaScript code inside isolated Docker containers using a TypeScript REST API.

---

# Features

- Multi-language code execution
  - Python
  - JavaScript (Node.js)

- TypeScript REST API
  - `POST /execute`
  - Dynamic language handling
  - Output capture

- Docker-based sandbox execution
  - Isolated runner containers
  - Ephemeral execution containers
  - Shared Docker volume support

- Security Best Practices
  - Non-root users inside containers
  - CPU limits
  - Memory limits
  - Automatic container cleanup

- Docker Compose orchestration
  - API container
  - Redis container
  - Shared networking

- Automation using Bash
  - setup
  - build
  - test
  - clean
  - logs

- Redis integration
  - Ready for caching and rate limiting extensions

- Git commit-based Docker image tagging

---

# Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| TypeScript | API development |
| Express.js | REST API |
| Docker | Containerization |
| Docker Compose | Service orchestration |
| Redis | Caching / scalability |
| Bash | Automation scripts |
| Python | Sandbox execution language |
| Node.js Runtime | JavaScript execution |

---

# Project Architecture

```text
                User
                  ↓
          POST /execute
                  ↓
         TypeScript REST API
                  ↓
          Docker API Container
                  ↓
      Shared Docker Volume
                  ↓
      Runner Containers
       ↓             ↓
 Python Runner   Node Runner
       ↓             ↓
   Code Output Returned
```

---

# Project Structure

```text
polyglot-sandbox-automator/
│
├── containers/
│   ├── api/
│   │   └── Dockerfile
│   │
│   ├── python/
│   │   └── Dockerfile
│   │
│   └── nodejs/
│       └── Dockerfile
│
├── scripts/
│   └── manage.sh
│
├── src/
│   └── server.ts
│
├── temp/
│
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

# How It Works

1. User sends code using the `/execute` API.
2. The API receives the language and source code.
3. Code is temporarily written into a shared Docker volume.
4. The API launches an isolated Docker runner container.
5. The runner executes the code securely.
6. Output is captured and returned to the user.
7. The execution container is automatically removed.

---

# API Endpoint

## Execute Code

### Endpoint

```http
POST /execute
```

---

## Request Body

### Python Example

```json
{
  "language": "python",
  "code": "print('Hello World')"
}
```

### JavaScript Example

```json
{
  "language": "javascript",
  "code": "console.log('Hello JS')"
}
```

---

## Sample Response

```json
{
  "output": "Hello World"
}
```

---

# Security Features

This project demonstrates several important sandbox security practices.

## 1. Non-root Container Execution

Runner containers use dedicated non-root users.

```dockerfile
USER sandboxuser
```

This prevents executed code from gaining elevated privileges.

---

## 2. Ephemeral Containers

Containers are automatically deleted after execution.

```bash
docker run --rm
```

Benefits:
- No leftover containers
- Reduced storage usage
- Better security isolation

---

## 3. CPU Limits

```bash
--cpus=0.5
```

Prevents excessive CPU consumption.

---

## 4. Memory Limits

```bash
--memory=256m
```

Prevents memory abuse and resource exhaustion.

---

## 5. Isolated Docker Runners

Code executes inside isolated language-specific containers.

Benefits:
- Environment isolation
- Safer execution
- Better scalability

---

# Docker Runner Images

## Python Runner

```dockerfile
FROM python:3.11-alpine

RUN adduser -D sandboxuser

USER sandboxuser

WORKDIR /app
```

---

## Node.js Runner

```dockerfile
FROM node:20-alpine

RUN adduser -D sandboxuser

USER sandboxuser

WORKDIR /app
```

---

# Docker Compose

Docker Compose orchestrates all services.

## Services

- API Container
- Redis Container
- Shared Docker Volume

---

## Start All Services

```bash
docker compose up --build
```

---

# Automation Script

The project includes a Bash automation CLI:

```text
scripts/manage.sh
```

---

# Available Commands

## Setup

```bash
./scripts/manage.sh setup
```

Performs:
- Docker verification
- Docker Compose verification
- Redis image pull
- Temp directory setup

---

## Build

```bash
./scripts/manage.sh build
```

Builds and tags all Docker images using the current Git commit hash.

---

## Test

```bash
./scripts/manage.sh test
```

Runs:
- Docker Compose startup
- API integration tests
- Python execution verification
- JavaScript execution verification

---

## Clean

```bash
./scripts/manage.sh clean
```

Performs cleanup:
- Stops containers
- Removes volumes
- Removes temporary files

---

## Logs

```bash
./scripts/manage.sh logs
```

Displays real-time container logs and highlights `ERROR` and `CRITICAL` messages.

---

# Installation Guide

## Prerequisites

Install the following:

- Docker Desktop
- Node.js
- Git Bash (Windows)
- Git

---

# Clone Repository

```bash
git clone <your-repository-url>
```

---

# Navigate to Project

## Windows Git Bash

```bash
cd /e/SEM_6/cipher/polyglot-sandbox-automator
```

---

# Install Dependencies

```bash
npm install
```

---

# Start Services

```bash
docker compose up --build
```

---

# Testing the API

## PowerShell Example

```powershell
Invoke-RestMethod `
-Uri "http://localhost:3000/execute" `
-Method POST `
-ContentType "application/json" `
-Body '{"language":"python","code":"print(\"Hello World\")"}'
```

---

# Expected Output

```json
{
  "output": "Hello World"
}
```

---

# Git Workflow

This project follows a feature-branch Git workflow.

## Example Workflow

```bash
git checkout -b feature/docker-runners
git add .
git commit -m "Add Docker runner support"
git push origin feature/docker-runners
```

This workflow helps isolate features, improve collaboration, and maintain clean version control practices.

---

# Learning Objectives Covered

This project demonstrates practical understanding of:

- Backend API development
- Docker containerization
- Sandbox isolation
- DevOps fundamentals
- Docker Compose orchestration
- Bash automation
- Secure code execution
- Infrastructure as Code
- Multi-container communication

---

# Future Improvements

Potential future enhancements:

- UUID-based temporary filenames
- Automatic file cleanup after execution
- Execution timeout handling
- Redis-based caching
- Rate limiting
- Web frontend UI
- Support for additional languages
- Authentication system
- Queue-based execution architecture

---

# Screenshots

Add screenshots of:

- Docker Compose running
- Successful API execution
- manage.sh automation
- VS Code project structure

---

# Author

Komal Joshi

B.Tech CSE (2027)

Lovely Professional University

---

# Conclusion

Polyglot Sandbox Automator is a secure, containerized code execution platform demonstrating practical backend engineering, Docker orchestration, sandbox isolation, automation, and DevOps concepts.

The project successfully executes untrusted Python and JavaScript code inside isolated Docker runners using a scalable multi-container architecture.