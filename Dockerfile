FROM node:17

WORKDIR /home/node/app
ENV GOOGLE_APPLICATION_CREDENTIALS="/home/node/app/credentials.json"
RUN echo -n $BASE64_CREDENTIALS_CONTENT | base64 --decode > /home/node/app/credentials.json
COPY . /home/node/app

RUN npm install

CMD [ "npm", "run", "checkDiff" ]
