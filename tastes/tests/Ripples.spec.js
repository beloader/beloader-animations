const Beloader = window.Beloader;
const loader = new Beloader();
var Ripples;

import animations from 'beloader-animations';

describe('Ripples', function () {
  this.timeout(5000);

  window.before(function () {
    return loader.pluginize('animations', animations).promise;
  });

  it('should load Ripples', function () {
    return loader.animations.load('Ripples').then(a => {
      Ripples = a;
      a.name.should.equal('Ripples');
    });
  });

  it('should run Ripples without options', function () {
    let a = new Ripples();

    this.timeout(6000);
    a.block.node.nodeName.should.equal('DIV');
    a.start();
    return a.animation.finished.then(() => {
      a.animation.completed.should.be.true;
    });
  });

  it('should run Ripples with options', function () {
    let a = new Ripples({
      duration: 500,
      ripples: {
        count: 1
      }
    });

    this.timeout(1000);
    a.block.node.nodeName.should.equal('DIV');
    a.start();
    return a.animation.finished.then(() => {
      a.animation.completed.should.be.true;
    });
  });
});
