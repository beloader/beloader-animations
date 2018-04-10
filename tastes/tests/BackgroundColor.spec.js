const Beloader = window.Beloader;
const loader = new Beloader();
var BackgroundColor;

import animations from 'beloader-animations';

describe('BackgroundColor', function () {
  this.timeout(5000);

  window.before(function () {
    return loader.pluginize('animations', animations).promise;
  });

  it('should load BackgroundColor', function () {
    return loader.animations.load('BackgroundColor').then(a => {
      BackgroundColor = a;
      a.name.should.equal('BackgroundColor');
    });
  });

  it('should start animation', function () {
    let div = window.elementify.Q('+div');
    let c = new BackgroundColor({
      targets: div.node,
      from: '#000',
      to: '#fff',
      duration: 500
    });

    c.start();
    c.should.be.instanceof(BackgroundColor);
  });

  it('should throw exception', function () {
    expect(() => {new BackgroundColor();}).to.throw(TypeError); //eslint-disable-line
  });
});
