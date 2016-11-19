Package.describe({
  git: 'https://github.com/greenermoose/meteor-active-route-basic.git',
  name: 'greenmoose:active-route-basic',
  summary: 'Basic active route helpers for kadira flow router',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom(['1.0', '1.2']);

  api.use([
    'check',
    'reactive-dict',
    'underscore'
  ]);

  api.use([
    'kadira:flow-router@2.0.0',
    'templating'
  ], {weak: true});

  api.export('ActiveRouteBasic');

  api.addFiles('lib/activeroute.js');

  api.addFiles('client/helpers.js', 'client');
});

Package.onTest(function(api) {
  api.versionsFrom(['1.0', '1.2']);

  api.use([
    'check',
    'reactive-dict',
    'templating',
    'underscore'
  ]);

  api.use([
    'practicalmeteor:mocha@2.1.0_5',
    'practicalmeteor:chai@2.1.0_1',
    'greenmoose:active-route-basic'
  ]);

  api.addFiles([
    'tests/client/activeroute.js',
    'tests/client/helpers.js'
  ], 'client');

  api.addFiles('tests/server/activeroute.js', 'server');
});
