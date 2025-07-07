# Gunakan image Node.js yang ringan sebagai base (sesuaikan versi Node.js Anda)
FROM node:20-alpine AS base

# Set working directory di dalam container
WORKDIR /app

# Tahap pengembangan (development stage)
FROM base AS development

# Copy package.json dan package-lock.json untuk menginstal dependencies
COPY package.json package-lock.json ./

# Instal dependencies
RUN npm install

# Copy sisa kode aplikasi
COPY . .

# Generate Prisma client (penting untuk aplikasi Next.js yang menggunakan Prisma)
RUN npx prisma generate

# Expose port yang digunakan Next.js (default: 3000)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi di mode development
CMD ["npm", "run", "dev"]

# Tahap produksi (production stage)
FROM base AS build

# Copy package.json dan package-lock.json
COPY package.json package-lock.json ./

# Instal dependencies produksi
RUN npm install --production

# Copy sisa kode aplikasi
COPY . .

# Generate Prisma client untuk produksi
RUN npx prisma generate

# Build aplikasi Next.js untuk produksi
RUN npm run build

# Tahap akhir (final stage)
FROM node:20-alpine AS runner

WORKDIR /app

# Copy dependencies produksi dari tahap build
COPY --from=build /app/node_modules ./node_modules

# Copy hasil build Next.js
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

# Salin juga prisma schema dan folder migrations jika ada (penting untuk Prisma)
COPY --from=build /app/prisma ./prisma

# Set environment variable untuk Next.js
ENV NODE_ENV production

# Expose port
EXPOSE 3000

# Perintah untuk menjalankan aplikasi di mode produksi
CMD ["npm", "start"]