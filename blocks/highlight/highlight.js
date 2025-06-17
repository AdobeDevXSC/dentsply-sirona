import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Optimize Image
  const backgroundImage = block.querySelector('picture > img');
  const optimizedPic = createOptimizedPicture(backgroundImage.src, backgroundImage.alt, false, [{ width: '1600' }]);
  moveInstrumentation(backgroundImage, optimizedPic.querySelector('img'));
  backgroundImage.closest('picture').replaceWith(optimizedPic);
}
