var Spacebars, Template, func, helpers, isActive, name, __hasProp = {}.hasOwnProperty;

if (!(Package.templating && Package.spacebars)) { return; }

Template = Package.templating.Template;
Spacebars = Package.spacebars.Spacebars;

isActive = function(type, veracity) {
  // console.log("isActive");
  var helperName;
  if (veracity == null) { veracity = true; }
  var inverse = !veracity;
  helperName = 'is';
  if (inverse) { helperName += 'Not'; }
  helperName += "Active" + type;
  return function(options, attributes) {
    var className, isPath, name, path, pattern, regex, result, t, _ref;
    if (options == null) { options = {}; }
    if (attributes == null) { attributes = {}; }
    if (Match.test(options, Spacebars.kw)) { options = options.hash; }
    if (Match.test(attributes, Spacebars.kw)) { attributes = attributes.hash; }
    if (Match.test(options, String)) {
      if (share.config.equals('regex', true)) {
        options = { regex: options };
      } else if (type === 'Path') {
        options = { path: options };
      } else {
        options = { name: options };
      }
    }
    options = _.defaults(attributes, options);
    pattern = Match.ObjectIncluding({
      "class": Match.Optional(String),
      className: Match.Optional(String),
      regex: Match.Optional(Match.OneOf(RegExp, String)),
      name: Match.Optional(String),
      path: Match.Optional(String)
    });
    check(options, pattern);
    regex = options.regex, name = options.name, path = options.path;
    className = (_ref = options["class"]) != null ? _ref : options.className;
    if (type === 'Path') { name = null; } else { path = null; }
    if (!(regex || name || path)) {
      t = type === 'Route' ? 'name' : type;
      t = t.toLowerCase();
      console.error(("Invalid argument, " + helperName + " takes \"" + t + "\", ") + ("" + t + "=\"" + t + "\" or regex=\"regex\""));
      return false;
    }
    if (Match.test(regex, String)) {
      if (share.config.equals('caseSensitive', false)) {
        regex = new RegExp(regex, 'i');
      } else {
        regex = new RegExp(regex);
      }
    }
    if (regex == null) { regex = name || path; }
    if (inverse) {
      if (className == null) { className = share.config.get('disabledClass'); }
    } else {
      if (className == null) { className = share.config.get('activeClass'); }
    }
    if (type === 'Path') { isPath = true; }
    if (isPath) {
      result = ActiveRouteBasic.path(regex);
    } else {
      options = _.defaults(attributes, attributes.data);
      result = ActiveRouteBasic.name(regex, _.omit(options, ['class', 'className', 'data', 'regex', 'name', 'path']));
    }
    if (inverse) { result = !result; }
    if (result) { return className; } else { return false; }
  };
};

// changing how isActive is called
// true now means true, false means false
helpers = {
  isActiveRoute: isActive('Route', true),
  isActivePath: isActive('Path', true),
  isNotActiveRoute: isActive('Route', false),
  isNotActivePath: isActive('Path', false)
};

for (name in helpers) {
  if (!__hasProp.call(helpers, name)) continue;
  func = helpers[name];
  Template.registerHelper(name, func);
}
