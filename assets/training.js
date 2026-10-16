'use strict';
(() => {
  const simulation = document.querySelector('[data-simulation]');
  if (!simulation) return;
  const panels = Array.from(simulation.querySelectorAll('[data-step]'));
  const markers = Array.from(simulation.querySelectorAll('.progress li'));
  const status = simulation.querySelector('[data-step-status]');
  const identity = simulation.querySelector('[data-demo-identity]');
  const aliases = Object.freeze({
    'demo-a': 'Alias de demostración A',
    'demo-b': 'Alias de demostración B',
    'demo-c': 'Alias de demostración C'
  });
  let currentStep = 0;
  // Only predefined fictional aliases are selectable; no editable credential fields.
  function updateAlias() {
    if (!Object.prototype.hasOwnProperty.call(aliases, identity.value)) identity.value = 'demo-a';
    simulation.querySelectorAll('[data-demo-label]').forEach((label) => {
      label.textContent = aliases[identity.value];
    });
  }
  function showStep(index, moveFocus = true) {
    currentStep = Math.max(0, Math.min(index, panels.length - 1));
    panels.forEach((panel, position) => { panel.hidden = position !== currentStep; });
    markers.forEach((marker, position) => {
      if (position === currentStep) marker.setAttribute('aria-current', 'step');
      else marker.removeAttribute('aria-current');
      marker.classList.toggle('is-complete', position < currentStep);
    });
    const heading = panels[currentStep].querySelector('h2');
    status.textContent = `Paso ${currentStep + 1} de ${panels.length}: ${heading.textContent}`;
    if (moveFocus) {
      heading.focus({ preventScroll: true });
      simulation.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  function restart(moveFocus = true) {
    identity.value = 'demo-a';
    updateAlias();
    showStep(0, moveFocus);
  }
  identity.addEventListener('change', updateAlias);
  simulation.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || !simulation.contains(button)) return;
    if (button.hasAttribute('data-next')) showStep(currentStep + 1);
    if (button.hasAttribute('data-back')) showStep(currentStep - 1);
    if (button.hasAttribute('data-restart')) restart();
  });
  window.addEventListener('pageshow', (event) => { if (event.persisted) restart(false); });
  restart(false);
})();