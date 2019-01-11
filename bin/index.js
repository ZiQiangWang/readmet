const pkg = require('../package.json');
const program = require('commander');

program
  .version(pkg.version, '-v, --version')
  .usage('Create standard README file conveniently')
  .option('-r, --repo', 'Create from a remote repo');

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
