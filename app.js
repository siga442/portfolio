const container = document.getElementById('project-list');

function showError(message) {
  const li = document.createElement('li');
  li.className = 'project-item';
  li.style.color = 'red';
  li.textContent = `⚠️ ${message}`;
  container.appendChild(li);
}

fetch('projects_data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Hiba a lekéréskor: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data)) {
      throw new Error("A betöltött adat nem tömb típusú.");
    }

    const fragment = document.createDocumentFragment();

    data.forEach((project, index) => {
      try {
        const li = document.createElement('li');
        li.className = 'project-item';

        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = project?.technology?.trim() || `Projekt #${index + 1}`;

        const desc = document.createElement('div');
        desc.className = 'description';
        desc.textContent = project?.Description?.trim() || 'Nincs leírás megadva.';

        li.appendChild(title);
        li.appendChild(desc);
        fragment.appendChild(li);
      } catch (itemError) {
        console.warn(`Hiba a(z) ${index + 1}. projekt feldolgozásakor:`, itemError);
      }
    });

    container.appendChild(fragment);
  })
  .catch(error => {
    console.error("Hiba:", error);
    showError("Nem sikerült betölteni a projektadatokat.");
  });
