FROM node:20-alpine

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /usr/src/app
COPY . .
RUN bun i

EXPOSE 3000
CMD [ "npm", "run", "dev" ]