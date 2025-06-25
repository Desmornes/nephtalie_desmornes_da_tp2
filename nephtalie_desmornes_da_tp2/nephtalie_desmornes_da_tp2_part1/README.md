🌞 Test !

un docker compose up dans le compte-rendu

il build à la volée votre image
ajoutez --build si nécessaire


suivi d'un curl qui prouve que le service fonctionne

```bash
PS C:\Users\nepht\tp_doc_dansekonnect> docker compose up --build
time="2025-06-24T16:11:09+02:00" level=warning msg="C:\\Users\\nepht\\tp_doc_dansekonnect\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] Building 14.3s (35/35) FINISHED                                                                                        docker:desktop-linux
 => [backend internal] load build definition from Dockerfile                                                                               0.1s
 => => transferring dockerfile: 479B                                                                                                       0.0s 
 => [backend internal] load metadata for docker.io/library/composer:latest                                                                 1.3s 
 => [backend internal] load metadata for docker.io/library/php:8.2-apache                                                                  1.3s 
 => [backend auth] library/composer:pull token for registry-1.docker.io                                                                    0.0s 
 => [backend auth] library/php:pull token for registry-1.docker.io                                                                         0.0s
 => [backend internal] load .dockerignore                                                                                                  0.0s
 => => transferring context: 2B                                                                                                            0.0s 
 => [backend stage-0 1/8] FROM docker.io/library/php:8.2-apache@sha256:fda2798f91d9f23f4c7e6c82ccaf583f0828ecf4118e2ccd3fce87485d916be3    0.0s 
 => [backend] FROM docker.io/library/composer:latest@sha256:eec936bdc4364a9f3f5984ef8764f10f67a5c4ffb127ac7d151d651b3611b4a8               0.0s
 => [backend internal] load build context                                                                                                  3.0s 
 => => transferring context: 953.65kB                                                                                                      2.9s 
 => CACHED [backend stage-0 2/8] RUN apt-get update && apt-get install -y     libonig-dev zip unzip git libxml2-dev     && docker-php-ext  0.0s 
 => CACHED [backend stage-0 3/8] RUN a2enmod rewrite                                                                                       0.0s 
 => CACHED [backend stage-0 4/8] WORKDIR /app                                                                                              0.0s 
 => CACHED [backend stage-0 5/8] COPY . /app                                                                                               0.0s 
 => CACHED [backend stage-0 6/8] RUN chown -R www-data:www-data /app                                                                       0.0s 
 => CACHED [backend stage-0 7/8] COPY --from=composer:latest /usr/bin/composer /usr/bin/composer                                           0.0s 
 => CACHED [backend stage-0 8/8] RUN composer install --no-interaction                                                                     0.0s 
 => [backend] exporting to image                                                                                                           0.1s 
 => => exporting layers                                                                                                                    0.0s 
 => => writing image sha256:d623a3b94c705ed95633402e1e0a440aab6936d6a87f3dc2533919098e0958ef                                               0.0s 
 => => naming to docker.io/library/tp_doc_dansekonnect-backend                                                                             0.0s 
 => [backend] resolving provenance for metadata file                                                                                       0.1s 
 => [frontend internal] load build definition from Dockerfile                                                                              0.1s 
 => => transferring dockerfile: 330B                                                                                                       0.0s 
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 13)                                                            0.1s 
 => [frontend internal] load metadata for docker.io/library/nginx:stable-alpine                                                            0.9s 
 => [frontend internal] load metadata for docker.io/library/node:18-alpine                                                                 0.9s 
 => [frontend auth] library/node:pull token for registry-1.docker.io                                                                       0.0s 
 => [frontend auth] library/nginx:pull token for registry-1.docker.io                                                                      0.0s 
 => [frontend internal] load .dockerignore                                                                                                 0.1s 
 => => transferring context: 2B                                                                                                            0.0s 
 => [frontend build-stage 1/6] FROM docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09  0.0s
 => [frontend production-stage 1/2] FROM docker.io/library/nginx:stable-alpine@sha256:aed99734248e851764f1f2146835ecad42b5f994081fa6631cc  0.0s 
 => [frontend internal] load build context                                                                                                 7.2s 
 => => transferring context: 2.17MB                                                                                                        7.1s 
 => CACHED [frontend build-stage 2/6] WORKDIR /app                                                                                         0.0s 
 => CACHED [frontend build-stage 3/6] COPY package*.json ./                                                                                0.0s 
 => CACHED [frontend build-stage 4/6] RUN npm install                                                                                      0.0s 
 => CACHED [frontend build-stage 5/6] COPY . .                                                                                             0.0s 
 => CACHED [frontend build-stage 6/6] RUN npm run build                                                                                    0.0s 
 => CACHED [frontend production-stage 2/2] COPY --from=build-stage /app/dist /usr/share/nginx/html                                         0.0s 
 => [frontend] exporting to image                                                                                                          0.1s 
 => => exporting layers                                                                                                                    0.0s
 => => writing image sha256:559fae73bb10023a863b2453e43de4f71a3685901d0ac7140bbcca7b8fcf5fd3                                               0.0s 
 => => naming to docker.io/library/tp_doc_dansekonnect-frontend                                                                            0.0s 
 => [frontend] resolving provenance for metadata file                                                                                      0.0s 
[+] Running 7/7
 ✔ backend                               Built                                                                                             0.0s 
 ✔ frontend                              Built                                                                                             0.0s 
 ✔ Network tp_doc_dansekonnect_default   Created                                                                                           0.3s 
 ✔ Volume "tp_doc_dansekonnect_db_data"  Created                                                                                           0.0s 
 ✔ Container dk-mysql                    Created                                                                                           0.3s 
 ✔ Container dk-backend                  Created                                                                                           0.3s 
 ✔ Container dk-frontend                 Created                                                                                           0.3s 
Attaching to dk-backend, dk-frontend, dk-mysql
   ................
````
suivi d'un curl qui prouve que le service fonctionne

```bash
PS C:\Users\nepht\tp_doc_dansekonnect> curl http://localhost:5173


StatusCode        : 200
StatusDescription : OK
Content           : <!doctype html><html lang=""><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible"
                    content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vue
                    App</title><...
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Accept-Ranges: bytes
                    Content-Length: 484
                    Content-Type: text/html
                    Date: Tue, 24 Jun 2025 14:19:18 GMT
                    ETag: "685aa81e-1e4"
                    Last-Modified: Tue, 24 Jun 2025 ...
Forms             : {}
Headers           : {[Connection, keep-alive], [Accept-Ranges, bytes], [Content-Length, 484], [Content-Type,
                    text/html]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : System.__ComObject
RawContentLength  : 484
```