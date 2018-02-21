import Ember from 'ember';

const {
  RSVP: {
    Promise,
    all
  }
} = Ember;

const cacheEventItems = (e) => {
  // cachable items
  let { isTrusted, path, returnValue, srcElement, timeStamp, target, type } = e;
  return Object.assign({ isTrusted, path, returnValue, srcElement, timeStamp, target, type }, e);
}

export default function injectScripts(scripts) {
  let promisePool = [];

  scripts.forEach((script) => {

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

    let promise;
    if (script.src) {
      $scriptEl.src = script.src;
      promise = new Promise((resolve) => {
        // success
        $scriptEl.onload = (e) => {
          resolve(cacheEventItems(e));
          if (script.onload) {
            script.onload(e);
          }
        }

        // failure
        $scriptEl.onerror = (e) => {
          resolve(cacheEventItems(e));
          if (script.onerror) {
            script.onerror(e);
          }
        }
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

    promisePool.push(promise);

    $scriptEl.async = true;

    document.getElementsByTagName('head')[0].appendChild($scriptEl);

  });

  return all(promisePool)
}
