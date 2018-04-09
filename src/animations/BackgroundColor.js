/**
*  @file BackgroundColor.js
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*  @licence AGPL-3.0 {@link https://github.com/liqueurdetoile/beloader-animations/blob/master/LICENSE}
*/

const anime = window.anime;
const Q = window.elementify.Q;

import AbstractAnimation from 'core/AbstractAnimation';

/**
 * BackgroundColor is designed to cycle
 * between two background colors for an HTMLElement.
 *
 * @version 1.0.0
 * @since 1.0.0
 * @author Liqueur de Toile <contact@liqueurdetoile.com>
 * @extends {AbstractAnimation}
 */
export default class BackgroundColor extends AbstractAnimation {
  /**
   * Initialize an instance
   * @param {Object} [options={}] Options for animation
   * @param {HtmlElement} options.targets Target(s) for animation
   * @param {string} options.from Starting color (any valid CSS value)
   * @param {string} options.to Ending color (any valid CSS value)
   * @param {number} [options.duration=3000] Half-cycle duration
   * @param {string} [options.easing='easeInOutQuad'] Easing Function
   * @param {string} [options.direction='alternate']  Animation direction
   * @param {boolean|number} [options.loop] Should the animation loop or not
   */
  constructor(options = {}) {
    super(options);

    this.check(['targets', 'from', 'to']);
    this.options.define('duration', 3000);
    this.options.define('easing', 'easeInOutQuad');
    this.options.define('direction', 'alternate');
    this.options.define('loop', true);
  }

  /**
   * Start the animation
   * @return {this} Chainable
   */
  start() {
    // Setting start color
    Q(this.options.pull('targets')).style('backgroundColor', this.options.pull('from'));

    this.animation = anime({
      targets: this.options.pull('targets'),
      backgroundColor: this.options.pull('to'),
      direction: this.options.pull('direction'),
      loop: this.options.pull('loop'),
      easing: this.options.pull('easing'),
      duration: this.options.pull('duration')
    });

    return this;
  }
}
