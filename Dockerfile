# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install deps (includes devDeps for compilation)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest and compile Angular in prod mode
COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine AS runtime
# Config SPA (fallback to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy Angular artifacts
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
# Simple health check (optional)
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
