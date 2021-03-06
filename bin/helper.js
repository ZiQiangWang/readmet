const request = require('request');
const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');
const handlebars = require('handlebars');
const Configstore = require('configstore');
const meta = require('./meta');
const pkg = require('../package.json');
const repos = require('../repo.json');

const conf = new Configstore(pkg.name);

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
      saveFile(path.resolve('README.md'), body);
      updateRepos(url);
    }
  });
}

function create(metadata = {}, src, dest = '.') {
  const content = fs.readFileSync(src, 'utf-8');
  const template = handlebars.compile(content, { noEscape: true });

  const badge = createBadge(metadata);
  metadata.badge_content = badge;
  const result = template(metadata);

  saveFile(path.resolve(dest, 'README.md'), result);
}

// 创建badge
function createBadge(metadata) {
  const content = fs.readFileSync(path.resolve('template/badge.md'), 'utf-8');
  const template = handlebars.compile(content, { noEscape: true });
  return template(metadata);
}

async function fromTmpl() {
  const info = await inquirer.prompt(meta);

  // 保存github账户信息，用于自动填写
  conf.set('github_account_name', info.username);

  const { type, badge, items } = info;
  const src = path.resolve(`template/${type}.md`);

  info.badge = array2obj(badge);
  info.items = array2obj(items);
  await create(info, src);
}

async function chooseRepo() {
  const list = conf.get('repos') || repos;
  const answer = await inquirer.prompt([
    {
      name: 'repo',
      message: 'Choose a repo',
      type: 'list',
      choices: list
    }
  ]);
  return answer;
}

// 更新repo的url记录
function updateRepos(url) {
  const list = (conf.get('repos') || repos).filter(item => item !== url);
  list.unshift(url);
  conf.set('repos', list);
}

// 保存文件前判断是否存在README.md
async function saveFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    const info = await inquirer.prompt([
      {
        name: 'override',
        message: 'Override existing file README.md?',
        type: 'confirm'
      }
    ]);

    if (!info.override) {
      filePath = filePath.replace('README', 'README 2');
    }
    fs.writeFileSync(filePath, content);
  }
}

// 数组转化为对象
function array2obj(arr) {
  if (!arr) {
    return {};
  }

  const result = {};
  arr.forEach(item => {
    result[item] = true;
  });
  return result;
}

module.exports = {
  fromRepo,
  fromTmpl,
  chooseRepo
};
