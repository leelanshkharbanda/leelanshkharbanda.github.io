/* Field Notes — progressive enhancement only. No JS means all content is visible. */
(function () {
  "use strict";
  var mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if ((mq && mq.matches) || !("IntersectionObserver" in window)) return;
  var root = document.documentElement;
  root.classList.add("js-motion");
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
  if (mq && mq.addEventListener) {
    mq.addEventListener("change", function () {
      if (mq.matches) {
        root.classList.remove("js-motion");
        io.disconnect();
      }
    });
  }
})();
