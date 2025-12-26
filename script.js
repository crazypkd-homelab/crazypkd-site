// Panel navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const panelsContainer = document.querySelector('.panels');
  const panels = document.querySelectorAll('.panel');
  const leftArrow = document.querySelector('.nav-arrow-left');
  const rightArrow = document.querySelector('.nav-arrow-right');

  if (!panelsContainer || !panels.length || !leftArrow || !rightArrow) {
    return;
  }

  // Function to update arrow states
  function updateArrowStates() {
    const scrollLeft = panelsContainer.scrollLeft;
    const scrollWidth = panelsContainer.scrollWidth;
    const clientWidth = panelsContainer.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    // Enable/disable arrows based on scroll position
    leftArrow.disabled = scrollLeft <= 10;
    rightArrow.disabled = scrollLeft >= maxScroll - 10;
  }

  // Function to scroll to a specific panel
  function scrollToPanel(index) {
    if (index < 0 || index >= panels.length) return;
    
    const panel = panels[index];
    const panelLeft = panel.offsetLeft;
    const panelWidth = panel.offsetWidth;
    const containerWidth = panelsContainer.clientWidth;
    const scrollPosition = panelLeft - (containerWidth / 2) + (panelWidth / 2);
    
    panelsContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  // Function to get current panel index
  function getCurrentPanelIndex() {
    const scrollLeft = panelsContainer.scrollLeft;
    const containerWidth = panelsContainer.clientWidth;
    const centerPosition = scrollLeft + (containerWidth / 2);
    
    let currentIndex = 0;
    let minDistance = Infinity;
    
    panels.forEach((panel, index) => {
      const panelCenter = panel.offsetLeft + (panel.offsetWidth / 2);
      const distance = Math.abs(panelCenter - centerPosition);
      
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = index;
      }
    });
    
    return currentIndex;
  }

  // Left arrow click handler
  leftArrow.addEventListener('click', function() {
    const currentIndex = getCurrentPanelIndex();
    if (currentIndex > 0) {
      scrollToPanel(currentIndex - 1);
    }
  });

  // Right arrow click handler
  rightArrow.addEventListener('click', function() {
    const currentIndex = getCurrentPanelIndex();
    if (currentIndex < panels.length - 1) {
      scrollToPanel(currentIndex + 1);
    }
  });

  // Update arrow states on scroll
  panelsContainer.addEventListener('scroll', updateArrowStates);

  // Initial arrow state update
  updateArrowStates();

  // Update arrow states on window resize
  window.addEventListener('resize', function() {
    updateArrowStates();
  });
});

