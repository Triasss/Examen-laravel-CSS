const btnLogout = document.getElementById('btnLogout');
const messageDiv = document.getElementById('message');
const csrfMeta = document.querySelector('meta[name="csrf-token"]');
const CSRF_TOKEN = csrfMeta ? csrfMeta.getAttribute('content') : '';

async function apiFetch(url, options = {}) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': CSRF_TOKEN,
        ...(options.headers || {})
    };

    const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers
    });

    const text = await response.text();
    let data;

    try {
        data = JSON.parse(text);
    } catch {
        data = { message: text || response.statusText || 'Error' };
    }

    return { response, data };
}

function showMessage(message, type = 'success') {
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.className = type === 'error' ? 'message error' : 'message';
}

function clearMessage() {
    if (!messageDiv) return;
    messageDiv.textContent = '';
    messageDiv.className = '';
}

async function handleLogout() {
    const { response, data } = await apiFetch('/api/logout', { method: 'POST' });
    if (response.ok) {
        window.location.href = '/login-page';
    } else {
        showMessage(data.message || 'Error al cerrar sesión', 'error');
    }
}

if (btnLogout) {
    btnLogout.addEventListener('click', handleLogout);
}
