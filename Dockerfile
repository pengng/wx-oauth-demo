FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
#COPY . .
COPY src ./src
COPY view ./view
COPY www ./www
COPY production.js ./production.js

ENV DOCKER=true
EXPOSE 8360
CMD [ "node", "production.js" ]
