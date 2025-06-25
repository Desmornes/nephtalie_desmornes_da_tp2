🌞 Test ! Partie prod

un docker compose up dans le compte-rendu

il faudra explicitement préciser le nom du fichier vu qu'il n'est plus standard non plus !

```bash
PS C:\Users\nepht\nephtalie_desmornes_da_tp2> docker compose -f docker-compose-prod.yml up -d  
[+] Building 205.0s (35/35) FINISHED                                                                                       docker:desktop-linux
 => [frontend internal] load build definition from Dockerfile-prod                                                                         0.1s
 => => transferring dockerfile: 357B                                                                                                       0.0s 
 => [backend internal] load build definition from Dockerfile-prod                                                                          0.1s 
 => => transferring dockerfile: 573B                                                                                                       0.0s 
 => [backend internal] load metadata for docker.io/library/php:8.2-apache                                                                  1.3s
 => [backend internal] load metadata for docker.io/library/composer:latest                                                                 1.3s 
 => [frontend internal] load metadata for docker.io/library/nginx:stable-alpine                                                            1.3s
 => [frontend internal] load metadata for docker.io/library/node:18-alpine                                                                 1.3s
 => [frontend auth] library/nginx:pull token for registry-1.docker.io                                                                      0.0s
 => [backend auth] library/php:pull token for registry-1.docker.io                                                                         0.0s
 => [frontend auth] library/node:pull token for registry-1.docker.io                                                                       0.0s
 => [backend auth] library/composer:pull token for registry-1.docker.io                                                                    0.0s
 => [backend internal] load .dockerignore                                                                                                  0.1s
 => => transferring context: 2B                                                                                                            0.0s
 => [frontend internal] load .dockerignore                                                                                                 0.1s
 => => transferring context: 2B                                                                                                            0.0s
 => [backend stage-0 1/8] FROM docker.io/library/php:8.2-apache@sha256:fda2798f91d9f23f4c7e6c82ccaf583f0828ecf4118e2ccd3fce87485d916be3    0.0s 
 => [backend internal] load build context                                                                                                 40.9s 
 => => transferring context: 98.31MB                                                                                                      40.5s 
 => CACHED [backend] FROM docker.io/library/composer:latest@sha256:eec936bdc4364a9f3f5984ef8764f10f67a5c4ffb127ac7d151d651b3611b4a8        0.0s 
 => [frontend build-stage 1/6] FROM docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09  0.0s 
 => CACHED [frontend stage-1 1/2] FROM docker.io/library/nginx:stable-alpine@sha256:aed99734248e851764f1f2146835ecad42b5f994081fa6631cc5d  0.0s 
 => [frontend internal] load build context                                                                                                56.9s 
 => => transferring context: 143.23MB                                                                                                     56.8s 
 => CACHED [backend stage-0 2/8] RUN apt-get update && apt-get install -y     libonig-dev zip unzip git libxml2-dev     && docker-php-ext  0.0s 
 => CACHED [backend stage-0 3/8] RUN a2enmod rewrite                                                                                       0.0s 
 => CACHED [backend stage-0 4/8] WORKDIR /app                                                                                              0.0s 
 => [backend stage-0 5/8] COPY ./src/backend /app                                                                                         18.0s 
 => CACHED [frontend build-stage 2/6] WORKDIR /app                                                                                         0.0s 
 => CACHED [frontend build-stage 3/6] COPY src/frontend/package*.json ./                                                                   0.0s 
 => CACHED [frontend build-stage 4/6] RUN npm install                                                                                      0.0s 
 => CACHED [frontend build-stage 5/6] COPY src/frontend ./                                                                                 0.0s 
 => [frontend build-stage 6/6] RUN npm run build                                                                                          48.9s 
 => [backend stage-0 6/8] COPY --from=composer:latest /usr/bin/composer /usr/bin/composer                                                  0.6s 
 => [backend stage-0 7/8] RUN composer install --no-interaction --no-dev --optimize-autoloader --no-scripts                                8.5s 
 => [backend stage-0 8/8] RUN chown -R www-data:www-data /app                                                                            130.7s 
 => [frontend stage-1 2/2] COPY --from=build-stage /app/dist /usr/share/nginx/html                                                         0.6s 
 => [frontend] exporting to image                                                                                                          0.5s 
 => => exporting layers                                                                                                                    0.3s 
 => => writing image sha256:2712497460ee18f667f0b8ab09b6b25c27797f6b69785adbacfaa9d947f196eb                                               0.0s 
 => [frontend] resolving provenance for metadata file                                                                                      0.1s 
 => [backend] exporting to image                                                                                                           4.1s 
 => => exporting layers                                                                                                                    4.0s 
 => => writing image sha256:62cb6df64961c9b50abc0ced7bcb90c7823fb541c5b2ce5e0717bddc84b9fd74                                               0.0s 
 => => naming to docker.io/library/nephtalie_desmornes_da_tp2-backend                                                                      0.0s 
 => [backend] resolving provenance for metadata file                                                                                       0.0s 
[+] Running 7/7
 ✔ backend                                           Built                                                                                 0.0s 
 ✔ frontend                                          Built                                                                                 0.0s 
 ✔ Network nephtalie_desmornes_da_tp2_default        Created                                                                               0.5s 
 ✔ Volume "nephtalie_desmornes_da_tp2_db_prod_data"  Created                                                                               0.0s 
 ✔ Container dk-prod-db                              Started                                                                               2.5s 
 ✔ Container dk-prod-frontend                        Started                                                                               2.5s 
 ✔ Container dk-prod-backend                         Started 
````
suivi d'un curl qui prouve que le service fonctionne


```bash
PS C:\Users\nepht\nephtalie_desmornes_da_tp2> curl.exe -I http://localhost:8084
HTTP/1.1 200 OK
Server: nginx/1.28.0
Date: Wed, 25 Jun 2025 10:33:20 GMT
Content-Type: text/html
Content-Length: 484
Last-Modified: Wed, 25 Jun 2025 10:24:17 GMT
Connection: keep-alive
ETag: "685bce51-1e4"
Accept-Ranges: bytes

PS C:\Users\nepht\nephtalie_desmornes_da_tp2>
```


🌞 Test ! Partie dev

un docker compose up dans le compte-rendu

il faudra explicitement préciser le nom du fichier vu qu'il n'est plus standard non plus !
```bash
PS C:\Users\nepht\nephtalie_desmornes_da_tp2> docker compose -f docker-compose-dev.yml up --build
>> 
[+] Building 6.4s (26/26) FINISHED                                                                                         docker:desktop-linux
 => [backend internal] load build definition from Dockerfile-dev                                                                           0.1s
 => => transferring dockerfile: 631B                                                                                                       0.0s 
 => [backend internal] load metadata for docker.io/library/php:8.2-apache                                                                  1.2s 
 => [backend auth] library/php:pull token for registry-1.docker.io                                                                         0.0s 
 => [backend internal] load .dockerignore                                                                                                  0.1s
 => => transferring context: 2B                                                                                                            0.0s 
 => [backend 1/8] FROM docker.io/library/php:8.2-apache@sha256:fda2798f91d9f23f4c7e6c82ccaf583f0828ecf4118e2ccd3fce87485d916be3            0.0s 
 => [backend internal] load build context                                                                                                  1.2s 
 => => transferring context: 69B                                                                                                           1.1s 
 => CACHED [backend 2/8] RUN apt-get update && apt-get install -y     libonig-dev zip unzip git libxml2-dev   && docker-php-ext-install p  0.0s
 => CACHED [backend 3/8] RUN a2enmod rewrite                                                                                               0.0s 
 => CACHED [backend 4/8] WORKDIR /app                                                                                                      0.0s
 => CACHED [backend 5/8] COPY composer.json composer.lock* /app/                                                                           0.0s 
 => CACHED [backend 6/8] RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer                0.0s 
 => CACHED [backend 7/8] RUN composer install --no-interaction --optimize-autoloader --no-scripts                                          0.0s 
 => CACHED [backend 8/8] RUN mkdir -p var/cache var/log && chown -R www-data:www-data var                                                  0.0s
 => [backend] exporting to image                                                                                                           0.1s 
 => => exporting layers                                                                                                                    0.0s 
 => => writing image sha256:c0b3aa998ab9332e7c9a10f133cbe311f87c9d5eb5e0f154deeebda93bd3ba9e                                               0.0s 
 => => naming to docker.io/library/nephtalie_desmornes_da_tp2-backend                                                                      0.0s 
 => [backend] resolving provenance for metadata file                                                                                       0.1s 
 => [frontend internal] load build definition from Dockerfile-dev                                                                          0.1s 
 => => transferring dockerfile: 223B                                                                                                       0.0s
 => [frontend internal] load metadata for docker.io/library/node:18-alpine                                                                 0.7s 
 => [frontend auth] library/node:pull token for registry-1.docker.io                                                                       0.0s 
 => [frontend internal] load .dockerignore                                                                                                 0.1s 
 => => transferring context: 2B                                                                                                            0.0s 
 => [frontend 1/4] FROM docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e           0.0s 
 => [frontend internal] load build context                                                                                                 1.5s 
 => => transferring context: 72B                                                                                                           1.5s 
 => CACHED [frontend 2/4] WORKDIR /app                                                                                                     0.0s 
 => CACHED [frontend 3/4] COPY package*.json /app/                                                                                         0.0s 
 => CACHED [frontend 4/4] RUN npm install                                                                                                  0.0s 
 => [frontend] exporting to image                                                                                                          0.1s 
 => => exporting layers                                                                                                                    0.0s 
 => => writing image sha256:2b230aad82efbdb5b892ab59cfa1c9c98d54166e928d5deafa00aa3414e67fc8                                               0.0s 
 => => naming to docker.io/library/nephtalie_desmornes_da_tp2-frontend                                                                     0.0s 
 => [frontend] resolving provenance for metadata file                                                                                      0.1s 
[+] Running 6/6
 ✔ backend                                     Built                                                                                       0.0s 
 ✔ frontend                                    Built                                                                                       0.0s 
 ✔ Network nephtalie_desmornes_da_tp2_default  Created                                                                                     0.5s 
 ✔ Container dk-dev-db                         Created                                                                                     0.2s 
 ✔ Container dk-dev-backend                    Created                                                                                     0.3s 
 ✔ Container dk-dev-frontend                   Created                                                                                     0.3s 
Attaching to dk-dev-backend, dk-dev-db, dk-dev-frontend
dk-dev-db        | 2025-06-25 11:23:26+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.4.5-1.el9 started.
dk-dev-db        | 2025-06-25 11:23:27+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
dk-dev-db        | 2025-06-25 11:23:27+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.4.5-1.el9 started.
dk-dev-backend   | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.22.0.3. Set the 'ServerName' directive globally to suppress this message
dk-dev-backend   | AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 172.22.0.3. Set the 'ServerName' directive globally to suppress this message
dk-dev-backend   | [Wed Jun 25 11:23:27.926524 2025] [mpm_prefork:notice] [pid 1:tid 1] AH00163: Apache/2.4.62 (Debian) PHP/8.2.28 configured -- resuming normal operations
dk-dev-backend   | [Wed Jun 25 11:23:27.926612 2025] [core:notice] [pid 1:tid 1] AH00094: Command line: 'apache2 -D FOREGROUND'
dk-dev-db        | '/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
dk-dev-frontend  | 
dk-dev-frontend  | > dansekonnect@1.0.0 serve
dk-dev-frontend  | > vue-cli-service serve --host 0.0.0.0
dk-dev-frontend  | 
dk-dev-db        | 2025-06-25T11:23:28.341034Z 0 [System] [MY-015015] [Server] MySQL Server - start.
dk-dev-db        | 2025-06-25T11:23:28.910304Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.4.5) starting as process 1
dk-dev-db        | 2025-06-25T11:23:28.970294Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
dk-dev-db        | 2025-06-25T11:23:30.385164Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
dk-dev-db        | 2025-06-25T11:23:31.125879Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
dk-dev-db        | 2025-06-25T11:23:31.125971Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
dk-dev-db        | 2025-06-25T11:23:31.140625Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
dk-dev-db        | 2025-06-25T11:23:31.311542Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
dk-dev-db        | 2025-06-25T11:23:31.311781Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.4.5'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
dk-dev-frontend  |  INFO  Starting development server...
 DONE  Compiled successfully in 51063ms11:25:32 AM
dk-dev-frontend  | 

dk-dev-frontend  |   App running at:
dk-dev-frontend  |   - Local:   http://localhost:8080/
dk-dev-frontend  | 
dk-dev-frontend  |   It seems you are running Vue CLI inside a container.
dk-dev-frontend  |   Access the dev server via http://localhost:<your container's external mapped port>/
dk-dev-frontend  | 
dk-dev-frontend  |   Note that the development build is not optimized.
dk-dev-frontend  |   To create a production build, run npm run build.
dk-dev-frontend  | 
Build finished at 11:25:32 by 0.000s
```

suivi d'un curl qui prouve que le service fonctionne
```bash
PS C:\Users\nepht\nephtalie_desmornes_da_tp2> curl http://localhost:8080


StatusCode        : 200
StatusDescription : OK
Content           : <!DOCTYPE html>
                    <html lang="">
                      <head>
                        <meta charset="utf-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width,initial-scale=1.0">
                     ...
RawContent        : HTTP/1.1 200 OK
                    Vary: Accept-Encoding
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Accept-Ranges: bytes
                    Content-Length: 378
                    Content-Type: text/html; charset=utf-8
                    Date: Wed, 25 Jun 2025 11:28:0...
Forms             : {}
Headers           : {[Vary, Accept-Encoding], [Connection, keep-alive], [Keep-Alive, timeout=5], [Accept-Ranges,
                    bytes]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : System.__ComObject
RawContentLength  : 378
```
