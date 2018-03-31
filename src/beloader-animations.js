/**
*  @file beloader-animations.js
*  @author Liqueur de Toile <contact@liqueurdetoile.com>
*  @licence AGPL-3.0 {@link https://github.com/liqueurdetoile/beloader/blob/master/LICENSE}
*/

export {Q} from 'elementify';
import animejs from 'animejs';
import ThreeDotsBouncing from 'animations/blocks/ThreeDotsBouncing';
import BackgroundColor from 'animations/colors/BackgroundColor';

export const animations = {
  animejs: animejs,

  blocks: {
    ThreeDotsBouncing: ThreeDotsBouncing
  },

  colors: {
    BackgroundColor: BackgroundColor
  }
};

export default animations;
