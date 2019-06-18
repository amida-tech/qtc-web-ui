# Builder image
FROM node:10.9.0 as builder

WORKDIR /app

COPY . /app/
RUN npm install
RUN npm run build

# Runner image
FROM node:10.9.0

WORKDIR /app

COPY --from=builder /app/ /app/

USER 50000:50000

EXPOSE 1776

CMD ["npm", "run", "prod-start"]
