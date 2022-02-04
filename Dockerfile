FROM node:17

WORKDIR /scripts
ENV GOOGLE_APPLICATION_CREDENTIALS="/scripts/credentials.json"
RUN echo -n $BASE64_CREDENTIALS_CONTENT | base64 --decode > /scripts/credentials.json
COPY ./package.json ./package-lock.json /scripts/

RUN npm install

COPY . .

WORKDIR /scripts
ENTRYPOINT [ "npm", "run", "checkDiff" ]
# ENTRYPOINT [“node”, “/scripts/diff.js”]