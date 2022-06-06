FROM node:16.12.0
EXPOSE 9000 
RUN mkdir -p /app
WORKDIR /app
COPY . /app/
RUN npm i
CMD ["npm", "run", "start"]