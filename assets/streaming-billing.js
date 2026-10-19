'use strict';
(() => {
  const initial = document.getElementById('billing-view');
  const education = document.getElementById('education-view');
  const review = document.getElementById('review-billing');
  const restart = document.getElementById('restart-billing');
  if (!initial || !education || !review || !restart) return;
  review.disabled = false;
  review.addEventListener('click', () => {
    initial.hidden = true;
    education.hidden = false;
    document.getElementById('education-title').focus();
  });
  restart.addEventListener('click', () => {
    education.hidden = true;
    initial.hidden = false;
    review.focus();
  });
})();
