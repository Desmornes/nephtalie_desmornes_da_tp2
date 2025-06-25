🌞 Test !

j'veux les deux commandes docker build dans le compte-rendu
il faut ajouter --target pour préciser quel environnement on veut build

# Build Backend
docker build --target dev -f src/backend/Dockerfile -t dansekonnect-backend-dev src/backend
docker build --target prod -f src/backend/Dockerfile -t dansekonnect-backend-prod src/backend


# Build Frontend
docker build --target dev -f src/frontend/Dockerfile -t dansekonnect-frontend-dev src/frontend
docker build --target prod -f src/frontend/Dockerfile -t dansekonnect-frontend-prod src/frontend




