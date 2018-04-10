const Beloader = window.Beloader;
const loader = new Beloader();
var ThreeDotsBouncing;

import animations from 'beloader-animations';

describe('ThreeDotsBouncing', function () {
  this.timeout(5000);

  window.before(function () {
    return loader.pluginize('animations', animations).promise;
  });

  it('should load ThreeDotsBouncing', function () {
    return loader.animations.load('ThreeDotsBouncing').then(a => {
      ThreeDotsBouncing = a;
      a.name.should.equal('ThreeDotsBouncing');
    });
  });

  it('should run ThreeDotsBouncing with options', function () {
    let a = new ThreeDotsBouncing({
      loop: false,
      duration: 1000,
      offset: 100
    });

    this.timeout(2000);
    a.block.node.nodeName.should.equal('DIV');
    a.start();
    return a.animation.finished.then(() => {
      a.animation.completed.should.be.true;
    });
  });
});
