/* Native scroll camera: the document remains freely scrollable in either direction. */
(() => {
  const tour = document.querySelector('.warehouse-tour');
  const hero = document.querySelector('.warehouse-hero');
  const scene = document.querySelector('.warehouse-scene');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 700px)');
  // Focal coordinates in the ecosystem cutaway: pipelines, semantics, and a combined MCP/report bridge.
  const stops = [
    { x: .5, y: .5, zoom: 1 },
    { x: .45, y: .35, zoom: 1.65 },
    { x: .79, y: .35, zoom: 1.65 },
    { x: .65, y: .74, zoom: 1.22 }
  ];
  const lastStop = stops.length - 1;
  let scheduled = false;
  const clamp = x => Math.max(0, Math.min(1, x));
  function render() {
    scheduled = false;
    const enabled = !reduced.matches && !narrow.matches;
    tour.classList.toggle('tour-motion', enabled);
    if (!enabled) {
      scene.style.transform = '';
      scene.style.width = '';
      scene.style.height = '';
      hero.style.removeProperty('--intro-opacity');
      tour.style.removeProperty('--hero-height');
      tour.style.removeProperty('--tour-height');
      tour.style.removeProperty('--hero-top');
      return;
    }
    const width = hero.clientWidth;
    const viewportHeight = window.innerHeight;
    const ratio = (scene.naturalHeight || 941) / (scene.naturalWidth || 1672);
    const imageWidth = width, imageHeight = width * ratio;
    const intro = hero.querySelector('.hero-copy');
    const imageTop = intro.offsetTop + intro.offsetHeight + 18;
    // Keep the artwork full-width and uncropped. Taller overviews scroll naturally
    // before the viewport pins for the close-up tour.
    const heroHeight = Math.max(viewportHeight - 64, imageTop + imageHeight + 86);
    const leadIn = Math.max(0, heroHeight - viewportHeight);
    tour.style.setProperty('--hero-height', `${heroHeight}px`);
    tour.style.setProperty('--tour-height', `${viewportHeight}px`);
    tour.style.setProperty('--hero-top', `${-leadIn}px`);
    scene.style.width = `${imageWidth}px`;
    scene.style.height = `${imageHeight}px`;
    const distance = -tour.getBoundingClientRect().top - leadIn;
    const position = Math.max(0, Math.min(lastStop, distance / viewportHeight));
    const index = Math.min(lastStop - 1, Math.floor(position));
    const t = clamp((position - index - .65) / .35);
    const eased = t * t * (3 - 2 * t);
    const from = stops[index], to = stops[index + 1];
    function camera(stop, overview) {
      if (overview) return { scale: 1, x: 0, y: imageTop };
      const scale = Math.max(1, viewportHeight / imageHeight) * stop.zoom;
      return {
        scale,
        x: Math.max(width - imageWidth * scale, Math.min(0, width * .68 - stop.x * imageWidth * scale)),
        y: Math.max(leadIn + viewportHeight - imageHeight * scale,
          Math.min(leadIn, leadIn + viewportHeight * .5 - stop.y * imageHeight * scale))
      };
    }
    const start = camera(from, index === 0), end = camera(to, false);
    const mix = key => start[key] + (end[key] - start[key]) * eased;
    scene.style.transform = `translate(${mix('x')}px, ${mix('y')}px) scale(${mix('scale')})`;
    hero.style.setProperty('--intro-opacity', String(1 - clamp(position * 2.6)));
    tour.dataset.stop = String(Math.min(lastStop, Math.round(position)));
  }
  function requestRender() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(render); }
  }
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestRender);
  scene.addEventListener('load', requestRender);
  document.fonts.ready.then(requestRender);
  new ResizeObserver(requestRender).observe(hero.querySelector('.hero-copy'));
  reduced.addEventListener('change', requestRender);
  narrow.addEventListener('change', requestRender);
  render();
})();
