const Configstore = require('configstore');
const pkg = require('../package.json');
const conf = new Configstore(pkg.name);

module.exports = [
  {
    type: 'input',
    name: 'package_name',
    message: 'package name',
    validate: function(input) {
      const done = this.async();
      if (input === '') {
        done('package name required');
        return;
      }

      done(null, true);
    }
  },
  {
    type: 'input',
    name: 'username',
    message: 'github account name',
    default: conf.get('github_account_name'),
    validate: function(input) {
      const done = this.async();
      if (input === '') {
        done('github account name required');
        return;
      }

      done(null, true);
    }
  },
  {
    type: 'checkbox',
    name: 'badge',
    message: 'badge used',
    choices: [
      {
        name: 'NPM Version',
        value: 'npm_version'
      },
      {
        name: 'Build Status',
        value: 'build_status'
      },
      {
        name: 'Downloads Status',
        value: 'downloads_status'
      },
      {
        name: 'Coverage Status',
        value: 'coverage_status'
      }
    ]
  },
  {
    type: 'list',
    name: 'type',
    message: 'readme type',
    default: 'simple',
    choices: ['simple', 'full', 'custom']
  },
  {
    type: 'checkbox',
    name: 'items',
    message: 'readme item',
    when(params) {
      return params.type === 'custom';
    },
    choices: [
      { name: 'Installation', value: 'installation' },
      { name: 'Usage', value: 'usage' },
      { name: 'API', value: 'api' },
      { name: 'Development', value: 'development' },
      { name: 'ChangeLog', value: 'changelog' },
      { name: 'Contributors', value: 'contributors' },
      { name: 'Contributing', value: 'contributing' },
      { name: 'License', value: 'license' },
      { name: 'Acknowledgments', value: 'acknowledgments' }
    ]
  },
  {
    type: 'input',
    name: 'license',
    default: 'MIT'
  }
];
