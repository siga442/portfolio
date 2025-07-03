fetch('projects_data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('project-list');
    const fragment = document.createDocumentFragment();

    data.forEach(project => {
      const li = document.createElement('li');
      li.className = 'project-item';

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = project?.technology || 'Névtelen projekt';

      const desc = document.createElement('div');
      desc.className = 'description';
      desc.textContent = project?.Description || 'Nincs leírás megadva.';

      li.appendChild(title);
      li.appendChild(desc);
      fragment.appendChild(li);
    });

    container.appendChild(fragment);
  })
  .catch(error => {
    console.error("Hiba történt a JSON betöltésekor:", error);
  });
