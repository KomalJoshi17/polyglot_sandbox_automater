#!/bin/bash

case "$1" in

setup)

    echo "Checking Docker..."
    docker --version

    echo "Checking Docker Compose..."
    docker compose version

    echo "Creating temp directory..."
    mkdir -p temp

    echo "Pulling Redis image..."
    docker pull redis:alpine

    ;;

build)

    echo "Building all services..."
    docker compose build

    ;;

test)

    echo "Starting services..."
    docker compose up -d

    echo "Waiting for server..."
    sleep 5

    echo "Testing Python execution..."

    curl -X POST http://localhost:3000/execute \
    -H "Content-Type: application/json" \
    -d '{"language":"python","code":"print(\"Hello Python Test\")"}'

    echo ""

    echo "Testing JavaScript execution..."

    curl -X POST http://localhost:3000/execute \
    -H "Content-Type: application/json" \
    -d '{"language":"javascript","code":"console.log(\"Hello JS Test\")"}'

    ;;

clean)

    echo "Stopping containers..."
    docker compose down -v

    echo "Removing temp files..."
    rm -rf temp/*

    ;;

logs)

    docker compose logs -f | grep --color=always -E "ERROR|CRITICAL|$"

    ;;

*)

    echo "Usage:"
    echo "./scripts/manage.sh setup"
    echo "./scripts/manage.sh build"
    echo "./scripts/manage.sh test"
    echo "./scripts/manage.sh clean"
    echo "./scripts/manage.sh logs"

    ;;

esac