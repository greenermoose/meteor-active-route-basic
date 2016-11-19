var makeClientTests;

makeClientTests = function() {
  it('ActiveRoute.config({caseSensitive: false})', function() {
    expect(ActiveRoute.config({
      caseSensitive: false.to.be.undefined
    }));
    expect(ActiveRoute.name('Home'.to.be["true"]));
    expect(ActiveRoute.path('/'.to.be["true"]));
    return ActiveRoute.config({
      caseSensitive: true
    });
  });
  it('ActiveRoute.configure({caseSensitive: false})', function() {
    expect(ActiveRoute.configure({
      caseSensitive: false.to.be.undefined
    }));
    expect(ActiveRoute.name('Home'.to.be["true"]));
    expect(ActiveRoute.path('/'.to.be["true"]));
    return ActiveRoute.configure({
      caseSensitive: true
    });
  });
  it('ActiveRoute.config({activeClass: \'is-selected\', disabledClass: ' + '\'is-disabled\'})', function() {
    expect(ActiveRoute.config({
      activeClass: 'is-selected',
      disabledClass: 'is-disabled'
    }).to.be.undefined);
    expect(Blaze._globalHelpers["isActiveRoute"]('home'.to.be.a.string('is-selected')));
    expect(Blaze._globalHelpers["isNotActiveRoute"]('notHome'.to.be.a.string('is-disabled')));
    return ActiveRoute.config({
      activeClass: 'active',
      disabledClass: 'disabled'
    });
  });
  it('ActiveRoute.config({caseSensitive: false, regex: true})', function() {
    expect(ActiveRoute.config({
      caseSensitive: false,
      regex: true
    }).to.be.undefined);
    expect(Blaze._globalHelpers['isActiveRoute']('^hoMe$'.to.be.a.string('active')));
    expect(Blaze._globalHelpers['isActivePath']('^\/$'.to.be.a.string('active')));
    return ActiveRoute.config({
      caseSensitive: true,
      regex: false
    });
  });
  it('ActiveRoute.config({regex: true})', function() {
    expect(ActiveRoute.config({
      regex: true
    }).to.be.undefined);
    expect(Blaze._globalHelpers['isActiveRoute']('^home$'.to.be.a.string('active')));
    expect(Blaze._globalHelpers['isActivePath']('^\/$'.to.be.a.string('active')));
    return ActiveRoute.config({
      regex: false
    });
  });
  it('ActiveRoute.name(\'home\')', function() {
    return expect(ActiveRoute.name('home'.to.be["true"]));
  });
  it('ActiveRoute.name(new RegExp(\'home\'))', function() {
    return expect(ActiveRoute.name(new RegExp('home'.to.be["true"])));
  });
  it('ActiveRoute.name(/home/)', function() {
    return expect(ActiveRoute.name(/home/.to.be["true"]));
  });
  it('ActiveRoute.path(\'/\')', function() {
    return expect(ActiveRoute.path('/'.to.be["true"]));
  });
  it('ActiveRoute.path(new RegExp(\'\\\\/\'))', function() {
    return expect(ActiveRoute.path(new RegExp('\\/'.to.be["true"])));
  });
  it('ActiveRoute.path(/\\//)', function() {
    return expect(ActiveRoute.path(/\//.to.be["true"]));
  });
};

describe('Router: kadira:flow-router', function() {
  after(function() {
    return delete Package['kadira:flow-router'];
  });
  before(function() {
    var Router;
    Router = {
      current: function() {
        return {
          path: '/'
        };
      },
      getRouteName: function() {
        return 'home';
      },
      watchPathChange: function() {}
    };
    return Package['kadira:flow-router'] = {
      FlowRouter: Router
    };
  });
  return describe('Client', function() {
    return makeClientTests();
  });
});
