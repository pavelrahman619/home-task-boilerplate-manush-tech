FROM node:22

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# Copy everything into the container
COPY . .

# Build the NestJS app
RUN npm run build

# Start the app in production mode
CMD ["npm", "run", "start:prod"]

RUN ls -l /app/dist