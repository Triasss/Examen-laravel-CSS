<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Órdenes</title>
    <link rel="stylesheet" href="/css/orders.css">
</head>
<body data-page="orders">
    <header class="topbar">
        <div class="brand">Órdenes</div>
        <nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/categories-page">Categorías</a>
            <a href="/products-page">Productos</a>
        </nav>
        <button id="btnLogout" class="secondary">Cerrar sesión</button>
    </header>

    <main class="page-grid">
        <section class="card">
            <div class="action-bar">
                <div>
                    <h1>Órdenes</h1>
                    <p class="small-text">Gestiona las órdenes del usuario actual usando solo la API.</p>
                </div>
            </div>

            <h2 id="orderFormTitle">Crear orden</h2>
            <form id="orderForm">
                <div class="form-row">
                    <label>Producto</label>
                    <select id="orderProduct" required></select>
                    <input id="orderId" type="hidden">
                </div>
                <div class="form-row">
                    <label>Cantidad</label>
                    <input id="orderQuantity" type="number" min="1" value="1" required>
                </div>
                <div class="form-row">
                    <label>Estado</label>
                    <select id="orderStatus">
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <div class="form-row">
                    <button type="submit" class="primary">Guardar orden</button>
                    <button id="cancelOrder" type="button" class="secondary" style="display:none;">Cancelar</button>
                </div>
            </form>

            <div id="message"></div>
        </section>

        <section class="card">
            <h2>Listado de órdenes</h2>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="ordersTable"></tbody>
                </table>
            </div>
            <pre id="detailsPanel" class="details-panel">Haz clic en Ver para ver detalles.</pre>
        </section>
    </main>

    <script src="/js/common.js"></script>
    <script src="/js/orders.js"></script>
</body>
</html>
