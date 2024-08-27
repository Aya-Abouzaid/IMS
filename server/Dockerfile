
FROM node:20-alpine

WORKDIR /server
COPY package.json .
RUN npm install --prodcution 
# --legacy-peer-deps
COPY . .
CMD npm run dev
