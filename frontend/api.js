const API_URL = "http://localhost:8000/api/tasks/";

export async function fetchTasks() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function addTask(title) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false })
    });
    return response.json();
}