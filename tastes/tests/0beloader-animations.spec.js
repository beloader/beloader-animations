const Beloader = window.Beloader;
const loader = new Beloader();

import animations from 'beloader-animations';
import AbstractAnimation from 'core/AbstractAnimation';

describe('Main loader', function () {
  this.timeout(10000);

  it('should load dependencies', function () {
    let p = loader.pluginize('animations', animations);

    p.promise.then(() => {
      window.elementify.should.be.an('object');
      window.anime.should.be.a('function');
    });
  });

  it('should not load dependencies', function () {
    let b = loader.pluginize('b', animations, {
      elementify: false,
      anime: false
    });

    return b.promise.then(() => {
      expect(true).to.be.true;
    });
  });

  it('should load animation and return promise', function (done) {
    animations.load('Ripples').then(Ripples => {
      let t = new Ripples();

      t.block.node.nodeName.should.equal('DIV');
      done();
    });
  });

  it('should fail loading animation and return promise', function () {
    return animations.load('Nothing')['catch'](error => {
      console.log(error);
      expect(true).to.be.true;
    });
  });

  it('should load animation and run callback', function (done) {
    animations.load('Ripples', function (Ripples) {
      let t = new Ripples();

      t.block.node.nodeName.should.equal('DIV');
      done();
    });
  });

  it('should fail loading animation and run failure callback', function (done) {
    animations.load('Nothing', null, error => {
      console.log(error);
      expect(true).to.be.true;
      done();
    });
  });
});

describe('AbstractAnimation', function () {
  it('should create an instance', function () {
    let a = new AbstractAnimation();

    a.block.should.be.false;
  });

  it('should store options', function () {
    let a = new AbstractAnimation({
      duration: 1000
    });

    a.options.pull('duration').should.equal(1000);
  });

  it('should check option as string', function () {
    let a = new AbstractAnimation({
      duration: 1000,
      fixture: false
    });

    a.check('duration').should.be.true;
    a.check('fixture').should.be.true;
    expect(a.check.bind(a, 'nothing')).to.throw(TypeError);
  });

  it('should check option as array', function () {
    let a = new AbstractAnimation({
      duration: 1000,
      fixture: false
    });

    a.check(['duration']).should.be.true;
    a.check(['duration', 'fixture']).should.be.true;
  });
});
