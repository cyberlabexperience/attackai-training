'use strict';
(() => {
  const invite = document.getElementById('invite');
  const review = document.getElementById('review');
  const result = document.getElementById('result');
  const open = document.getElementById('open-document');
  const confirm = document.getElementById('confirm-review');
  const restart = document.getElementById('restart-document');
  const back = document.getElementById('back-invite');
  const checks = Array.from(document.querySelectorAll('[data-risk]'));
  const status = document.getElementById('selection-status');
  if (!invite || !review || !result || !open || !confirm || !restart || !back || !status || checks.length !== 3) return;
  const views = { invite, review, result };
  function show(name) {
    Object.entries(views).forEach(([key, view]) => { view.hidden = key !== name; });
    document.querySelectorAll('[data-progress]').forEach((marker) => {
      if (marker.dataset.progress === name) marker.setAttribute('aria-current', 'step');
      else marker.removeAttribute('aria-current');
    });
    views[name].querySelector('h1').focus();
  }
  function clearChecks() {
    checks.forEach((check) => check.setAttribute('aria-pressed', 'false'));
    confirm.disabled = true;
    status.textContent = '0 de 3 comprobaciones revisadas';
  }
  open.disabled = false;
  open.addEventListener('click', () => show('review'));
  checks.forEach((check) => check.addEventListener('click', () => {
    check.setAttribute('aria-pressed', check.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    const count = checks.filter((item) => item.getAttribute('aria-pressed') === 'true').length;
    status.textContent = `${count} de 3 comprobaciones revisadas`;
    confirm.disabled = count !== 3;
  }));
  confirm.addEventListener('click', () => {
    if (checks.every((check) => check.getAttribute('aria-pressed') === 'true')) {
      clearChecks();
      show('result');
    }
  });
  back.addEventListener('click', () => { clearChecks(); show('invite'); });
  restart.addEventListener('click', () => { clearChecks(); show('invite'); });
})();
