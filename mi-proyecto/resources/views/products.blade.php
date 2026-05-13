<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Productos</title>
    <link rel="stylesheet" href="/css/products.css">
</head>
<body data-page="products">
    <header class="topbar">
        <div class="brand">Productos</div>
        <nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/categories-page">Categorías</a>
            <a href="/orders-page">Órdenes</a>
        </nav>
        <button id="btnLogout" class="secondary">Cerrar sesión</button>
    </header>

    <main class="page-grid">
        <section class="card">
            <div class="action-bar">
                <div>
                    <h1>Productos</h1>
                    <p class="small-text">Crea productos y edítalos junto a su categoría, precio y stock.</p>
                </div>
            </div>

            <h2 id="productFormTitle">Agregar producto</h2>
            <form id="productForm">
                <div class="form-row">
                    <label>Categoría</label>
                    <select id="productCategory" required></select>
                    <input id="productId" type="hidden">
                </div>
                <div class="form-row">
                    <label>Nombre</label>
                    <input id="productName" type="text" placeholder="Nombre de producto" required>
                </div>
                <div class="form-row">
                    <label>Precio</label>
                    <input id="productPrice" type="number" step="0.01" placeholder="Precio" required>
                </div>
                <div class="form-row">
                    <label>Stock</label>
                    <input id="productStock" type="number" min="0" placeholder="Stock" required>
                </div>
                <div class="form-row">
                    <button type="submit" class="primary">Guardar producto</button>
                    <button id="cancelProduct" type="button" class="secondary" style="display:none;">Cancelar</button>
                </div>
            </form>

            <div id="message"></div>
        </section>

        <section class="card">
            <h2>Listado de productos</h2>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="productsTable"></tbody>
                </table>
            </div>
            <pre id="detailsPanel" class="details-panel">Haz clic en Ver para ver detalles.</pre>
        </section>
    </main>

    <script src="/js/common.js"></script>
    <script src="/js/products.js"></script>
</body>
</html>
