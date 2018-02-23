import injectScripts from 'dummy/utils/inject-scripts';
import { module, test } from 'qunit';

const scripts = [
  {
    id: 'lodash',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.js',
    attributes: [
      {
        name: 'data-library',
        value: 'lodash',
      }
    ]
  },
  {
    id: 'vuejs',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
    attributes: [
      {
        name: 'data-library',
        value: 'vuejs'
      }
    ]
  },
  {
    id: 'inline',
    inline: `console.log('inline script rendered')`,
    attributes: [
      {
        name: 'data-inline',
        value: 'true'
      }
    ]
  },
  {
    id: 'vuejs',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
    attributes: [
      {
        name: 'data-library',
        value: 'vuejs'
      }
    ],
    once: true
  }
];

const  script = {
  id: 'vuejs',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
  attributes: [
    {
      name: 'data-library',
      value: 'vuejs'
    }
  ]
};

module('Unit | Utility | inject scripts');

// multiple Scripts

test('it injects the given multiple scripts', function(assert) {
  let done = assert.async();
  injectScripts(scripts).then((data) => {
    // Inject script then holds event for all given scripts
    assert.equal(data.length, scripts.length, `Inject script then holds event for all given scripts in then() arguments`);
    // Inject scripts loads only once if once option is true
    let lastResult = data[scripts.length-1];
    assert.ok(lastResult.hasOwnProperty('target'), `Inject scripts loads only once if once option is set to true and return target`);
    done();
  });
  // it injected the given script
  let testSelector = `[data-test-script=${scripts[0].id}]`;
  let $scriptEl = document.querySelector(testSelector)
  assert.ok($scriptEl, `Injected the script with the selector ${testSelector}`);

  // it injected the given script with the given attributes
  let attributeSelector = `[data-library=${scripts[1].id}]`;
  $scriptEl = document.querySelector(testSelector)
  assert.ok($scriptEl, `Injected the script with attributes - ${attributeSelector}`);

  // it injected the given inline script
  testSelector = `[data-test-script=${scripts[2].id}]`;
  $scriptEl = document.querySelector(testSelector)
  assert.ok($scriptEl, `Injected the inline script with the selector ${testSelector}`);

});

test('it injects the given single script',  function (assert) {
  let done = assert.async();
  injectScripts(script).then((data) => {
    // Inject script then holds event for the scripts
    assert.ok(data.hasOwnProperty('target'), `Inject script then holds event for the given scripts in then() arguments`);
    done();
  });

  // it injected the given inline script
  let testSelector = `[data-test-script=${script.id}]`;
  let $scriptEl = document.querySelector(testSelector)
  assert.ok($scriptEl, `Injected the inline script with the selector ${testSelector}`);

})

test('it injects the given single inline script',  function (assert) {
  let script = scripts[2];
  injectScripts(script);

  // it injected the given inline script
  let testSelector = `[data-test-script=${script.id}]`;
  let $scriptEl = document.querySelector(testSelector)
  assert.ok($scriptEl, `Injected the inline script with the selector ${testSelector}`);

})

test('it injects the given direct script url',  function (assert) {
  let [script] = scripts;
  injectScripts(script.src);

  // it injected the given inline script
  let testSelector = `[src="${script.src}"]`;
  let $scriptEl = document.querySelector(testSelector)
  assert.ok($scriptEl, `Injected the given script url directly`);

})
