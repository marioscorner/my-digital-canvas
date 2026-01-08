# Despliegue Automático con GitHub Actions

Este proyecto está configurado para desplegarse automáticamente en tu VPS cada vez que hagas `git push` a la rama `main`.

## 🚀 Configuración Inicial

### Paso 1: Subir el código a GitHub

Si aún no tienes el repositorio en GitHub:

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit"

# Agregar el repositorio remoto de GitHub
git remote add origin https://github.com/TU-USUARIO/my-digital-canvas.git

# Subir a GitHub
git push -u origin main
```

### Paso 2: Configurar Secrets en GitHub

Necesitas configurar 3 secrets en tu repositorio de GitHub:

1. **Ve a tu repositorio en GitHub**
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** y agrega:

#### `SSH_PRIVATE_KEY`
Tu clave privada SSH para acceder al VPS.

**Cómo obtenerla:**
```bash
# Si ya tienes una clave SSH
cat ~/.ssh/id_rsa
# O si usas otra clave
cat ~/.ssh/tu_clave_privada

# Si no tienes una, créala:
ssh-keygen -t rsa -b 4096 -C "tu-email@ejemplo.com"
# Luego copia el contenido de ~/.ssh/id_rsa
```

**Importante:** Copia TODO el contenido, incluyendo `-----BEGIN OPENSSH PRIVATE KEY-----` y `-----END OPENSSH PRIVATE KEY-----`

#### `SSH_USER`
El usuario SSH de tu VPS (ejemplo: `root`, `ubuntu`, `admin`)

#### `SSH_HOST`
La IP o dominio de tu VPS (ejemplo: `123.456.789.0` o `vps.marioscorner.com`)

### Paso 3: Agregar tu clave pública al VPS

```bash
# En tu máquina local, copia tu clave pública
cat ~/.ssh/id_rsa.pub

# En el VPS, agrega la clave al archivo authorized_keys
ssh usuario@tu-vps
mkdir -p ~/.ssh
echo "TU_CLAVE_PUBLICA_AQUI" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### Paso 4: Instalar Docker en el VPS (si no está instalado)

```bash
# Conectarte al VPS
ssh usuario@tu-vps

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar
docker --version
docker-compose --version
```

## ✅ ¡Listo!

Ahora cada vez que hagas:

```bash
git add .
git commit -m "Tu mensaje"
git push origin main
```

GitHub Actions automáticamente:
1. ✅ Copiará todos los archivos al VPS
2. ✅ Detendrá el contenedor anterior
3. ✅ Construirá y levantará el nuevo contenedor
4. ✅ Verificará que todo esté funcionando

## 📊 Ver el estado del despliegue

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **Actions**
3. Verás el estado de cada despliegue (en progreso, exitoso, o con errores)

## 🔍 Troubleshooting

### El workflow falla en "Copy files to server"

- Verifica que `SSH_PRIVATE_KEY` esté correctamente configurado (con saltos de línea)
- Verifica que `SSH_USER` y `SSH_HOST` sean correctos
- Prueba conectarte manualmente: `ssh usuario@ip-vps`

### El workflow falla en "Deploy on server"

- Verifica que Docker y Docker Compose estén instalados en el VPS
- Verifica que el usuario tenga permisos para ejecutar Docker (sin sudo)
- Revisa los logs: `docker-compose logs` en el VPS

### El despliegue funciona pero el sitio no carga

- Verifica que el puerto 80 no esté ocupado: `sudo netstat -tulpn | grep :80`
- Verifica los logs del contenedor: `docker-compose logs -f`
- Verifica que el firewall permita el puerto 80: `sudo ufw allow 80`

## 🎯 Despliegue Manual (si es necesario)

Si necesitas desplegar manualmente sin hacer push:

```bash
# En tu máquina local
./deploy.sh usuario@ip-vps
```

O directamente en el VPS:

```bash
ssh usuario@ip-vps
cd ~/my-digital-canvas
git pull origin main
docker-compose up -d --build
```

## 🔄 Actualizar solo el código (sin reconstruir)

Si solo cambias contenido y no dependencias, puedes hacer un despliegue más rápido:

```bash
# En el VPS
cd ~/my-digital-canvas
git pull origin main
docker-compose restart
```

