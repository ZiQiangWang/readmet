const request = require('request');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');

function fromRepo(url) {
  const spinner = ora('Loading').start();
  request(url, (error, request, body) => {
    spinner.stop();
    if (error) {
      console.log(chalk.red(error.message));
    } else {
      fs.writeFileSync('./README.md', body);
    }
  });
}

module.exports = {
  fromRepo
};
