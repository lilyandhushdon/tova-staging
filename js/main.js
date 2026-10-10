/* ==========================================================================
   Tova Designs — site behaviour
   1. Mobile menu
   2. Footer year
   3. Gentle reveal on scroll
   4. Case study filters
   5. Contact form (Formspree)
   ========================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* 1. Mobile menu ------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');

  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
        toggle.focus();
      }
    });
  }

  /* 2. Footer year ------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* 3. Gentle reveal on scroll ------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* 4. Case study filters ----------------------------------------------- */
  var filterButtons = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-tags]');
  var count = document.querySelector('[data-count]');

  function applyFilter(value) {
    var shown = 0;
    cards.forEach(function (card) {
      var tags = card.getAttribute('data-tags').split(' ');
      var match = value === 'all' || tags.indexOf(value) !== -1;
      card.hidden = !match;
      if (match) {
        shown += 1;
        card.classList.add('is-visible');
      }
    });
    filterButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-filter') === value ? 'true' : 'false');
    });
    if (count) {
      count.textContent = shown + (shown === 1 ? ' concept project' : ' concept projects');
    }
  }

  if (filterButtons.length && cards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyFilter(btn.getAttribute('data-filter'));
      });
    });
    applyFilter('all');
  }

  /* 5. Contact form ------------------------------------------------------
     The form posts to Formspree (free plan available). Create a form at
     formspree.io, then replace YOUR_FORM_ID in contact.html's form action.
     Until you do, the form shows the thank-you message without sending. */
  var form = document.querySelector('[data-contact-form]');
  var success = document.querySelector('[data-form-success]');
  var errorBox = document.querySelector('[data-form-error]');
  var again = document.querySelector('[data-form-again]');

  function showSuccess() {
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }

  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorBox) errorBox.hidden = true;

      // Spam trap: real people never fill this hidden field
      var trap = form.querySelector('input[name="_gotcha"]');
      if (trap && trap.value) { showSuccess(); return; }

      var action = form.getAttribute('action') || '';
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        console.warn('Tova Designs: the contact form is not connected yet. Add your Formspree form ID in contact.html.');
        showSuccess();
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      var label = button.textContent;
      button.disabled = true;
      button.textContent = 'Sending…';

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          showSuccess();
        })
        .catch(function () {
          if (errorBox) errorBox.hidden = false;
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = label;
        });
    });

    if (again) {
      again.addEventListener('click', function () {
        success.hidden = true;
        form.hidden = false;
        var first = form.querySelector('#c-name');
        if (first) first.focus();
      });
    }
  }
})();
