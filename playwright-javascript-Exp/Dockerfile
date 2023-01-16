  
FROM node:12.16-alpine@sha256:08f387b98dd00c1a746580dbd91e538d534911cdd14f6d1d0b36b4687e823006

LABEL name="Playwright-e2e-tests"

WORKDIR /home/node/app

COPY package.json package-lock.json jest.config.js dev_run.js playwright_environment.js setup.js teardown.js /home/node/app/
COPY src /home/node/app/src/

USER root

RUN apk add --no-cache python3=3.8.2-r0 \
    && pip3 install -Iv awscli==1.18.7

RUN chown -R node /home/node \
    && apk add --no-cache --virtual .build-deps \
    && npm install \
    && npm cache clean --force \
    && apk del .build-deps

#COPY . /home/node/app/

ENTRYPOINT ["/bin/ash"]