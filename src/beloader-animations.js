/**
*  @file beloader-animations.js
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*  @licence AGPL-3.0 {@link https://github.com/liqueurdetoile/beloader-animations/blob/master/LICENSE}
*/

import 'core/publicpath';

export const animations = {
  promise: undefined,

  init: function (options = {}) {
    let elementify, animejs;

    // Load elementify and anime if needed
    if (!window.elementify && options.elementify !== false) {
      elementify = this.parent.fetch('script', {
        id: 'elementify',
        url: options.elementify || 'https://unpkg.com/elementify@latest'
      }).promise;
    } else elementify = new Promise((resolve, reject) => { resolve();});

    if (!window.anime && options.anime !== false) {
      animejs = this.parent.fetch('script', {
        id: 'anime',
        url: options.anime || 'https://unpkg.com/animejs@latest'
      }).promise;
    } else animejs = new Promise((resolve, reject) => { resolve();});

    animations.promise = Promise.all([elementify, animejs]);

    return animations;
  },

  load: function (animation, success = null, failure = null) {
    let p = import(
      /* webpackChunkName: "[request]" */
      `animations/${animation}`
    );

    return new Promise((resolve, reject) => {
      p.then(
        a => {
          if (success instanceof Function) success(a.default);
          resolve(a.default);
        },
        e => {
          if (failure instanceof Function) failure(e);
          reject(e);
        }
      );
    });
  }
};

export default animations;
