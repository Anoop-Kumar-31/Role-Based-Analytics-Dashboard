# --- Stage 1: Build the Vite app ---
FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./
RUN npm install

COPY . .
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# COPY nginx/ssl/cert.pem /etc/nginx/ssl/cert.pem
# COPY nginx/ssl/key.pem /etc/nginx/ssl/key.pem

# Optional: Copy custom Nginx config
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the built Vite output to Nginx's default root
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/ssl /etc/nginx/ssl

# Optional: expose port
EXPOSE 443 80

CMD ["nginx", "-g", "daemon off;"]