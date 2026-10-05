'use strict';
const educationButton = document.querySelector('[data-show-education]');
if (educationButton) {
  educationButton.addEventListener('click', () => {
    document.getElementById('initialView').hidden = true;
    const educationView = document.getElementById('educationView');
    educationView.hidden = false;
    educationView.querySelector('h1').focus();
    window.scrollTo(0, 0);
  });
}