# ember-inject-scripts <img src="https://emberjs.com/images/tomster-sm.png" height="50px" width="50px">
Seamlessly inject any sort of scripts inside your ember application



[![Build Status](https://travis-ci.org/prakashchokalingam/ember-inject-scripts.svg?branch=master)](https://travis-ci.org/prakashchokalingam/ember-inject-scripts)
[![npm](https://img.shields.io/npm/dm/ember-inject-scripts.svg)](https://www.npmjs.com/package/ember-inject-scripts)
[![npm version](http://img.shields.io/npm/v/ember-inject-scripts.svg?style=flat)](https://npmjs.org/package/ember-inject-scripts "View this project on npm")
[![dependencies Status](https://david-dm.org/prakashchokalingam/ember-inject-scripts/status.svg)](https://david-dm.org/prakashchokalingam/ember-inject-scripts)
[![devDependencies Status](https://david-dm.org/rajasegar/ember-addon-starterkit/dev-status.svg)](https://david-dm.org/rajasegar/ember-addon-starterkit?type=dev)
[![EmberObserver](http://emberobserver.com/badges/ember-inject-scripts.svg?branch=master)](http://emberobserver.com/addons/ember-inject-scripts)

## Features
  - Inject single script
  - Inject multiple scripts
  - Get onload and onerror callbacks for individual scripts
  - Inject scripts with attributes
  - Inject inline scripts
  - Inject script only once
  - Get all scripts cached events on done.

## Demo

<a href="https://prakashchokalingam.github.io/ember-inject-scripts" target="_blank">https://prakashchokalingam.github.io/ember-inject-scripts!</a>

## Installation

    npm install --save ember-inject-scripts

## Usage

### Single script injection

      import 'injectScript' from 'inject-scripts';

      injectScript("https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js").then(() => {
        console.log ( "🤟Yay ! script injected" );
      });

                    -------- or  --------

      let singleScript = {
        id: 'vuejs',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js',
        attributes: [
          {
            name: 'data-library',
            value: 'vuejs'
          }
        ]
      };

      injectScript(singleScript).then(() => {
        console.log ( "🤟Yay ! script injected" );
      });

      ---->
      <script type="text/javascript" id="vuejs" data-test-script="vuejs" data-library="vuejs"
      src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>

### Multiple scripts injection

      import 'injectScripts' from 'inject-scripts';

      let multipleScripts = [
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

      injectScripts(multipleScripts).then((events) => {
        // events - holds data for all scripts injection as array
        console.log ( "🤟🤟🤟Yay ! multiple scripts injected" );
      });

      ---->
      <script type="text/javascript" id="vuejs" data-test-script="vuejs" data-library="vuejs"
      src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>

      <script type="text/javascript" id="inline" data-test-script="inline" data-inline="true">
        console.log('inline script rendered');
      </script>

 **injectScripts** function expects **object** for single script inject and **array of objects** for multiple scripts injection as parameter, the object items are,

 | name        | type           | description  |
| ------------- |:-------------:| -----|
| id      | string : optional | Adds an id attribute to the script element `id=id` and also creates a test selector `data-test-script=id` |
| type      | string : optional : default `text/javascript` | Adds type to the script element |
| src      | string : optional | Adds a source to the script element `src=src`|
| inline      | string : optional | Adds inline contents to the script element `<script> inline </script>` |
| once      | boolean : optional | Looks for an element with the same `id` passed. If founded avoids the injection and returns the dom element as target |
| attributes      | Array of objects : optional `{ name: 'data-inline', value: 'true' }`| Adds attribute contents to the script element `<script data-inline="true"> inline </script>` |
| onload      | function : optional | Callback function for successive load of script. **not available for inline scripts** |
| onerror      | function : optional | Callback function for failure while loading of script. **not available for inline scripts** |


**injectScripts.then()** will return all the cacheable event values as array for all passed script elements.

**inline** scripts will have only **target** as the event value.


## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
