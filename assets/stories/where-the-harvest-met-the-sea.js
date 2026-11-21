(() => {
  const root = document.getElementById('rail-harvest-explorer');
  if (!root) return;
  const views = [
    ['Whole card', '0 0 1635 1022', 'Follow the tracks from the foreground to the ships at the end of the wharf.'],
    ['The railway', '750 490 820 470', 'Two tracks and a crossover, with switch stands beside them. The railway carried freight right out onto the timber wharf.'],
    ['Ships and sheds', '180 130 870 450', 'The two steamships, the loading sheds, and the railway car at the far end. Steam drifts across the centre of the scene.'],
    ['People and small boat', '410 435 500 315', 'Look for the small boat along the left edge and the two figures on the wharf. They give the ships and the distance their scale.']
  ];
  const controls = document.createElement('div');
  controls.className = 'detail-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Choose a postcard detail');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('detail-image');
  svg.setAttribute('viewBox', views[0][1]);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', views[0][2]);
  const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  image.setAttribute('href', '../../images/cards/0986-front-1.avif');
  image.setAttribute('width', '1635');
  image.setAttribute('height', '1022');
  svg.append(image);
  const caption = document.createElement('p');
  caption.className = 'detail-caption';
  caption.setAttribute('aria-live', 'polite');
  caption.textContent = views[0][2];
  views.forEach(([label, box, text], i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.setAttribute('aria-pressed', String(i === 0));
    button.addEventListener('click', () => {
      svg.setAttribute('viewBox', box);
      svg.setAttribute('aria-label', text);
      caption.textContent = text;
      controls.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    });
    controls.append(button);
  });
  root.querySelector('figure').remove();
  root.append(controls, svg, caption);
})();
