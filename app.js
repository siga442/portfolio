// Get the container element where the titles will be displayed
const container = document.getElementById('titles');

// Fetch the JSON file
fetch('projects_data.json')
  .then(response => response.json())
  .then(data => {
    const fragment = document.createDocumentFragment();

    data.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      // Add hover info via data-extra attribute
      const extraInfo = `Időtartam: ${project?.["Lenght (m)"] || 'ismeretlen'} hónap, Csapatméret: ${project?.["team size"] || 'n/a'}`;
      card.setAttribute('data-extra', extraInfo);

      const title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = project?.title || project?.technology || 'Névtelen projekt';

      const description = document.createElement('p');
      description.className = 'card-description';
      description.textContent = project?.start || 'Nincs leírás.';

      card.appendChild(title);
      card.appendChild(description);
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  })
  .catch(error => {
    console.error("Hiba történt a projektadatok betöltésekor:", error);
    container.textContent = 'Nem sikerült betölteni a projekteket.';
  });
