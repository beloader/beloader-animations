import anime from 'animejs';
import {Q} from 'elementify';
import AbstractAnimation from 'core/AbstractAnimation';

export default class BackgroundColor extends AbstractAnimation {
  constructor(options = {}) {
    super(options);

    this.required(['targets', 'from', 'to']);
    this.options.define('duration', 3000);
    this.options.define('easing', 'easeInOutQuad');
    this.options.define('direction', 'alternate');
    this.options.define('loop', true);
  }

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
