FROM node:20-alpine as builder

WORKDIR /app


# Copy package.json in container
COPY package.json package.json
COPY package-lock.json package-lock.json


# Install project node dependencies
RUN npm install

EXPOSE 4500
