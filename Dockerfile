FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

# Install Prisma CLI globally
RUN npm install -g prisma

COPY . .


# Generate Prisma Client during the Docker build process
RUN npx prisma generate

CMD ["npm", "run", "dev"]
