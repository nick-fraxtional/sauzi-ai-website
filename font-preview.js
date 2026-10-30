/* Temporary, homepage-only typography comparison. */
(() => {
  const panel = document.querySelector('.font-preview');
  if (!panel || new URLSearchParams(location.search).get('type-preview') !== '1') return;
  panel.hidden = false;
  const labels = {
    space: 'Space Grotesk headings + Inter body',
    inter: 'Inter headings + Inter body',
    mono: 'IBM Plex Mono headings + Inter body',
    original: 'Silkscreen headings + DotGothic16 body'
  };
  document.querySelector('.font-preview-close').addEventListener('click', () => { panel.hidden = true; });
  const buttons = document.querySelectorAll('[data-font-choice]');
  buttons.forEach(button => button.addEventListener('click', () => {
    const choice = button.dataset.fontChoice;
    document.body.dataset.font = choice;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.getElementById('font-preview-note').textContent = labels[choice];
  }));
})();
