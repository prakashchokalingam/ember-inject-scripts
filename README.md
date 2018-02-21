# ember-inject-scripts
Seamlessly inject any sort of scripts inside your ember application

## Features
  - Inject multiple scripts
  - Get onload and onerror callbacks for induvidual scripts
  - Inject scripts with attributes
  - Inject inline scripts
  - Get all scripts cached events on done.

## Installation

    npm install --save ember-inject-scripts

## Usage

      let scripts = [
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

      injectScripts(scripts).then(() => {
        console.log ( "🤟Yay ! scripts injected" );
      });

      ---->
      <script type="text/javascript" id="vuejs" data-test-script="vuejs" data-library="vuejs"
      src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>

      <script type="text/javascript" id="inline" data-test-script="inline" data-inline="true">
        console.log('inline script rendered');
      </script>

 **injectScripts** function expects **array of objects as parameter**, the object items are,

 | name        | type           | description  |
| ------------- |:-------------:| -----|
| id      | string : optional | Adds an id attribute to the script element `id=id` and also creates a test selector `data-test-script=id` |
| type      | string : optional : default `text/javascript` | Adds type to the script element |
| src      | string : optional | Adds a source to the script element `src=src`|
| inline      | string : optional | Adds inline contents to the script element `<script> inline </script>` |
| attributes      | Array of object : optional `{ name: 'data-inline', value: 'true' }`| Adds attribute contents to the script element `<script data-inline="true"> inline </script>` |
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
