const chalk = require("chalk");

let info = (...args) => {
  console.log(chalk.grey("INFO", ...args));
};
let ok = (...args) => {
  console.log(chalk.green(...args));
};
let err = (...args) => {
  console.error(chalk.red("ERROR"), ...args);
};

module.exports = {
  info,
  ok,
  err
};
