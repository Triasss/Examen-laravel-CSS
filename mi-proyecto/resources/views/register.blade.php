<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Registrarse</title>
    <link rel="stylesheet" href="/css/crud.css">
</head>
<body>
    <h2>Registrarse</h2>
    <form id="registerForm">
        <input type="text" id="registerName" placeholder="Nombre completo" required><br>
        <input type="email" id="registerEmail" placeholder="Correo electrónico" required><br>
        <input type="password" id="registerPassword" placeholder="Contraseña" required><br>
        <input type="password" id="registerPasswordConfirmation" placeholder="Confirmar contraseña" required><br>
        <button type="submit">Registrarse</button>
    </form>

    <div id="message"></div>

    <p>¿Ya tienes cuenta? <a href="/login-page">Inicia sesión aquí</a></p>

    <script src="/js/login.js"></script>
</body>
</html>
