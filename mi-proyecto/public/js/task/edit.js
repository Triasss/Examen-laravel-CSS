const BASE_URL = '/api/tasks';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
};

async function loadTask() {
    const res = await fetch(`${BASE_URL}/${TASK_ID}`, { headers: HEADERS });
    const data = await res.json();

    document.getElementById('description').value  = data.description ?? '';
    document.getElementById('completada').checked = data.completada == 1;
    document.getElementById('projects_id').value  = data.projects_id ?? '';
}

async function updateTask() {
    const body = {
        description:  document.getElementById('description').value,
        completada:   document.getElementById('completada').checked,
        projects_id:  parseInt(document.getElementById('projects_id').value),
    };

    const res = await fetch(`${BASE_URL}/${TASK_ID}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);

    if (res.ok) {
        window.location.href = `/task/show/${TASK_ID}`;
    }
}

loadTask();
