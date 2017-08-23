function startCarousel() {
  var SLIDE_TIME = 4000;
  var header = document.querySelector('.section--main h1');
  var entries = Array.prototype.slice.call(
    document.querySelectorAll('.carousel__entry')
  );
  var currentlyVisible = -1;

  function stepCarousel() {
    header.classList.add('light');

    currentlyVisible += 1;

    if (currentlyVisible < entries.length) {
      entries[currentlyVisible].classList.add('carousel__entry--visible');
    } else {
      currentlyVisible = 0;
      entries.slice(1).forEach(function(entry) {
        entry.classList.remove('carousel__entry--visible');
      });
    }

    setTimeout(stepCarousel, SLIDE_TIME);
  }

  function startCarousel() {
    stepCarousel();
    header.removeEventListener('mouseenter', startCarousel, {passive: true});
    header.removeEventListener('touchstart', startCarousel, {passive: true});
  }

  header.addEventListener('mouseenter', startCarousel, {passive: true});
  header.addEventListener('touchstart', startCarousel, {passive: true});
}

function setupStickyNav() {
  var nav = document.querySelector('.nav');

  window.onscroll = function() {
    var isSticky = (
      document.body.scrollTop + document.documentElement.scrollTop > window.innerHeight
    );
    nav.classList.toggle('nav--sticky', isSticky);
  };
}

function setupFaq() {
  var questions = Array.prototype.slice.call(
    document.querySelectorAll('.faq-list__question'));

  questions.forEach(function(question) {
    question.addEventListener('click', function() {
      question.classList.toggle('faq-list__question--open');
    });
  });

  document.querySelector('.faq-list__expand-all').addEventListener('click', function(){
    questions.forEach(function(question) {
      question.classList.add('faq-list__question--open');
    });
  });
}

window.addEventListener('DOMContentLoaded', function() {
  startCarousel();
  setupStickyNav();
  setupFaq();
});
