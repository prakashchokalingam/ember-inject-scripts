import Ember from 'ember';

import injectScripts from '../utils/inject-scripts';

const { computed } = Ember;

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

const singleScript = {
  id: 'vuejs',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
  attributes: [
    {
      name: 'data-library',
      value: 'vuejs'
    }
  ]
};


export default Ember.Controller.extend({
  scripts,
  multipleScriptsStatus: false,
  singleScript,
  singleScriptStatus: false,
  stringed: computed('scripts', function () {
    return JSON.stringify(this.get('scripts'));
  }),
  singleScriptStringed: computed('singleScript', function () {
    return JSON.stringify(this.get('singleScript'));
  }),
  init () {
    // inject multiple script
    injectScripts(this.get('scripts')).then((d) => {
      this.set('multipleScriptsStatus', true);
      console.log('multiple scripts');  //eslint-disable-line no-console
      console.log(d); //eslint-disable-line no-console
    });
    // inject multiple script
    injectScripts(this.get('singleScript')).then((d) => {
      this.set('singleScriptStatus', true);
      console.log('single script'); //eslint-disable-line no-console
      console.log(d); //eslint-disable-line no-console
    })

  }
});
