const { release } = require("../src/lib/release");
const { err } = require("../src/lib/log");

(async () => {
  try {
    await release();
  } catch (error) {
    console.log(error);
    err("release failed");
    process.exit(1);
  }
})();
