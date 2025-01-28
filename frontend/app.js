document.addEventListener("DOMContentLoaded", () => {
	const app = document.getElementById("app");
  
	// Gestion des routes
	const routes = {
	  home: `
		<h2>Bienvenue sur la SPA</h2>
		<p>Cliquez sur "Tâches" pour voir la liste des tâches.</p>
	  `,
	  tasks: async () => {
		const tasks = await fetchTasks();
		return `
		  <h2>Liste des Tâches</h2>
		  <ul>
			${tasks.map(task => `<li>${task.title} - ${task.completed ? '✅' : '❌'}</li>`).join('')}
		  </ul>
		`;
	  },
	};
  
	// Fonction pour récupérer les tâches via l'API Django
	async function fetchTasks() {
	  try {
		const response = await fetch("http://localhost:8000/api/tasks/");
		return response.ok ? response.json() : [];
	  } catch (error) {
		console.error("Erreur lors de la récupération des tâches :", error);
		return [];
	  }
	}
  
	// Fonction pour afficher une vue
	async function navigate(route) {
	  app.innerHTML = typeof routes[route] === "function" ? await routes[route]() : routes[route];
	}
  
	// Gestion des clics sur les liens
	document.getElementById("link-home").addEventListener("click", () => navigate("home"));
	document.getElementById("link-tasks").addEventListener("click", () => navigate("tasks"));
  
	// Charger la vue par défaut
	navigate("home");
  });
  