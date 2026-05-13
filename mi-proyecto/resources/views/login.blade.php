<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login</title>
    <link rel="stylesheet" href="/css/crud.css">
</head>
<body>
    <h2>Iniciar sesión</h2>
    <form id="loginForm">
        <input type="email" id="email" placeholder="Correo electrónico" required><br>
        <input type="password" id="password" placeholder="Contraseña" required><br>
        <button type="submit">Entrar</button>
    </form>

    <div id="message"></div>

    <p>¿No tienes cuenta? <a href="/register-page">Regístrate aquí</a></p>

    <button id="btnMe" style="display:none;">Ver mi usuario</button>
    <pre id="userInfo"></pre>
    <button id="btnLogout" style="display:none;">Cerrar sesión</button>

    <script src="/js/login.js"></script>
</body>
</html>
