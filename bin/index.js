const program = require('commander');
const pkg = require('../package.json');
const { fromRepo } = require('./helper');
program
  .version(pkg.version, '-v, --version')
  .usage('Create standard README file conveniently')
  .option('-r, --repo', 'Create from a remote repo');

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}

if (program.repo) {
  const repo = program.args[0];
  fromRepo(repo);
}
