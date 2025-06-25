#build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#prod
FROM nginx:stable-alpine AS prod
ENV ENVIRONMENT=prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]

#dev 
FROM node:18-alpine AS dev
ENV ENVIRONMENT=dev
WORKDIR /app
COPY package*.json ./
RUN npm install

EXPOSE 5173
CMD ["npm","run","serve","--","--host","0.0.0.0"]
