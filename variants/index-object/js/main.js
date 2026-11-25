/* INDEX OBJECT — progressive enhancement only. All content is readable with JS off. */
(function () {
  'use strict';

  var toggles = document.querySelectorAll('.dossier-toggle');
  Array.prototype.forEach.call(toggles, function (button) {
    button.addEventListener('click', function () {
      var card = button.closest('.dossier');
      if (!card) return;
      var open = card.classList.toggle('is-open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      var label = button.querySelector('.toggle-label');
      if (label) label.textContent = open ? 'Close project' : 'Open project';
    });
  });

  if ('IntersectionObserver' in window) {
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
    var byId = {};
    links.forEach(function (link) {
      byId[link.getAttribute('href').slice(1)] = link;
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || !byId[entry.target.id]) return;
        links.forEach(function (link) { link.removeAttribute('aria-current'); });
        byId[entry.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['projects', 'index', 'notes', 'about', 'contact'].forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
