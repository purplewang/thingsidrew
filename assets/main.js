function setupStickyNav() {
  var site = document.querySelector('.site');

  window.onscroll = function() {
    var isScrolled = document.documentElement.scrollTop > 0;
    site.classList.toggle('site--scrolled', isScrolled);
  };
}

function setupPortfolioEntryViewer() {
  var viewer = document.querySelector('.portfolio-entry__viewer');
  if (!viewer) return;

  var previousButton = viewer.querySelector('.portfolio-entry__viewer-control--previous');
  var nextButton = viewer.querySelector('.portfolio-entry__viewer-control--next');
  var images = [].slice.call(viewer.querySelectorAll('.portfolio-entry__viewer-image'));
  var currentImage = 0;

  if (!previousButton || !nextButton) return;

  function update() {
    images.forEach((image, index) => {
      image.classList.toggle('portfolio-entry__viewer-image--visible', index === currentImage);
    });
  }

  previousButton.addEventListener('click', function() {
    currentImage = (currentImage + 1) % images.length;
    update();
  });

  nextButton.addEventListener('click', function() {
    currentImage = currentImage ? currentImage - 1 : images.length - 1;
    update();
  });

  update();
}

window.addEventListener('DOMContentLoaded', function() {
  setupStickyNav();
  setupPortfolioEntryViewer();
});
