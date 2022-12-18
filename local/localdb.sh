#!/bin/bash

# Change to the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$SCRIPT_DIR"

# Stop and remove the old container if it exists
echo "stop docker container"
docker stop linemenu-postgres-container
echo "remove docker container"
docker rm linemenu-postgres-container

# Check if the image exists
if [ "$(docker images -q linemenu-postgres-image:latest 2> /dev/null)" = "" ]; then
  # Build the image if it does not exist
  docker build -t linemenu-postgres-image .
fi

# Run the container
echo "run container"
docker run -d --name linemenu-postgres-container -p 5432:5432 linemenu-postgres-image
