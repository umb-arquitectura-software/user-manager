
# User Manager
Desplegar el proyecto en local
- node 18
- npm i
- solicitar variables de entorno .env
- npm run start:dev


Desplegar el proyecto en docker
- docker-compose up -d


Subir proyecto a dockerhub
- docker build -t harold1013/user-manager:latest .
- docker push harold1013/user-manager:latest 

Subir proyecto a GCP
- docker buildx build -t user-manager --platform linux/amd64 .
- docker tag user-manager gcr.io/haroldscc-test/user-manager
- docker push gcr.io/haroldscc-test/user-manager


docker buildx build -t user-manager --platform linux/amd64 . && docker tag user-manager gcr.io/haroldscc-test/user-manager && docker push gcr.io/haroldscc-test/user-manager