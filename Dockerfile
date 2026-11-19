FROM docker.io/library/node:22-alpine

WORKDIR /app

COPY package.json ./
COPY src ./src

RUN mkdir -p /datos && chown -R node:node /app /datos

USER node

ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/main.mjs"]