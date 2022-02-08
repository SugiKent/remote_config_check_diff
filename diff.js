const fs = require("fs");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getRemoteConfig } = require("firebase-admin/remote-config");
const core = require("@actions/core");
const github = require("@actions/github");
const { context } = require("@actions/github");

async function main() {
  try {
    console.log("Start");

    try {
      const decoded = atob(process.env.BASE64_CREDENTIALS_CONTENT);
      fs.writeFileSync("./credentials.json", decoded);
    } catch (e) {
      console.error({ e });
      console.log("Credentials の取得と保存に失敗しました");
      throw e;
    }

    initializeApp({
      credential: applicationDefault(),
    });

    const config = getRemoteConfig();
    try {
      const template = await config.getTemplate();
      var templateStr = JSON.stringify(template);
      console.log(templateStr);
      fs.writeFileSync("./config.json", templateStr);
    } catch (err) {
      console.error(err);
      throw err;
    }

    const { pull_request } = context.payload;
    const token = process.env["GITHUB_TOKEN"];
    if (!token) {
      console.error("GITHUB_TOKEN not exist");
      return;
    }
    const octokit = new github.getOctokit(token);
    const repoWithOwner = process.env["GITHUB_REPOSITORY"];
    const [owner, repo] = repoWithOwner.split("/");

    console.log({ pr_number: process.env.PR_NUMBER });
    const response = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: process.env.PR_NUMBER,
      body: "aaa",
    });
    console.log("Finished");
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
