/**
 * Decorates a block element to transform it into an interactive carousel.
 * @param {HTMLElement} block - The container element to be transformed into a carousel
 */
export default function decorate(block) {
  // Create main container div for the carousel
  const container = document.createElement('div');
  container.className = 'carousel-container';

  // Create description area that will show slide titles/subtitles
  const description = document.createElement('div');
  description.className = 'carousel-description';

  // Create wrapper for the track (slides container)
  const trackWrapper = document.createElement('div');
  trackWrapper.className = 'carousel-track-wrapper';

  // Create the track that will hold all slides
  const track = document.createElement('div');
  track.className = 'carousel-track';

  // Create navigation button (right arrow)
  const nav = document.createElement('button');
  nav.className = 'carousel-nav';
  nav.innerHTML = '&rsaquo;'; // Right arrow HTML entity

  // Get all slides from the original block content
  const slides = Array.from(block.children);
  
  // Process each slide
  slides.forEach((slide, index) => {
    // Extract name from h4 or default to empty string
    const name = slide.querySelector('h4')?.textContent || '';
    
    // Extract subtitle from h5, p, or img alt text (fallback chain)
    const subtitle = slide.querySelector('h5')?.textContent ||
      slide.querySelector('p')?.textContent ||
      slide.querySelector('img')?.alt || '';

    // Remove all text elements (h4, h5, p) from the slide
    // since we'll display them in the description area instead
    ['h4', 'h5', 'p'].forEach(tag => {
      const el = slide.querySelector(tag);
      if (el) el.parentElement.remove();
    });

    // Add slide to the track
    track.appendChild(slide);
    
    // Mark all slides except first as inactive
    if (index !== 0) slide.classList.add('inactive');

    // Store extracted text in dataset for later use
    slide.dataset.name = name;
    slide.dataset.subtitle = subtitle;
  });

  // Build the DOM structure
  trackWrapper.appendChild(track);
  trackWrapper.appendChild(nav);
  container.appendChild(description);
  container.appendChild(trackWrapper);

  // Clear original block content and add our new carousel structure
  block.innerHTML = '';
  block.appendChild(container);

  // Track current slide index
  let currentIndex = 0;

  /**
   * Updates the description and visual state of the carousel
   * @param {number} index - Index of the slide to display
   */
  const updateDescription = (index) => {
    const slide = slides[index];
    const name = slide.dataset.name || '';
    const subtitle = slide.dataset.subtitle || '';

    // Update description HTML
    description.innerHTML = `
      <h4>${name}</h4>
      <h5>${subtitle}</h5>
    `;

    // Update active/inactive classes on slides
    slides.forEach((el, i) => {
      el.classList.toggle('inactive', i !== index);
    });

    // Move track to show current slide
    const offset = slides[index].offsetLeft;
    track.style.transform = `translateX(-${offset}px)`;
  };

  // Add click handler for navigation button
  nav.addEventListener('click', () => {
    // Cycle to next slide (wraps around if at end)
    currentIndex = (currentIndex + 1) % slides.length;
    updateDescription(currentIndex);
  });

  // Initialize carousel with first slide
  updateDescription(currentIndex);
}
