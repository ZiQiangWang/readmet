const program = require('commander');
const pkg = require('../package.json');
const { fromRepo, fromTmpl } = require('./helper');
program
  .version(pkg.version, '-v, --version')
  .usage('Create standard README file conveniently')
  .option('-r, --repo', 'Create from a remote repo')
  .option('-i, --init', 'Create from a template');

program.parse(process.argv);

if (program.repo) {
  const repo = program.args[0];
  fromRepo(repo);
}

if (program.init) {
  fromTmpl();
}
