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
  if (program.args < 1) {
    program.help();
  } else {
    const repo = program.args[0];
    fromRepo(repo);
  }
} else if (program.init) {
  fromTmpl();
} else {
  program.help();
}
