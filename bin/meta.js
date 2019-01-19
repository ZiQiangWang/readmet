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
    message: 'github account name'
  },
  {
    type: 'checkbox',
    name: 'badge',
    message: 'badge used',
    choices: [
      'NPM Version',
      'Build Status',
      'Downloads Stats',
      'Coverage Status'
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
      'Installation',
      'Usage',
      'API',
      'Development',
      'ChangeLog',
      'Contributors',
      'Contributing',
      'License',
      'Acknowledgments'
    ]
  },
  {
    type: 'input',
    name: 'license',
    default: 'MIT'
  }
];
