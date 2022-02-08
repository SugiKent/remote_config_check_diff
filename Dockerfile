FROM node:17

WORKDIR /scripts
COPY ./package.json ./package-lock.json ./entrypoint.sh /scripts/

RUN npm install

COPY . .

# ENTRYPOINT [ "npm", "run", "checkDiff" ]
ENTRYPOINT [ "/scripts/entrypoint.sh" ]
# ENTRYPOINT [“node”, “/scripts/diff.js”]
