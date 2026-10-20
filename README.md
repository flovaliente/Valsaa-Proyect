# Valsaa

Tienda online de ropa. Proyecto personal que empezó como tres entregas separadas
(sitio estático, frontend en React y backend en Node) y que ahora se unifica en
una sola aplicación.

## Estructura

```
valsaa/
├── client/                 # Frontend: React 19 + Vite + MUI
├── server/                 # API: Node + Express + MongoDB
└── legacy/sitio-estatico/  # Sitio original en HTML/SCSS (referencia de diseño, se va a portar a React)
```

## Cómo correrlo

### Server

```bash
cd server
cp .env.example .env   # completar los valores
npm install
npm run seed   # carga el catálogo inicial (solo la primera vez)
npm run dev
```

La API queda en `http://localhost:8080` y la documentación Swagger en `/api/docs`.

### Client

```bash
cd client
npm install
npm run dev
```

## Hoja de ruta

- [x] Unificar los tres proyectos en un solo repositorio
- [ ] Conectar el client con la API del server (reemplazar Firebase)
- [ ] Unificar el modelo de producto y el catálogo
- [ ] Portar el diseño del sitio estático a React
- [ ] Corregir problemas de seguridad (secretos en el código, rutas sin autorización)
- [ ] Migrar a TypeScript
- [ ] Deploy (client + server + MongoDB Atlas)

## Historia

| Origen | Repositorio original |
|---|---|
| Sitio estático (HTML/SCSS/Bootstrap) | [PFValiente](https://github.com/flovaliente/PFValiente) |
| Frontend React | [Entrega-Final-React-Valiente](https://github.com/flovaliente/Entrega-Final-React-Valiente) |
| Backend Node/Express | [Entrega-Final-Backend](https://github.com/flovaliente/Entrega-Final-Backend) |
