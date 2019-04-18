const release_it = require("release-it");
const sh = require("shelljs");
const { info, ok } = require("./log");

let release = async () => {
  info("checking number of commits since last release tag...");
  const { stdout, stderr, code } = sh.exec(
    "git rev-list $(git describe --tags --abbrev=0)..HEAD --count",
    { silent: true }
  );

  if (code !== 0) {
    throw new Error(`git command failed: ${stderr}`);
  }

  let numCommits = Number(stdout);

  if (numCommits < 1) {
    ok("no changes found since last release, no need to release");
    return;
  }

  // delete process.env.GITHUB_TOKEN;  // testing
  info("commit(s) found, creating release...");

  let output = await release_it({
    "non-interactive": true,
    "dry-run": false,
    verbose: true
  });
  console.log(output);
};

module.exports = {
  release
};
