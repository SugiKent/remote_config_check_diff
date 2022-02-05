const fs = require("fs");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getRemoteConfig } = require("firebase-admin/remote-config");

async function main() {
  console.log("Start");

  try {
    const cred = fs.readFileSync("./credentials.json", { flag: "r" });
  } catch (e) {
    console.log("Credentials が Secret に保存されていません。");
  }

  initializeApp({
    credential: applicationDefault(),
  });

  const config = getRemoteConfig();
  try {
    const template = await config.getTemplate();
    console.log("ETag from server: " + template.etag);
    var templateStr = JSON.stringify(template);
    console.log(templateStr);
    fs.writeFileSync("config.json", templateStr);
  } catch (err) {
    console.error("Unable to get template");
    console.error(err);
  }
  console.log("Finished");
}

main();
