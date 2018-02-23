import Ember from 'ember';

const {
  RSVP: {
    Promise,
    all
  },
  merge
} = Ember;

var scripts;

const cacheEventItems = (e) => {
  // cachable items
  let { isTrusted, path, returnValue, srcElement, timeStamp, target, type } = e;
  return merge({ isTrusted, path, returnValue, srcElement, timeStamp, target, type }, e);
};

const removeEvents = ($ele, script) => {
  $ele.removeEventListener('load', script.onloadCallback);
  $ele.removeEventListener('error', script.onerrorCallback);
};

const injectScript = (script) => {

  let promise;

  // once
  if (script.once) {
    let $existingScript = document.getElementById(script.id);
    if ($existingScript) {
      promise = new Promise((resolve) => {
        let customEvent = { target: $existingScript};
        resolve(customEvent);
      });
      return promise;
    }
  }

  //  create element

  let $scriptEl = document.createElement('script');

  $scriptEl.type = (script.type) ? script.type : 'text/javascript';

  if (script.id) {
    $scriptEl.id = script.id;
    $scriptEl.setAttribute('data-test-script', script.id);
  }

  if (script.attributes) {
    script.attributes.forEach((attribute) => {
      $scriptEl.setAttribute(attribute.name, attribute.value);
    });
  }

  // for inline script
  if (script.inline) {
    let $inlineNode = document.createTextNode(script.inline);
    $scriptEl.appendChild($inlineNode);
    promise = new Promise((resolve) => {
      let customInlineEvent = { target: $scriptEl};
      resolve(customInlineEvent);
    });
  }

  // for external scripts
  if (script.src) {

    $scriptEl.src = script.src;

    promise = new Promise((resolve) => {

      // appending onload callback
      script.onloadCallback = (e) => {
        resolve(cacheEventItems(e));
        if (script.onload) {
          script.onload(e);
        }
        removeEvents($scriptEl, script);
      };

      // appending onerror callback
      script.onerrorCallback = (e) => {
        resolve(cacheEventItems(e));
        if (script.onerror) {
          script.onerror(e);
        }
        // removing element
        $scriptEl.remove();
        removeEvents($scriptEl, script);
      }

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

export default function injectScripts(scriptObjects) {

  scripts = scriptObjects;

  if (Array.isArray(scripts)) {

    let promisePool = [];
    scripts.forEach((script) => {
      let promise = injectScript(script);
      promisePool.push(promise);
    });

    return all(promisePool);


  } else {

    return injectScript(scripts);

  }
}
