<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login con AuthController</title>
</head>
<body>
    <h2>Login</h2>
    <form id="loginForm">
        <input type="email" id="email" placeholder="Email" required><br>
        <input type="password" id="password" placeholder="Contraseña" required><br>
        <button type="submit">Iniciar sesión</button>
    </form>
    <div id="message"></div>
    <button id="btnMe" style="display:none">Ver mi usuario</button>
    <pre id="userInfo"></pre>
    <button id="btnLogout" style="display:none">Cerrar sesión</button>

    <script>
        const API = 'http://127.0.0.1:8000/api';

        const loginForm = document.getElementById('loginForm');
        const messageDiv = document.getElementById('message');
        const btnMe = document.getElementById('btnMe');
        const userInfo = document.getElementById('userInfo');
        const btnLogout = document.getElementById('btnLogout');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const res = await fetch(`${API}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'   // para enviar/recibir cookies
            });
            const data = await res.json();
            if (res.ok) {
                messageDiv.innerHTML = `<span style="color:green">✅ ${data.message}</span>`;
                btnMe.style.display = 'inline-block';
                btnLogout.style.display = 'inline-block';
                userInfo.innerText = JSON.stringify(data.user, null, 2);
            } else {
                messageDiv.innerHTML = `<span style="color:red">❌ ${data.message}</span>`;
            }
        });

        btnMe.addEventListener('click', async () => {
            const res = await fetch(`${API}/me`, { credentials: 'include' });
            const user = await res.json();
            userInfo.innerText = JSON.stringify(user, null, 2);
        });

        btnLogout.addEventListener('click', async () => {
            const res = await fetch(`${API}/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            const data = await res.json();
            alert(data.message);
            // Limpiar interfaz
            btnMe.style.display = 'none';
            btnLogout.style.display = 'none';
            userInfo.innerText = '';
            messageDiv.innerHTML = '';
            loginForm.reset();
        });
    </script>
</body>
</html>