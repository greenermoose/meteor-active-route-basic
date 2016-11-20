var ActiveRouteBasic, checkParams, checkRouteOrPath, checkRouterPackages, errorMessages, test;
var share = {};
var fr = null;

checkRouteOrPath = function(arg) {
  var error;
  try {
    return check(arg, Match.OneOf(RegExp, String));
  } catch (_error) {
    error = _error;
    throw new Error(errorMessages.invalidRouteNameArgument);
  }
};

checkParams = function(arg) {
  var error;
  try {
    return check(arg, Object);
  } catch (_error) {
    error = _error; throw new Error(errorMessages.invalidRouteParamsArgument);
  }
};

checkRouterPackages = function() {
  fr = Package['kadira:flow-router'];
  if (!fr) { throw new Error(errorMessages.noSupportedRouter); }
};

errorMessages = {
  noSupportedRouter: 'No supported router installed. Please install kadira:flow-router.',
  invalidRouteNameArgument: 'Invalid argument, must be String or RegExp.',
  invalidRouteParamsArgument: 'Invalid arguemnt, must be Object.'
};

share.config = new ReactiveDict('activeRouteConfig');
share.config.setDefault({ activeClass: 'active', caseSensitive: true, disabledClass: 'disabled' });

test = function(value, pattern) {
  var result;
  if (!value) { return false; }
  if (Match.test(pattern, RegExp)) {
    result = value.search(pattern);
    result = result > -1;
  } else if (Match.test(pattern, String)) {
    if (share.config.equals('caseSensitive', false)) {
      value = value.toLowerCase();
      pattern = pattern.toLowerCase();
    }
    result = (value === pattern);
  }
  return (result != null) ? result : false;
};

ActiveRouteBasic = {
  config: function(options) {
    if (Meteor.isServer) { return; }
    share.config.set(options);
  },
  name: function(routeName, routeParams) {
    var controller, currentPath, currentRouteName, path, _ref, _ref1;
    if (routeParams == null) { routeParams = {}; }
    checkRouterPackages();
    if (Meteor.isServer && !Package['kadira:flow-router-ssr']) { return; }
    checkRouteOrPath(routeName);
    checkParams(routeParams);
    if (fr) {
      if (!_.isEmpty(routeParams) && Match.test(routeName, String)) {
        fr.FlowRouter.watchPathChange();
        if (currentPath == null) { currentPath = fr.FlowRouter.current().path; }
        if (path == null) { path = fr.FlowRouter.path(routeName, routeParams); }
      } else {
        if (currentRouteName == null) { currentRouteName = fr.FlowRouter.getRouteName();
        }
      }
    }
    return test(currentPath || currentRouteName, path || routeName);
  },
  path: function(path) {
    var controller, currentPath;
    checkRouterPackages();
    if (Meteor.isServer) { return; }
    checkRouteOrPath(path);
    if (fr) {
      fr.FlowRouter.watchPathChange();
      if (currentPath == null) { currentPath = fr.FlowRouter.current().path; }
    }
    return test(currentPath, path);
  }
};
