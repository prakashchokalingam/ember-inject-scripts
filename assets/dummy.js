"use strict";



define('dummy/app', ['exports', 'ember', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _ember, _dummyResolver, _emberLoadInitializers, _dummyConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix,
    Resolver: _dummyResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _dummyConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('dummy/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('dummy/controllers/application', ['exports', 'ember', 'dummy/utils/inject-scripts'], function (exports, _ember, _dummyUtilsInjectScripts) {
  var computed = _ember['default'].computed;

  var scripts = [{
    id: 'lodash',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.js',
    attributes: [{
      name: 'data-library',
      value: 'lodash'
    }]
  }, {
    id: 'vuejs',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
    attributes: [{
      name: 'data-library',
      value: 'vuejs'
    }]
  }, {
    id: 'inline',
    inline: 'console.log(\'inline script rendered\')',
    attributes: [{
      name: 'data-inline',
      value: 'true'
    }]
  }, {
    id: 'vuejs',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
    attributes: [{
      name: 'data-library',
      value: 'vuejs'
    }],
    once: true
  }];

  var singleScript = {
    id: 'vuejs',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
    attributes: [{
      name: 'data-library',
      value: 'vuejs'
    }]
  };

  exports['default'] = _ember['default'].Controller.extend({
    scripts: scripts,
    multipleScriptsStatus: false,
    singleScript: singleScript,
    singleScriptStatus: false,
    singleScriptDirectStringStatus: false,
    stringed: computed('scripts', function () {
      return JSON.stringify(this.get('scripts'));
    }),
    singleScriptStringed: computed('singleScript', function () {
      return JSON.stringify(this.get('singleScript'));
    }),
    init: function init() {
      var _this = this;

      (0, _dummyUtilsInjectScripts['default'])(singleScript.src).then(function (d) {
        console.log('direct string url script injection'); //eslint-disable-line no-console
        console.log(d); //eslint-disable-line no-console
        _this.set('singleScriptDirectStringStatus', true);
      });
      // inject multiple script
      (0, _dummyUtilsInjectScripts['default'])(this.get('scripts')).then(function (d) {
        _this.set('multipleScriptsStatus', true);
        console.log('multiple scripts'); //eslint-disable-line no-console
        console.log(d); //eslint-disable-line no-console
      });
      // inject multiple script
      (0, _dummyUtilsInjectScripts['default'])(this.get('singleScript')).then(function (d) {
        _this.set('singleScriptStatus', true);
        console.log('single script'); //eslint-disable-line no-console
        console.log(d); //eslint-disable-line no-console
      });
    }
  });
});
define('dummy/ember-inject-scripts/tests/addon.lint-test', ['exports'], function (exports) {
  QUnit.module('ESLint | addon');

  QUnit.test('ember-inject-scripts/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-inject-scripts/index.js should pass ESLint\n\n');
  });

  QUnit.test('ember-inject-scripts/utils/inject-scripts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-inject-scripts/utils/inject-scripts.js should pass ESLint\n\n');
  });
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_dummyConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _dummyConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_dummyConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: 'hash',
    rootURL: _dummyConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('/');
  });

  exports['default'] = Router;
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("dummy/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "XQDqlSWd", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"margin:auto\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\" Inject Scripts demo page \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" # Passed params (multiple script injection)\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"padding:30px; margin:20px; background-color: rgb(245, 245, 245);color: blue;\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"stringed\"]],false],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"margin-top:10px;\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"color: orange\"],[\"flush-element\"],[\"text\",\"Status: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"multipleScriptsStatus\"]]],null,5,4],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" ## Injected Script \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"pre\",[]],[\"flush-element\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"\\n  < script type=\\\"text/javascript\\\" id=\\\"lodash\\\" data-test-script=\\\"lodash\\\" data-library=\\\"lodash\\\" src=\\\"https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.js\\\" async=\\\"\\\" > < /script >\\n  < script type=\\\"text/javascript\\\" id=\\\"vuejs\\\" data-test-script=\\\"vuejs\\\" data-library=\\\"vuejs\\\" src=\\\"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js\\\" async=\\\"\\\" > < /script >\\n  < script type=\\\"text/javascript\\\" id=\\\"inline\\\" data-test-script=\\\"inline\\\" data-inline=\\\"true\\\" async=\\\"\\\" > console.log('inline script rendered')< /script >\\n\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" # Passed params (Single script injection - direct url)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"padding:30px; margin:20px; background-color: rgb(245, 245, 245);color: blue;\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"singleScript\",\"src\"]],false],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"margin-top:10px;\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"color: orange\"],[\"flush-element\"],[\"text\",\"Status: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"singleScriptDirectStringStatus\"]]],null,3,2],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" ## Injected Script \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"pre\",[]],[\"flush-element\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"\\n  < script type=\\\"text/javascript\\\" src=\\\"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js\\\" async=\\\"\\\" > < /script >\\n\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" # Passed params (Single script injection)\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"padding:30px; margin:20px; background-color: rgb(245, 245, 245);color: blue;\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"singleScriptStringed\"]],false],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"margin-top:10px;\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"color: orange\"],[\"flush-element\"],[\"text\",\"Status: \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"singleScriptStatus\"]]],null,1,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" ## Injected Script \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"pre\",[]],[\"flush-element\"],[\"open-element\",\"code\",[]],[\"flush-element\"],[\"text\",\"\\n  < script type=\\\"text/javascript\\\" id=\\\"vuejs\\\" data-test-script=\\\"vuejs\\\" data-library=\\\"vuejs\\\" src=\\\"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js\\\" async=\\\"\\\" > < /script >\\n\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"color: red\"],[\"flush-element\"],[\"text\",\"Injecting...\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"color: green\"],[\"flush-element\"],[\"text\",\"Done\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"color: red\"],[\"flush-element\"],[\"text\",\"Injecting...\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"color: green\"],[\"flush-element\"],[\"text\",\"Done\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"color: red\"],[\"flush-element\"],[\"text\",\"Injecting...\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"style\",\"color: green\"],[\"flush-element\"],[\"text\",\"Done\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});
define('dummy/utils/inject-scripts', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = injectScripts;
  var _Ember$RSVP = _ember['default'].RSVP;
  var Promise = _Ember$RSVP.Promise;
  var all = _Ember$RSVP.all;
  var merge = _ember['default'].merge;

  var scripts;

  var cacheEventItems = function cacheEventItems(e) {
    // cachable items
    var isTrusted = e.isTrusted;
    var path = e.path;
    var returnValue = e.returnValue;
    var srcElement = e.srcElement;
    var timeStamp = e.timeStamp;
    var target = e.target;
    var type = e.type;

    return merge({ isTrusted: isTrusted, path: path, returnValue: returnValue, srcElement: srcElement, timeStamp: timeStamp, target: target, type: type }, e);
  };

  var removeEvents = function removeEvents($ele, script) {
    $ele.removeEventListener('load', script.onloadCallback);
    $ele.removeEventListener('error', script.onerrorCallback);
  };

  var injectScript = function injectScript(script) {

    var promise = undefined;

    // once
    if (script.once) {
      var _ret = (function () {
        var $existingScript = document.getElementById(script.id);
        if ($existingScript) {
          promise = new Promise(function (resolve) {
            var customEvent = { target: $existingScript };
            resolve(customEvent);
          });
          return {
            v: promise
          };
        }
      })();

      if (typeof _ret === 'object') return _ret.v;
    }

    //  create element

    var $scriptEl = document.createElement('script');

    $scriptEl.type = script.type ? script.type : 'text/javascript';

    if (script.id) {
      $scriptEl.id = script.id;
      $scriptEl.setAttribute('data-test-script', script.id);
    }

    if (script.attributes) {
      script.attributes.forEach(function (attribute) {
        $scriptEl.setAttribute(attribute.name, attribute.value);
      });
    }

    // for inline script
    if (script.inline) {
      var $inlineNode = document.createTextNode(script.inline);
      $scriptEl.appendChild($inlineNode);
      promise = new Promise(function (resolve) {
        var customInlineEvent = { target: $scriptEl };
        resolve(customInlineEvent);
      });
    }

    // for external scripts
    if (script.src) {

      $scriptEl.src = script.src;

      promise = new Promise(function (resolve) {

        // appending onload callback
        script.onloadCallback = function (e) {
          resolve(cacheEventItems(e));
          if (script.onload) {
            script.onload(e);
          }
          removeEvents($scriptEl, script);
        };

        // appending onerror callback
        script.onerrorCallback = function (e) {
          resolve(cacheEventItems(e));
          if (script.onerror) {
            script.onerror(e);
          }
          removeEvents($scriptEl, script);
          // removing element
          $scriptEl.remove();
        };

        // success
        $scriptEl.addEventListener('load', script.onloadCallback);

        // error
        $scriptEl.addEventListener('error', script.onerrorCallback);
      });
    }
    $scriptEl.async = true;

    document.getElementsByTagName('head')[0].appendChild($scriptEl);

    return promise;
  };

  function injectScripts(scriptObjects) {

    scripts = scriptObjects;

    if (Array.isArray(scripts)) {
      var _ret2 = (function () {

        var promisePool = [];
        scripts.forEach(function (script) {
          var promise = injectScript(script);
          promisePool.push(promise);
        });

        return {
          v: all(promisePool)
        };
      })();

      if (typeof _ret2 === 'object') return _ret2.v;
    } else if (typeof scripts === 'string') {
      var script = { src: scripts };
      return injectScript(script);
    } else {
      return injectScript(scripts);
    }
  }
});


define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({});
}
//# sourceMappingURL=dummy.map
