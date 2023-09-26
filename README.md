<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

API Rest con Nestjs y Postgres

# Requisitos

* Nodejs versión: 18.15.0
* Docker


## Iniciar proyecto

1. Clonar proyecto
```
yarn install
```

2. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```

3. Cambiar las variables de entorno

5. Levantar la base de datos con docker.
```
docker-compose up -d
```

6. Levantar modo desarrollo
```
yarn start:dev
```

7. Ejecutar SEED
```
http://localhost:3000/api/seed
```