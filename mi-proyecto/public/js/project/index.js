const BASE_URL = '/api/projects';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
};

async function getProjects() {
    const res = await fetch(BASE_URL, { headers: HEADERS });
    const data = await res.json();
    const tbody = document.getElementById('project-tbody');
    tbody.innerHTML = '';

    data.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.descripcion ?? '-'}</td>
                <td>${p.users_id}</td>
                <td>${p.fecha_inicio}</td>
                <td>${p.fecha_fin}</td>
                <td>
                    <a href="/project/show/${p.id}">Ver</a>
                    <a href="/project/edit/${p.id}">Editar</a>
                </td>
            </tr>
        `;
    });
}

getProjects();
