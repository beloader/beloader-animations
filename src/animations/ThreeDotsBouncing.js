/**
*  @file ThreeDotsBouncing.js
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*  @licence AGPL-3.0 {@link https://github.com/liqueurdetoile/beloader-animations/blob/master/LICENSE}
*/

const anime = window.anime;
const Q = window.elementify.Q;

import AbstractAnimation from 'core/AbstractAnimation';

/**
*  ThreeDotsBouncing provides a block of
*  three dots bouncing from left to right and reverse.
*
*  @version 1.0.0
*  @since 1.0.0
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*  @extends {AbstractAnimation}
*
*  @example
*  var dots = new ThreeDotsBouncing();
*
*  document.body.appendChild(dots.block);
*  dots.start();
*
*  @see https://cdn.rawgit.com/beloader/beloader-animations/94619414/demos/threedotsbouncing.html
*/
export default class ThreeDotsBouncing extends AbstractAnimation {
  /**
  *  Creates an instance of ThreeDotsBouncing with given
  *  options
  *
  *  @version 1.0.0
  *  @since 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @param {Object} options  Options for the animation
  *  @param {boolean} [options.loop=true]
  *  @param {number}  [options.duration=3000]  Duration of the animation
  *  @param {number}  [options.offset=1000]  Offset duration between each dots animation
  *  @param {number}  [options.width=25%]  Width of the container (any CSS compatible value)
  *  @param {Object}  [options.dots]  Specific options for dots
  *  @param {number}  [options.dots.width=30]  Width of a dot (in pixels)
  *  @param {number}  [options.dots.height=30]  Height of a dot (in pixels)
  *  @param {string|Function}  [options.dots.color='#fff']  color of a dot (any CSS compatible form)
  */
  constructor(options = {}) {
    super(options);

    this.options.define('loop', true);
    this.options.define('duration', 3000);
    this.options.define('offset', 1000);
    this.options.define('width', '25%');
    this.options.define('dots.width', 30);
    this.options.define('dots.height', 30);
    this.options.define('dots.color', '#fff');
  }

  /**
  *  Get the HTMLElement for the block
  *
  *  @version 1.0.0
  *  @since 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *  @type {HTMLElement}
  */
  get block() {
    /* istanbul ignore else */
    if (!this._block) {
      let dd = [
        this.options.pull('duration') + this.options.pull('offset'),
        this.options.pull('duration') / 2,
        this.options.pull('duration') - this.options.pull('offset')
      ];
      let ddr = dd.reverse();

      this._block = Q('+div', {
        id: this.id,
        class: 'tbd',
        style: {
          margin: '0 auto',
          width: this.options.pull('width')
        }
      });

      dd.forEach((d, i) => {
        let line = Q('+div', {
          class: 'tbd-line',
          style: 'margin: 1em 0'
        });

        line.append(Q('+div', {
          class: 'tbd-dot',
          style: {
            width: this.options.pull('dots.width'),
            height: this.options.pull('dots.height'),
            backgroundColor: this.options.pull('dots.color')
          },
          data: {
            duration: d,
            'duration-rev': ddr[i]
          }
        }));

        this._block.append(line);
      });
    }

    return this._block;
  }

  /**
  *  Starts the animation
  *
  *  @version 1.0.0
  *  @since 1.0.0
  *  @author Liqueur de Toile <contact@liqueurdetoile.com>
  *
  *  @returns {this} Chainable
  */
  start() {
    let timeline = anime.timeline({
      loop: this.options.pull('loop'),
      autoplay: true
    });

    timeline.add({
      targets: `#${this.id} .tbd-dot`,
      translateX: Q(`#${this.id}`).width - this.options.pull('dots.width'),
      rotate: 180,
      duration: function (target) {
        return target.getAttribute('data-duration');
      },
      delay: function (target, index) {
        return index * 100;
      },
      elasticity: function (target, index, totalTargets) {
        return 200 + ((totalTargets - index) * 200);
      }
    });

    timeline.add({
      targets: `#${this.id} .tbd-dot`,
      translateX: 0,
      rotate: 0,
      duration: function (target) {
        return target.getAttribute('data-duration-rev');
      },
      delay: function (target, index, totalTargets) {
        return 100 + ((totalTargets - index) * 100);
      },
      elasticity: function (target, index, totalTargets) {
        return 200 + ((index - totalTargets) * 200);
      }
    });

    this.animation = timeline;

    return this;
  }
}
