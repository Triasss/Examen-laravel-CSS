<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Categorías</title>
    <link rel="stylesheet" href="/css/categories.css">
</head>
<body data-page="categories">
    <header class="topbar">
        <div class="brand">Categorías</div>
        <nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/products-page">Productos</a>
            <a href="/orders-page">Órdenes</a>
        </nav>
        <button id="btnLogout" class="secondary">Cerrar sesión</button>
    </header>

    <main class="page-grid">
        <section class="card">
            <div class="action-bar">
                <div>
                    <h1>Categorías</h1>
                    <p class="small-text">Crear, editar, borrar y ver cada categoría.</p>
                </div>
            </div>

            <h2 id="categoryFormTitle">Crear categoría</h2>
            <form id="categoryForm">
                <div class="form-row">
                    <label>Nombre</label>
                    <input id="categoryName" type="text" placeholder="Nombre de la categoría" required>
                    <input id="categoryId" type="hidden">
                </div>
                <div class="form-row">
                    <label>Descripción</label>
                    <textarea id="categoryDescription" placeholder="Descripción opcional"></textarea>
                </div>
                <div class="form-row">
                    <button type="submit" class="primary">Guardar categoría</button>
                    <button id="cancelCategory" type="button" class="secondary" style="display:none;">Cancelar</button>
                </div>
            </form>

            <div id="message"></div>
        </section>

        <section class="card">
            <h2>Listado de categorías</h2>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="categoriesTable"></tbody>
                </table>
            </div>
            <pre id="detailsPanel" class="details-panel">Haz clic en Ver para ver detalles.</pre>
        </section>
    </main>

    <script src="/js/common.js"></script>
    <script src="/js/categories.js"></script>
</body>
</html>
