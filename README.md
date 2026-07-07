<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Teslo API

Este proyecto incluye:
- Api rest de productos y usuario.
- Login y registro de usuarios.
- Roles de usuario.
- Websockets.
- Conección a base de datos Postgres.
## Inicializar proyecto
1. Clonar proyecto
2. Instalar dependencias

```
pnpm install
```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```

4. Cambiar las variable de entorno

5. Levantar la base de datos

```
docker-compose up -d
```
6. Ejecutar Seed
````aiignore
http://localhost:3000/api/seed
````

7. Levantar proyecto
```
pnpm run start:dev
```

