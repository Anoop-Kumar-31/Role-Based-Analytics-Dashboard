# Getting Started with React + Vite + Nginx + Docker (HTTPS)

This project is powered by [Vite](https://vitejs.dev/) for lightning-fast development and served in production using [Nginx](https://www.nginx.com/) inside a Docker container with HTTPS enabled via self-signed certificates.

---

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all project dependencies defined in `package.json`.

### `npm run start`

Runs the app in development mode using Vite.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will automatically reload as you make changes.

---

## Run with Docker

### `docker compose up --build`

Builds the Docker image, generates self-signed SSL certificates using OpenSSL, and starts the containerized app with Nginx serving the production build.

### Access the Docker Container

Once the container is running, open your browser and go to:
[https://localhost](https://localhost)
You may need to accept the self-signed certificate warning in your browser.
### Stop the Docker Container
To stop the container, press `Ctrl+C` in the terminal where you ran the `docker compose up` command.
### Remove the Docker Container
To remove the container, run:
```bash
docker compose down
```

## Project Structure Overview
```
.
├── Dockerfile
├── docker-compose.yml
├── nginx/
│ ├── default.conf
│ └── (SSL certs auto-generated in Docker)
├── public/
├── src/
├── package.json
├── vite.config.js
└── README.md
```
-----

---

## Notes

- Uses `openssl` in Docker to auto-generate self-signed certificates.
- HTTPS is enabled by default via Nginx.
- Ideal for local testing or staging environments with SSL.

---

## Learn More

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Nginx Docs](https://nginx.org/en/docs/)