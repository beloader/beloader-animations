/**
*  @file _blank.js
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*  @licence AGPL-3.0 {@link https://github.com/liqueurdetoile/beloader-animations/blob/master/LICENSE}
*/

const anime = window.anime; //eslint-disable-line
const Q = window.elementify.Q; //eslint-disable-line

import AbstractAnimation from 'core/AbstractAnimation';

/**
 * _Blank is the pattern class for creating animations
 *
 * @version 1.0.0
 * @since 1.0.0
 * @author Liqueur de Toile <contact@liqueurdetoile.com>
 * @extends {AbstractAnimation}
 */
export default class _Blank extends AbstractAnimation {
  /**
   * Initialize an instance
   * @param {Object} [options={}] Options for animation
   */
  constructor(options = {}) {
    super(options);
  }

  /**
   * Start the animation
   * @return {this} Chainable
   */
  start() {
    return this;
  }
}
