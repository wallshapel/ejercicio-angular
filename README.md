# 🚀 Angular User List App

Un ejercicio práctico en **Angular 20** que demuestra:
- 📝 Listado de usuarios desde la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- 🔍 Filtro de búsqueda en vivo con `ngModel`
- 📱 Diseño responsive (móvil 📱, tablet 📟 y desktop 💻)
- 🎨 Angular Material para UI
- ✅ Tests unitarios completos con **Jasmine + Karma**
- 🧹 Análisis de código con **ESLint**
- 🐳 Docker y Docker Compose listos para ejecutar

---

## 📂 Estructura principal
```
frontend/
 ├─ src/app/features/users
 │   ├─ data-access/   # Servicio (UserService)
 │   ├─ ui/            # Filtro (UserFilterComponent)
 │   └─ user-list/     # Lista de usuarios (UserListComponent)
```

---

## ▶️ Cómo correr la app

### 🔧 Requisitos
- Node.js 20+
- Angular CLI 20+
- (Opcional) Docker + Docker Compose

### 👨‍💻 Desarrollo local
```bash
npm install
npm start
```
La app correrá en 👉 [http://localhost:4200](http://localhost:4200)

---

## 🧪 Tests con cobertura
Ejecuta todos los tests y genera un reporte de cobertura:
```bash
ng test --watch=false --code-coverage
```
📊 El reporte se genera en `coverage/index.html`.

---

## 🧹 Linter (análisis de código)
Verifica calidad y buenas prácticas con:
```bash
npx eslint .
```
Para corregir automáticamente:
```bash
npx eslint . --fix
```

---

## 🐳 Docker
Ejecutar la app en contenedor (requiere Docker y Docker Compose instalados):
```bash
docker compose up -d
```
👉 App disponible en [http://localhost:8080](http://localhost:8080)

---

## ✨ Conclusión
Esta app es un **ejercicio completo en Angular** 🎯: frontend moderno con Angular Material, buenas prácticas de arquitectura, responsive design, tests unitarios con cobertura y despliegue en Docker.

