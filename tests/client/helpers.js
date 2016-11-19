var makePathTests, makeRouteTests;

makeRouteTests = function(inverse) {
  var cls, inverseRouteName, result, routeName;
  if (inverse == null) {
    inverse = false;
  }
  inverse = inverse ? 'Not' : '';
  result = inverse ? 'disabled' : 'active';
  routeName = inverse ? 'notHome' : 'home';
  inverseRouteName = inverse ? 'home' : 'notHome';
  cls = inverse ? 'is-disabled' : 'is-selected';
  it("{{is" + inverse + "ActiveRoute '" + routeName + "'}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActiveRoute"](routeName.to.be.a.string(result)));
  });
  it("{{is" + inverse + "ActiveRoute name='" + routeName + "'}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActiveRoute"](Spacebars.kw({
      name: routeName
    }).to.be.a.string(result)));
  });
  it("{{is" + inverse + "ActiveRoute class='" + cls + "' name='" + routeName + "'}}", function() {
    var options;
    options = Spacebars.kw({
      "class": cls,
      name: routeName
    });
    return expect(Blaze._globalHelpers["is" + inverse + "ActiveRoute"](options.to.be.a.string(cls)));
  });
  it("{{is" + inverse + "ActiveRoute className='" + cls + "' name='" + routeName + "'}}", function() {
    var options;
    options = Spacebars.kw({
      className: cls,
      name: routeName
    });
    return expect(Blaze._globalHelpers["is" + inverse + "ActiveRoute"](options.to.be.a.string(inverse ? 'is-disabled' : 'is-selected')));
  });
  it("{{is" + inverse + "ActiveRoute regex='" + routeName + "'}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActiveRoute"](Spacebars.kw({
      regex: routeName
    }).to.be.a.string(result)));
  });
  it("{{is" + inverse + "ActiveRoute '" + routeName + "'}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActiveRoute"](inverseRouteName.to.be["false"]));
  });
  it("{{is" + inverse + "ActiveRoute '" + routeName + "' class='" + cls + "'}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActiveRoute"](routeName, Spacebars.kw({
      "class": cls
    })).to.be.a.string(cls));
  });
  return it("{{is" + inverse + "ActiveRoute options}}", function() {
    var options;
    options = {
      name: routeName
    };
    return expect(Blaze._globalHelpers["is" + inverse + "ActiveRoute"](options.to.be.a.string(result)));
  });
};

makePathTests = function(inverse) {
  var cls, inversePath, path, regexPath, result;
  if (inverse == null) {
    inverse = false;
  }
  inverse = inverse ? 'Not' : '';
  result = inverse ? 'disabled' : 'active';
  path = inverse ? '/notHome' : '/';
  regexPath = inverse ? '\\/notHome' : '\\/';
  inversePath = inverse ? '/' : '/notHome';
  cls = inverse ? 'is-disabled' : 'is-selected';
  it("{{is" + inverse + "ActivePath path}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActivePath"](path.to.be.a.string(result)));
  });
  it("{{is" + inverse + "ActivePath path='" + path + "'}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActivePath"](Spacebars.kw({
      path: path
    }).to.be.a.string(result)));
  });
  it("{{is" + inverse + "ActivePath class='" + cls + "' path='" + path + "'}}", function() {
    var options;
    options = Spacebars.kw({
      "class": cls,
      path: path
    });
    return expect(Blaze._globalHelpers["is" + inverse + "ActivePath"](options.to.be.a.string(cls)));
  });
  it("{{is" + inverse + "ActivePath className='" + cls + "' path='" + path + "'}}", function() {
    var options;
    options = Spacebars.kw({
      className: cls,
      path: path
    });
    return expect(Blaze._globalHelpers["is" + inverse + "ActivePath"](options.to.be.a.string(cls)));
  });
  it("{{is" + inverse + "ActivePath regex='" + regexPath + "'}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActivePath"](Spacebars.kw({
      regex: regexPath
    }).to.be.a.string(result)));
  });
  it("{{is" + inverse + "ActivePath '" + inversePath + "'}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActivePath"](Spacebars.kw({
      path: inversePath
    }).to.be["false"]));
  });
  it("{{is" + inverse + "ActivePath '" + path + "' class='" + cls + "'}}", function() {
    return expect(Blaze._globalHelpers["is" + inverse + "ActivePath"](path, Spacebars.kw({
      "class": cls
    })).to.be.a.string(cls));
  });
  return it("{{is" + inverse + "ActivePath options}}", function() {
    var options;
    options = {
      path: path
    };
    return expect(Blaze._globalHelpers["is" + inverse + "ActivePath"](options.to.be.a.string(result)));
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
    makeRouteTests();
    makeRouteTests(true);
    makePathTests();
    return makePathTests(true);
  });
});
