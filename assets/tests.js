'use strict';

define('dummy/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('utils/inject-scripts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/inject-scripts.js should pass ESLint\n\n');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _dummyTestsHelpersStartApp, _dummyTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _dummyTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _dummyTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _dummyResolver, _dummyConfigEnvironment) {

  var resolver = _dummyResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, _ember, _dummyApp, _dummyConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var attributes = _ember['default'].merge({}, _dummyConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    return _ember['default'].run(function () {
      var application = _dummyApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('dummy/tests/test-helper', ['exports', 'dummy/tests/helpers/resolver', 'ember-qunit'], function (exports, _dummyTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_dummyTestsHelpersResolver['default']);
});
define('dummy/tests/tests.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/inject-scripts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/inject-scripts-test.js should pass ESLint\n\n');
  });
});
define('dummy/tests/unit/utils/inject-scripts-test', ['exports', 'dummy/utils/inject-scripts', 'qunit'], function (exports, _dummyUtilsInjectScripts, _qunit) {

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

  var script = {
    id: 'vuejs',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
    attributes: [{
      name: 'data-library',
      value: 'vuejs'
    }]
  };

  (0, _qunit.module)('Unit | Utility | inject scripts');

  // multiple Scripts

  (0, _qunit.test)('it injects the given multiple scripts', function (assert) {
    var done = assert.async();
    (0, _dummyUtilsInjectScripts['default'])(scripts).then(function (data) {
      // Inject script then holds event for all given scripts
      assert.equal(data.length, scripts.length, 'Inject script then holds event for all given scripts in then() arguments');
      // Inject scripts loads only once if once option is true
      var lastResult = data[scripts.length - 1];
      assert.ok(lastResult.hasOwnProperty('target'), 'Inject scripts loads only once if once option is set to true and return target');
      done();
    });
    // it injected the given script
    var testSelector = '[data-test-script=' + scripts[0].id + ']';
    var $scriptEl = document.querySelector(testSelector);
    assert.ok($scriptEl, 'Injected the script with the selector ' + testSelector);

    // it injected the given script with the given attributes
    var attributeSelector = '[data-library=' + scripts[1].id + ']';
    $scriptEl = document.querySelector(testSelector);
    assert.ok($scriptEl, 'Injected the script with attributes - ' + attributeSelector);

    // it injected the given inline script
    testSelector = '[data-test-script=' + scripts[2].id + ']';
    $scriptEl = document.querySelector(testSelector);
    assert.ok($scriptEl, 'Injected the inline script with the selector ' + testSelector);
  });

  (0, _qunit.test)('it injects the given single script', function (assert) {
    var done = assert.async();
    (0, _dummyUtilsInjectScripts['default'])(script).then(function (data) {
      // Inject script then holds event for the scripts
      assert.ok(data.hasOwnProperty('target'), 'Inject script then holds event for the given scripts in then() arguments');
      done();
    });

    // it injected the given inline script
    var testSelector = '[data-test-script=' + script.id + ']';
    var $scriptEl = document.querySelector(testSelector);
    assert.ok($scriptEl, 'Injected the inline script with the selector ' + testSelector);
  });

  (0, _qunit.test)('it injects the given single inline script', function (assert) {
    var script = scripts[2];
    (0, _dummyUtilsInjectScripts['default'])(script);

    // it injected the given inline script
    var testSelector = '[data-test-script=' + script.id + ']';
    var $scriptEl = document.querySelector(testSelector);
    assert.ok($scriptEl, 'Injected the inline script with the selector ' + testSelector);
  });

  (0, _qunit.test)('it injects the given direct script url', function (assert) {
    var script = scripts[0];

    (0, _dummyUtilsInjectScripts['default'])(script.src);

    // it injected the given inline script
    var testSelector = '[src="' + script.src + '"]';
    var $scriptEl = document.querySelector(testSelector);
    assert.ok($scriptEl, 'Injected the given script url directly');
  });
});
require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
