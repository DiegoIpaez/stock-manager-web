#!/bin/bash
source .env

echo "🔧 Setting up MinIO..."
sleep 20

until curl -f http://localhost:9000/minio/health/live > /dev/null 2>&1; do
  echo "Waiting for MinIO..."
  sleep 2
done

echo "Configuring MinIO..."
docker exec minio mc alias set localminio $S3_ENDPOINT $S3_ACCESS_KEY_ID $S3_SECRET_ACCESS_KEY
docker exec minio mc mb localminio/$S3_BUCKET_NAME --ignore-existing
docker exec minio mc anonymous set public localminio/$S3_BUCKET_NAME

echo "✅ MinIO configured successfully!"
