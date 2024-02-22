document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const projectList = document.querySelector('.project-list');

    // Charger les données des projets depuis le fichier JSON
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            // Écouter l'événement de soumission du formulaire de recherche
            searchForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Empêcher la soumission par défaut du formulaire

                const typeProjet = document.querySelector('#type_projet').value;
                const localisation = document.querySelector('#localisation').value.toLowerCase();

                // Filtrer les projets en fonction des critères de recherche
                const filteredProjects = data.filter(project => {
                    return project.nom.toLowerCase().includes(localisation) && 
                           (typeProjet === '' || typeProjet === 'tous' || project.type === typeProjet);
                });

                // Afficher les projets filtrés
                displayProjects(filteredProjects);
            });

            // Afficher tous les projets au chargement initial
            displayProjects(data);
        })
        .catch(error => console.error('Erreur lors du chargement des données des projets :', error));

    // Fonction pour afficher les projets dans la liste
    function displayProjects(projects) {
        projectList.innerHTML = ''; // Effacer la liste des projets actuelle

        projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project');
            projectItem.innerHTML = `
                <h3>${project.nom}</h3>
                <p>Prix bientôt disponible</p>
                <p>${project.logements_disponibles} logements disponibles</p>
                <p>${project.city}</p>
            `;
            projectList.appendChild(projectItem);
        });
    }
});
