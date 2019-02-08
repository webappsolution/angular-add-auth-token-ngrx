# Specifies the base image we're extending which ia Node 10 using latest Alpine
FROM node:10-alpine

MAINTAINER Brian Riley <brianr@webappsolution.com>

# Create base directory
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

# Specify the "working directory" for the rest of the Dockerfile
WORKDIR /usr/src/app

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Copy the package.json and package-lock.json (for npm 5+) files:
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# copy the permissions from your application directory to the directory on the container:
COPY --chown=node:node . .

# Set the user to node:
USER node

## Allows port 4301 to be publicly available
EXPOSE 4301

CMD [ "node", "index.js" ]