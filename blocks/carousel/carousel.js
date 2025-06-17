import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // // Optimize Image
  // const img = block.querySelector('picture > img');
  // const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1600' }]);
  // moveInstrumentation(img, optimizedPic.querySelector('img'));
  // img.closest('picture').replaceWith(optimizedPic);
}
