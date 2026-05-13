const BASE_URL = '/projects';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
};

async function storeProject() {
    const body = {
        nombre:       document.getElementById('nombre').value,
        descripcion:  document.getElementById('descripcion').value,
        users_id:     parseInt(document.getElementById('users_id').value),
        fecha_inicio: document.getElementById('fecha_inicio').value,
        fecha_fin:    document.getElementById('fecha_fin').value,
    };

    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById('store-result').textContent = JSON.stringify(data, null, 2);
}

async function updateProject() {
    const id = document.getElementById('update-id').value;
    const body = {
        nombre:       document.getElementById('update-nombre').value,
        descripcion:  document.getElementById('update-descripcion').value,
        users_id:     parseInt(document.getElementById('update-users_id').value),
        fecha_inicio: document.getElementById('update-fecha_inicio').value,
        fecha_fin:    document.getElementById('update-fecha_fin').value,
    };

    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById('update-result').textContent = JSON.stringify(data, null, 2);
}
