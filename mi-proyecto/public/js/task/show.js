const BASE_URL = '/api/tasks';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
};

async function loadTask() {
    const res = await fetch(`${BASE_URL}/${TASK_ID}`, { headers: HEADERS });
    const data = await res.json();

    document.getElementById('t-id').textContent          = data.id;
    document.getElementById('t-description').textContent = data.description ?? '-';
    document.getElementById('t-completada').textContent  = data.completada ? 'Sí' : 'No';
    document.getElementById('t-projects_id').textContent = data.projects_id;

    document.getElementById('edit-link').href = `/task/edit/${TASK_ID}`;
}

loadTask();
