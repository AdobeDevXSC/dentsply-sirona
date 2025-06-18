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

  // Store extracted descriptions separately
  const slideDescriptions = [];

  slides.forEach((slide, index) => {
    // Extract all text elements: headings (h1-h6) and paragraphs
    const textElements = Array.from(slide.querySelectorAll('h1,h2,h3,h4,h5,h6,p'));

    // Save their outerHTML to preserve tags
    const descriptionHTML = textElements.map(el => el.outerHTML).join('');

    // Remove those text elements from the slide
    textElements.forEach(el => el.parentElement.remove());

    // Add slide to the track
    track.appendChild(slide);

    // Store the extracted description HTML for later
    slideDescriptions.push(descriptionHTML);

    // Mark all slides except the first as inactive
    if (index !== 0) slide.classList.add('inactive');
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
    description.innerHTML = slideDescriptions[index];

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
    currentIndex = (currentIndex + 1) % slides.length;
    updateDescription(currentIndex);
  });

  // Initialize carousel with first slide
  updateDescription(currentIndex);
}
