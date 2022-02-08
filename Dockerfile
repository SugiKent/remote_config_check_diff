FROM node:17

WORKDIR /scripts
COPY ./package.json ./package-lock.json ./entrypoint.sh /scripts/

RUN ls -la /github
RUN ls -la /github/workspace
RUN npm install

COPY /github/workspace/remote_config.json /github/workspace/remote_config.json
COPY . .

# ENTRYPOINT [ "npm", "run", "checkDiff" ]
ENTRYPOINT [ "/scripts/entrypoint.sh" ]
# ENTRYPOINT [“node”, “/scripts/diff.js”]
