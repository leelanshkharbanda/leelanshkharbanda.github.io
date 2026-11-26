/* INDEX OBJECT — progressive enhancement only. All content is readable with JS off.
   Selector guard (console-free): the script is inert unless #index-list,
   [data-scope-control] and [data-scope-status] all exist in the initial HTML. */
(function () {
  'use strict';

  var list = document.querySelector('#index-list');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-scope-control]'));
  var status = document.querySelector('[data-scope-status]');
  if (!list || !buttons.length || !status) return; // F01-style guard: no dead selectors

  var rows = Array.prototype.slice.call(list.querySelectorAll('.index-entry'));
  if (!rows.length) return;

  var counts = { all: rows.length, 'deep-dive': 0, archive: 0 };
  var labels = { all: 'ALL', 'deep-dive': 'DEEP DIVES', archive: 'ARCHIVE' };
  var current = 'all';

  rows.forEach(function (row) {
    var scope = row.getAttribute('data-scope');
    if (scope === 'deep-dive' || scope === 'archive') counts[scope] += 1;
  });

  function show(scope) {
    current = scope;
    rows.forEach(function (row) {
      row.hidden = !(scope === 'all' || row.getAttribute('data-scope') === scope);
    });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-scope-control') === scope ? 'true' : 'false');
    });
    status.textContent = labels[scope] + ' · ' + counts[scope] + ' OF ' + counts.all + ' RECORDS';
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      show(button.getAttribute('data-scope-control')); // idempotent setter, never a toggle
    });
  });



  /* Single canonical nav marker: one observed id, aria-current="location" on one link.
     This is an ARIA state, not a named-section readout element. */
  if ('IntersectionObserver' in window) {
    var canonical = document.querySelector('.site-nav a[href="#index"]');
    var target = document.getElementById('index');
    if (canonical && target) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          Array.prototype.forEach.call(document.querySelectorAll('.site-nav a[aria-current]'), function (link) {
            if (link !== canonical) link.removeAttribute('aria-current');
          });
          canonical.setAttribute('aria-current', 'location');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      observer.observe(target);
    }
  }
})();
