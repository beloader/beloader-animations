const Beloader = window.Beloader;
const loader = new Beloader();

// import BackgroundColor from 'animations/BackgroundColor';
import animations from 'beloader-animations';

describe('BackgroundColor', function () {
  this.timeout(5000);

  it('should load BackgroundColor', function (done) {
    let a = loader.pluginize('animations', animations);

    a.promise.then(() => {
      loader.animations.load('BackgroundColor').then(a => {
        a.name.should.equal('BackgroundColor');
        done();
      });
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
