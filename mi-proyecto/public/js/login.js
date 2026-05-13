const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');
const btnMe = document.getElementById('btnMe');
const userInfo = document.getElementById('userInfo');
const btnLogout = document.getElementById('btnLogout');

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

async function apiFetch(url, options = {}) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
        ...(options.headers || {})
    };

    const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        const text = await response.text();
        data = { message: text || response.statusText || 'Error' };
    }

    return { response, data };
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { response, data } = await apiFetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            messageDiv.innerHTML = `<span style="color:green">${data.message}</span>`;
            window.location.href = '/dashboard';
        } else {
            messageDiv.innerHTML = `<span style="color:red">${data.message || 'Error'}</span>`;
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const password_confirmation = document.getElementById('registerPasswordConfirmation').value;

        const { response, data } = await apiFetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, password_confirmation })
        });

        if (response.ok) {
            messageDiv.innerHTML = `<span style="color:green">${data.message}</span>`;
            window.location.href = '/dashboard';
        } else {
            messageDiv.innerHTML = `<span style="color:red">${data.message || 'Error'}</span>`;
        }
    });
}

if (btnMe) {
    btnMe.addEventListener('click', async () => {
        const { response, data } = await apiFetch('/api/me');
        if (response.ok) {
            if (userInfo) userInfo.innerText = JSON.stringify(data, null, 2);
        } else {
            if (userInfo) userInfo.innerText = `Error: ${data.message || 'No autorizado'}`;
        }
    });
}

if (btnLogout) {
    btnLogout.addEventListener('click', async () => {
        const { response, data } = await apiFetch('/api/logout', { method: 'POST' });
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message || 'Error al cerrar sesión');
        }

        if (btnMe) btnMe.style.display = 'none';
        if (btnLogout) btnLogout.style.display = 'none';
        if (userInfo) userInfo.innerText = '';
        if (messageDiv) messageDiv.innerHTML = '';
        if (loginForm) loginForm.reset();
    });
}
