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
  }
]

module('Unit | Utility | inject scripts');

test('it injects the given scripts', function(assert) {
  let done = assert.async();
  injectScripts(scripts).then((data) => {
    // Inject script then holds event for all given scripts
    assert.equal(data.length, scripts.length, `Inject script then holds event for all given scripts in then() arguments`);
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
