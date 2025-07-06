// Interaktív slider megjelenítése és elrejtése
const sliderContainer = document.getElementById('slider-container');
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');
const filterToggleButtons = document.querySelectorAll('.filter-toggle');

// Toggle slider visibility
filterToggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const isHidden = sliderContainer.classList.toggle('hidden');
    sliderContainer.style.display = isHidden ? 'none' : 'block';
  });
});

// Update slider value display and filter cards automatically
slider.addEventListener('input', (event) => {
  const value = event.target.value;
  sliderValue.textContent = value;
  filterCardsBySlider(value); // Automatikus szűrés
});

// Kártyák szűrése a slider érték alapján
function filterCardsBySlider(value) {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const extraInfo = card.getAttribute('data-extra');
    card.style.display = extraInfo.includes(`Időtartam: ${value}`) ? 'block' : 'none';
  });
}
