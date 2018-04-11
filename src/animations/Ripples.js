/**
*  @file Ripples.js
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*  @licence AGPL-3.0 {@link https://github.com/liqueurdetoile/beloader-animations/blob/master/LICENSE}
*/

const anime = window.anime;
const Q = window.elementify.Q;

import AbstractAnimation from 'core/AbstractAnimation';

/**
 * Ripples is a fully customizable effect that
 * generates... ripples.
 * It can be used as highlighter for click or items.
 * It can also be used as loader whith loop active.
 *
 * @version 1.0.0
 * @since 1.0.0
 * @author Liqueur de Toile <contact@liqueurdetoile.com>
 * @extends {AbstractAnimation}
 */
export default class Ripples extends AbstractAnimation {
  /**
   * Creates an instance of Ripples
   * @version 1.0.0
   * @since 1.0.0
   * @author Liqueur de Toile <contact@liqueurdetoile.com>
   * @param {Object} [options={}] Options for animation
   * @param {boolean} [options.loop=false]  Wether if animation should loop
   * @param {number} [options.duration=3000] Duration of one ripple animation (ms)
   * @param {number} [options.offset=1000] Offset between two ripples animations (ms)
   * @param {string} [options.width='100px'] Width for the container (any allowed css value)
   * @param {string} [options.height='100px'] Height for the container (any allowed css value)
   * @param {number} [options.scale=30] Scale factor
   * @param {string} [options.easing] Easing formula (any allowed easing by animejs)
   * @param {Object} [options.ripples]  Ripples Options
   * @param {number} [options.ripples.count=3]  Number of ripples
   * @param {string} [options.ripples.width='3px']  Initial innerWidth of a ripple (any allowed css value)
   * @param {string} [options.ripples.height='3px']  Initial innerWidth of a ripple (any allowed css value)
   * @param {string} [options.ripples.borderColor='#09c']  Border color of ripples (any allowed css value)
   * @param {string} [options.ripples.borderStyle='solid']  Border style of ripples (any allowed css value)
   * @param {string} [options.ripples.borderWidth='1px']  Initial border width (any allowed css value)
   * @param {string} [options.ripples.background='']  Background property of a ripple (any allowed css value)
   * @param {Object} [options.ripples.opacity]  Specific options for opacity animation
   * @param {number} [options.ripples.opacity.start=1]  Initial opacity value
   * @param {number} [options.ripples.opacity.end=0]  Final opacity value
   * @param {number} [options.ripples.opacity.duration=this.options.duration]  Opacity animation duration
   * @param {number} [options.ripples.opacity.easing=this.options.easing] Opacity animation easing
   */
  constructor(options = {}) {
    super(options);

    /**
   * Active ripple index
   * @type {Number}
   * @since 1.0.0
   */
    this.activeRipple = 0;
    this.options.define('loop', false);
    this.options.define('duration', 3000);
    this.options.define('offset', 1000);
    this.options.define('width', '100px');
    this.options.define('height', '100px');
    this.options.define('scale', 30);
    this.options.define('easing', 'easeInSine');
    this.options.define('ripples.count', 3);
    this.options.define('ripples.width', '3px');
    this.options.define('ripples.height', '3px');
    this.options.define('ripples.borderColor', '#09c');
    this.options.define('ripples.borderStyle', 'solid');
    this.options.define('ripples.borderWidth', '1px');
    this.options.define('ripples.background', 'none');
    this.options.define('ripples.borderRadius', '50%');
    this.options.define('ripples.opacity.start', 1);
    this.options.define('ripples.opacity.end', 0);
    this.options.define('ripples.opacity.duration', this.options.pull('duration'));
    this.options.define('ripples.opacity.easing', this.options.pull('easing'));
  }

  /**
   * HTML block for container
   * @type {HTMLElement}
   */
  get block() {
    /* istanbul ignore else */
    if (!this._block) {
      this._block = Q('+div', {
        id: this.id,
        class: 'ripple',
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: this.options.pull('width'),
          height: this.options.pull('height')
        }
      });
    }

    return this._block;
  }

  /**
   * Generates a ripple animation given the options
   * @return {Object} Animation that can be added to timeline
   */
  _ripple() {
    var ripple = Q('+div', {
      style: {
        position: 'absolute',
        width: this.options.pull('ripples.width'),
        height: this.options.pull('ripples.height'),
        borderRadius: this.options.pull('ripples.borderRadius'),
        background: this.options.pull('ripples.background'),
        borderStyle: this.options.pull('ripples.borderStyle'),
        borderWidth: this.options.pull('ripples.borderWidth'),
        borderColor: this.options.pull('ripples.borderColor')
      }
    });

    var animation = {
      targets: ripple.node,
      scale: {
        value: this.options.pull('scale'),
        duration: this.options.pull('duration'),
        easing: this.options.pull('easing')
      },
      opacity: {
        value: [
          this.options.pull('ripples.opacity.start'),
          this.options.pull('ripples.opacity.end')
        ],
        duration: this.options.pull('ripples.opacity.duration'),
        easing: this.options.pull('ripples.opacity.easing')
      },
      loop: this.options.pull('loop'),
      offset: this.activeRipple * this.options.pull('offset'),
      begin: function () {
        this._block.append(ripple);
      }.bind(this),
      complete: () => ripple.remove()
    };

    this.activeRipple++;
    if (this.activeRipple === this.options.pull('ripples.count')) {
      this.activeRipple = 0;
    }

    return animation;
  }

  /**
   * Launch the animation
   * @return {this} Chainable
   */
  start() {
    /**
     * Timeline object
     * @type {Timeline}
     */
    this.animation = anime.timeline({
      loop: this.options.pull('loop')
    });

    for (let i = 0; i < this.options.pull('ripples.count'); i++) {
      this.animation.add(this._ripple());
    }

    return this;
  }
}
