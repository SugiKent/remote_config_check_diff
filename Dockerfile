FROM node:17

WORKDIR /scripts
ENV GOOGLE_APPLICATION_CREDENTIALS="/home/node/app/credentials.json"
RUN echo -n $BASE64_CREDENTIALS_CONTENT | base64 --decode > /scripts/credentials.json
COPY ./package.json ./package-lock.json /scripts/

RUN npm install

COPY . .

# CMD [ "npm", "run", "checkDiff" ]
ENTRYPOINT [“node”, “diff.js”]
