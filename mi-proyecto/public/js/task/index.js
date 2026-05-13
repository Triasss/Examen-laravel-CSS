const BASE_URL = '/api/tasks';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
};

async function getTasks() {
    const res = await fetch(BASE_URL, { headers: HEADERS });

    if (!res.ok) {
        console.error('Error al cargar tareas:', await res.json());
        return;
    }

    const data = await res.json();
    const tbody = document.getElementById('task-tbody');
    tbody.innerHTML = '';

    data.forEach(t => {
        tbody.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.description ?? '-'}</td>
                <td>${t.completada ? 'Sí' : 'No'}</td>
                <td>${t.projects_id}</td>
                <td>
                    <a href="/task/show/${t.id}">Ver</a>
                </td>
            </tr>
        `;
    });
}

async function deleteTask(id) {
    if (!confirm('¿Seguro que quieres eliminar esta tarea?')) return;

    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: HEADERS
    });

    if (res.ok) {
        getTasks();
    }
}

getTasks();
