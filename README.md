<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
# NestJS API
# Ejecutar en desarrollo
1. clonar repositorio
2. ejecutar `npm install`
3. ejecutar `npm run start:dev`
4. `npm i -g @nestjs/cli`
tener Nest CLI instalado para levantar el docker-compose
4. `docker-compose up -d`
5. Clonar el archivo ```.env.template```  y reombrar la copia a ```.env```
6. Llenar las variables de entorno en el archivo .env
7. ejecutar `npm run start:dev`
5. abrir en el navegador `http://localhost:3000/`

## Stack Usado
- NestJS
- MongoDB
- Docker
- Docker-compose

6. reconstruir la base de datos con la semilla 
 `http://localhost:3000/api/v2/seed`

