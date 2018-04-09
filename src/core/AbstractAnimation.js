import ObjectArray from 'dot-object-array';
import uniqid from 'uniqid';

/**
*  Abstract class for animations
*
*  @version 1.0.0
*  @since 1.0.0
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*/
export default class AbstractAnimation {
  /**
  *  Generates unique ID and stores options
  *
  *  @version 1.0.0
  *  @since 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *  @abstract
  */
  constructor(options = {}) {
    /**
    *  Auto-generated unique id for animation
    *  @since 1.0.0
    *  @type {string}
    */
    this.id = 'animation-' + uniqid();

    /**
    *  Options for the animation
    *  @since 1.0.0
    *  @type {DotObjectArray}
    */
    this.options = new ObjectArray(options);

    /**
    *  Animejs animation object or timeline
    *  @type {object}
    */
    this.animation = undefined;
  }

  /**
  *  Always return false
  *  if not overriden in childs class
  *
  *  @version 1.0.0
  *  @since 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *  @type {boolean}
  */
  get block() {
    return false;
  }

  /**
  *  Check if required options have been provided
  *
  *  @version 1.0.0
  *  @since 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {Array|string} opts Option name or array of options names
  *  @throws {TypeError}  If an option is missing
  */
  check(opts) {
    if (typeof opts === 'string') opts = [opts];
    opts.forEach(opt => {
      if (!this.options.has(opt)) throw new TypeError(`Missing option ${opt} for animation`);
    });
    return true;
  }
}
