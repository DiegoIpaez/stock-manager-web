FROM node:22.14.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY prisma prisma/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build --no-lint

EXPOSE 3000

CMD ["yarn", "start"]
