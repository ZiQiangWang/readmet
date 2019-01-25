#! /usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const { fromRepo, fromTmpl, chooseRepo } = require('./helper');
program
  .version(pkg.version, '-v, --version')
  .usage('[options]\nA command tool to create standard README.md conveniently.')
  .option('-r, --repo', 'Create from a remote repo')
  .option('-l, --list', 'Create from list of remote repos')
  .option('-i, --init', 'Create from a template');

program.parse(process.argv);

if (program.repo) {
  if (program.args < 1) {
    program.help();
  } else {
    const repo = program.args[0];
    fromRepo(repo);
  }
} else if (program.list) {
  chooseRepo().then(res => {
    fromRepo(res.repo);
  });
} else if (program.init) {
  fromTmpl();
} else {
  program.help();
}
