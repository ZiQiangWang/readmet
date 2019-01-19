const request = require('request');
const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');
const handlebars = require('handlebars');
const meta = require('./meta');

/**
 * 从网络获取
 * @param {String} url
 */
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

function create(metadata = {}, src, dest = '.') {
  const content = fs.readFileSync(src, 'utf-8');
  const template = handlebars.compile(content, { noEscape: true });

  const badge = createBadge(metadata);
  metadata.badge_content = badge;
  const result = template(metadata);

  fs.writeFileSync(path.resolve(dest, 'README.md'), result);
}

// 创建badge
function createBadge(metadata) {
  const content = fs.readFileSync(path.resolve('template/badge.md'), 'utf-8');
  const template = handlebars.compile(content, { noEscape: true });
  return template(metadata);
}

async function fromTmpl() {
  const info = await inquirer.prompt(meta);

  const { type, badge, items } = info;
  const src = path.resolve(`template/${type}.md`);

  info.badge = array2obj(badge);
  info.items = array2obj(items);
  await create(info, src);
}

// 将Npm Version 转化为 npm_version
function formatName(str) {
  return str.toLowerCase().replace(/\s/g, '_');
}

function array2obj(arr) {
  if (!arr) {
    return {};
  }

  const result = {};
  arr.forEach(item => {
    result[formatName(item)] = true;
  });
  return result;
}
module.exports = {
  fromRepo,
  fromTmpl
};
