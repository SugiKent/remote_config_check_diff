FROM node:17

# RUN pwd
# RUN ls -la
# COPY  credentials.json /scripts/credentials.json
WORKDIR /scripts
# RUN echo -n $BASE64_CREDENTIALS_CONTENT | base64 --decode > /scripts/credentials.json
# RUN pwd
# COPY ./diff.js ./package.json ./package-lock.json ./entrypoint.sh /scripts/
COPY ./package.json ./package-lock.json ./entrypoint.sh /scripts/

# RUN ls -la
RUN npm install

COPY . .
COPY /github/workspace /github/workspace

# ENTRYPOINT [ "npm", "run", "checkDiff" ]
ENTRYPOINT [ "/scripts/entrypoint.sh" ]
# ENTRYPOINT [“node”, “/scripts/diff.js”]
