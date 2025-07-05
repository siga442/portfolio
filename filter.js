// Interaktív slider megjelenítése és elrejtése
document.getElementById('filter-toggle').addEventListener('click', () => {
  const sliderContainer = document.getElementById('slider-container');
  if (sliderContainer.classList.contains('hidden')) {
    sliderContainer.classList.remove('hidden');
    sliderContainer.style.display = 'block';
  } else {
    sliderContainer.classList.add('hidden');
    sliderContainer.style.display = 'none';
  }
});

// Slider érték megjelenítése
document.getElementById('slider').addEventListener('input', (event) => {
  document.getElementById('slider-value').textContent = event.target.value;
});

// Szűrés logikája slider alapján
document.getElementById('apply-filter').addEventListener('click', () => {
  const sliderValue = document.getElementById('slider').value;
  filterCardsBySlider(sliderValue);
});

// Kártyák szűrése a slider érték alapján
function filterCardsBySlider(value) {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const extraInfo = card.getAttribute('data-extra');
    const matchesValue = extraInfo.includes(`Időtartam: ${value}`);

    if (matchesValue) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
