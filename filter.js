// Szűrés logikája
function filterCards(selectedCategory) {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const extraInfo = card.getAttribute('data-extra');
    const matchesCategory = extraInfo.includes(selectedCategory);

    if (selectedCategory === 'all' || matchesCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Szűrő változásának eseménykezelője
document.getElementById('filter').addEventListener('change', (event) => {
  const selectedCategory = event.target.value;
  filterCards(selectedCategory);
});
