function navigateTo(page) {
	const contentDiv = document.getElementById("content");
  
	// Vider le contenu actuel
	contentDiv.innerHTML = '';
  
	// Utiliser Fetch API pour récupérer le contenu du serveur
	fetch(`${page}/`)
	  .then(response => response.text())
	  .then(html => {
		contentDiv.innerHTML = html;
		window.history.pushState({ page: page }, page, `/${page}`);
	  })
	  .catch(error => console.error('Erreur de chargement de la page:', error));
  }
  window.onpopstate = function(event) {
    if (event.state) {
        // Utilise la valeur dans event.state pour charger la page appropriée
        navigateTo(event.state.page);
    }
};

const initialPage = window.location.pathname.slice(1); // Extrait le nom de la page depuis l'URL
if (initialPage) {
  navigateTo(initialPage); // Charge la page en fonction de l'URL initiale
}