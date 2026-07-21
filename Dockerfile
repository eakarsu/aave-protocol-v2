FROM ethereum/solc:0.6.12 AS build-deps

FROM node:16.20.2-bullseye-slim
COPY --from=build-deps /usr/bin/solc /usr/bin/solc
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
CMD ["npm", "run", "health"]
