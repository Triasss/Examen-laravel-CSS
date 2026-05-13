<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Dashboard</title>
    <link rel="stylesheet" href="/css/dashboard.css">
</head>
<body data-page="dashboard">
    <header class="topbar">
        <div class="brand">API CRUD - Panel</div>
        <nav>
            <a href="/categories-page">Categorías</a>
            <a href="/products-page">Productos</a>
            <a href="/orders-page">Órdenes</a>
            <a href="/login-page">Login</a>
        </nav>
        <button id="btnLogout" class="secondary">Cerrar sesión</button>
    </header>

    <main>
        <section class="card">
            <h1 class="page-title">Panel de control</h1>
            <p class="small-text">Accede al CRUD completo usando llamadas a la API. Cada recurso tiene creación, edición, borrado y vista de detalles.</p>
        </section>

        <section class="hero-grid">
            <article class="card">
                <h2>Categorías</h2>
                <p>Gestiona categorías, crea, edita, borra y consulta sus detalles.</p>
                <p class="small-text">Total: <span id="countCategories">0</span></p>
                <a class="primary" href="/categories-page">Ir a Categorías</a>
            </article>
            <article class="card">
                <h2>Productos</h2>
                <p>Gestiona productos con su categoría, precio y stock.</p>
                <p class="small-text">Total: <span id="countProducts">0</span></p>
                <a class="primary" href="/products-page">Ir a Productos</a>
            </article>
            <article class="card">
                <h2>Órdenes</h2>
                <p>Administra órdenes del usuario actual y actualiza estado o cantidad.</p>
                <p class="small-text">Total: <span id="countOrders">0</span></p>
                <a class="primary" href="/orders-page">Ir a Órdenes</a>
            </article>
        </section>
    </main>

    <script src="/js/common.js"></script>
    <script src="/js/dashboard.js"></script>
</body>
</html>
