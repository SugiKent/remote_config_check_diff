const fs = require("fs");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getRemoteConfig } = require("firebase-admin/remote-config");
const jsonDiff = require("json-diff");
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

    let remoteConfig = "";
    const config = getRemoteConfig();
    try {
      currentConfig = await config.getTemplate();
      console.log({ currentConfig });
    } catch (err) {
      console.error(err);
      throw err;
    }

    const targetFile = process.env.TARGET_FILE || "remote_config.json";
    let localConfigFile = "";
    try {
      localConfigFile = JSON.parse(
        fs.readFileSync(`/github/workspace/${targetFile}`, "utf8")
      );
      console.log({ localConfigFile });
    } catch (err) {
      console.error(err);
      throw err;
    }

    const result = jsonDiff.diffString(currentConfig, localConfigFile, {
      color: false,
    });
    console.log({ result });

    let commentBody = targetFile + "```diff " + result + " ```";

    const token = process.env["GITHUB_TOKEN"];
    if (!token) {
      console.error("GITHUB_TOKEN not exist");
      return;
    }
    const octokit = new github.getOctokit(token);
    const repoWithOwner = process.env["GITHUB_REPOSITORY"];
    const [owner, repo] = repoWithOwner.split("/");

    const pr_number = process.env.PR_NUMBER;
    const response = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pr_number,
      body: commentBody,
    });
    console.log("Finished");
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
