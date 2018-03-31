import ObjectArray from 'dot-object-array';
import uniqid from 'uniqid';

export default class AbstractAnimation {
  constructor(options = {}) {
    this.id = 'animation-' + uniqid();
    this.options = new ObjectArray(options);
  }

  required(opts) {
    if (typeof opts === 'string') opts = [opts];
    opts.forEach(p => {
      if (!this.options.has(p)) throw new TypeError(`Missing option ${p} for animation`);
    });
  }
}
