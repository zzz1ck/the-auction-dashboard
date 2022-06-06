FROM node:16.12.0
EXPOSE 8000
RUN mkdir -p /app
WORKDIR /app
COPY package.json yarn.lock tsconfig.json /app/
COPY .env dist index.ts /app/
RUN npm i
CMD ["npm", "run", "start"]