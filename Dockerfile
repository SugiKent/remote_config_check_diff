FROM node:17

WORKDIR /scripts
RUN echo -n $BASE64_CREDENTIALS_CONTENT
RUN echo -n $BASE64_CREDENTIALS_CONTENT | base64 --decode > /scripts/credentials.json
RUN ls -la /scripts/
RUN cat /scripts/credentials.json
COPY ./diff.js ./package.json ./package-lock.json ./entrypoint.sh /scripts/

RUN npm install

COPY . .

# ENTRYPOINT [ "npm", "run", "checkDiff" ]
ENTRYPOINT [ "/scripts/entrypoint.sh" ]
# ENTRYPOINT [“node”, “/scripts/diff.js”]
