const BASE_URL = '/api/projects';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
};

async function loadProject() {
    const res = await fetch(`${BASE_URL}/${PROJECT_ID}`, { headers: HEADERS });
    const data = await res.json();

    document.getElementById('p-id').textContent          = data.id;
    document.getElementById('p-nombre').textContent      = data.nombre;
    document.getElementById('p-descripcion').textContent = data.descripcion ?? '-';
    document.getElementById('p-users_id').textContent    = data.users_id;
    document.getElementById('p-fecha_inicio').textContent = data.fecha_inicio;
    document.getElementById('p-fecha_fin').textContent   = data.fecha_fin;

    document.getElementById('edit-link').href = `/project/edit/${PROJECT_ID}`;
}

loadProject();
