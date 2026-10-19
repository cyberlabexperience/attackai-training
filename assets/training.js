'use strict';
(() => {
  const login = document.querySelector('[data-lab-login]');
  if (!login) return;
  const initialView = document.getElementById('initialView');
  const educationView = document.getElementById('educationView');
  const identity = login.querySelector('[data-lab-identity]');
  const password = login.querySelector('[data-demo-password]');
  const submit = login.querySelector('[data-lab-submit]');
  const error = login.querySelector('[data-login-error]');
  const exampleButton = document.querySelector('[data-show-capture-example]');
  const example = document.getElementById('capture-example');

  function clearFields() {
    password.value = '';
    identity.value = '';
  }
  function showLogin(moveFocus = true) {
    clearFields();
    error.hidden = true;
    example.hidden = true;
    exampleButton.setAttribute('aria-expanded', 'false');
    educationView.hidden = true;
    initialView.hidden = false;
    submit.disabled = false;
    if (moveFocus) {
      identity.focus({ preventScroll: true });
      initialView.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  function showEducation() {
    // Retain only a boolean from native validity checks, never input strings.
    const completed = identity.validity.valid && password.validity.valid;
    clearFields();
    if (!completed) {
      error.hidden = false;
      identity.focus();
      return;
    }
    error.hidden = true;
    initialView.hidden = true;
    educationView.hidden = false;
    educationView.querySelector('h1').focus({ preventScroll: true });
    educationView.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
  submit.addEventListener('click', showEducation);
  login.addEventListener('input', () => { error.hidden = true; });
  // Enter behaves like the button, without a form or a server submission.
  login.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && (event.target === identity || event.target === password)) {
      event.preventDefault();
      showEducation();
    }
  });
  exampleButton.addEventListener('click', () => {
    example.hidden = !example.hidden;
    exampleButton.setAttribute('aria-expanded', String(!example.hidden));
    if (!example.hidden) example.querySelector('h3').focus({ preventScroll: true });
  });
  document.querySelector('[data-lab-restart]').addEventListener('click', () => showLogin());
  window.addEventListener('pagehide', clearFields);
  window.addEventListener('pageshow', () => showLogin(false));
  showLogin(false);
})();
