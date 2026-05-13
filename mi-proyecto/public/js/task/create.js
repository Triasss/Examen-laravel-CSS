const BASE_URL = '/api/tasks';
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
};

async function storeTask() {
    const body = {
        description:  document.getElementById('description').value,
        completada:   document.getElementById('completada').checked,
        projects_id:  parseInt(document.getElementById('projects_id').value),
    };

    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);

    if (res.ok) {
        window.location.href = '/task/index';
    }
}
