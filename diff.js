const fs = require("fs");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getRemoteConfig } = require("firebase-admin/remote-config");

async function main() {
  console.log("Start");

  initializeApp({
    credential: applicationDefault(),
  });

  const config = getRemoteConfig();
  config
    .getTemplate()
    .then(function (template) {
      console.log("ETag from server: " + template.etag);
      var templateStr = JSON.stringify(template);
      fs.writeFileSync("config.json", templateStr);
    })
    .catch(function (err) {
      console.error("Unable to get template");
      console.error(err);
    });

  console.log("Finished");
}

main();
