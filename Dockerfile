FROM node:alpine 
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json ./
RUN npm install
# Copy app files
COPY . .
# Start the app
CMD [ "npm", "start" ]