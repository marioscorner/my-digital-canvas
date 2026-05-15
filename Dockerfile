# Stage 1: Build React app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --legacy-peer-deps --omit=dev

# Copy built React app from builder
COPY --from=builder /app/dist ./dist

# Copy server code
COPY server ./server

# Create directories for uploads and data
RUN mkdir -p /app/uploads /app/data

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Start the server
CMD ["node", "server/index.js"]

