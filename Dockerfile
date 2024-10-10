# Development Dockerfile for React App

# Use Node.js base image for building the React app
FROM node:16 AS development
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your development server runs on
EXPOSE 3001

# Command to run the development server
CMD ["npm", "start"]
