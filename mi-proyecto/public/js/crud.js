const pageType = document.body.dataset.page;
const messageDiv = document.getElementById('message');
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

function showMessage(message, type = 'success') {
    if (!messageDiv) return;
    messageDiv.innerHTML = `<div class="message ${type === 'error' ? 'error' : ''}">${message}</div>`;
}

function clearMessage() {
    if (!messageDiv) return;
    messageDiv.innerHTML = '';
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

async function loadDashboardCounts() {
    const [categoriesResult, productsResult, ordersResult] = await Promise.all([
        apiFetch('/api/categories'),
        apiFetch('/api/products'),
        apiFetch('/api/orders')
    ]);

    if (categoriesResult.response.ok && productsResult.response.ok && ordersResult.response.ok) {
        document.getElementById('countCategories').innerText = categoriesResult.data.length;
        document.getElementById('countProducts').innerText = productsResult.data.length;
        document.getElementById('countOrders').innerText = ordersResult.data.length;
    }
}

async function loadCategoriesPage() {
    const tableBody = document.getElementById('categoriesTable');
    const detailsPanel = document.getElementById('detailsPanel');
    const form = document.getElementById('categoryForm');
    const formTitle = document.getElementById('categoryFormTitle');
    const cancelButton = document.getElementById('cancelCategory');
    const nameInput = document.getElementById('categoryName');
    const descriptionInput = document.getElementById('categoryDescription');
    const categoryIdInput = document.getElementById('categoryId');

    function resetForm() {
        categoryIdInput.value = '';
        nameInput.value = '';
        descriptionInput.value = '';
        formTitle.innerText = 'Crear categoría';
        cancelButton.style.display = 'none';
        clearMessage();
    }

    async function fetchCategories() {
        const { response, data } = await apiFetch('/api/categories');
        if (response.ok) {
            tableBody.innerHTML = data.map(category => `
                <tr>
                    <td>${category.id}</td>
                    <td>${category.name}</td>
                    <td>${category.description || '-'}</td>
                    <td>
                        <div class="table-actions">
                            <button type="button" class="secondary" data-action="view" data-id="${category.id}">Ver</button>
                            <button type="button" class="primary" data-action="edit" data-id="${category.id}">Editar</button>
                            <button type="button" class="secondary" data-action="delete" data-id="${category.id}">Borrar</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const categoryId = categoryIdInput.value;
        const payload = {
            name: nameInput.value,
            description: descriptionInput.value,
        };

        const endpoint = categoryId ? `/api/categories/${categoryId}` : '/api/categories';
        const method = categoryId ? 'PUT' : 'POST';

        const { response, data } = await apiFetch(endpoint, {
            method,
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            showMessage(categoryId ? 'Categoría actualizada correctamente' : 'Categoría creada correctamente');
            resetForm();
            await fetchCategories();
        } else {
            showMessage(data.message || 'Error guardando categoría', 'error');
        }
    });

    cancelButton.addEventListener('click', resetForm);

    tableBody.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;
        const action = button.dataset.action;
        const categoryId = button.dataset.id;
        const { response, data } = await apiFetch(`/api/categories/${categoryId}`);

        if (action === 'view') {
            if (response.ok) {
                detailsPanel.innerText = JSON.stringify(data, null, 2);
            }
            return;
        }

        if (action === 'edit') {
            if (response.ok) {
                formTitle.innerText = 'Editar categoría';
                categoryIdInput.value = data.id;
                nameInput.value = data.name;
                descriptionInput.value = data.description || '';
                cancelButton.style.display = 'inline-flex';
                clearMessage();
            }
            return;
        }

        if (action === 'delete') {
            if (!confirm('¿Seguro que deseas borrar esta categoría?')) {
                return;
            }
            const result = await apiFetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
            if (result.response.ok) {
                showMessage('Categoría eliminada');
                await fetchCategories();
            } else {
                showMessage(result.data.message || 'Error borrando categoría', 'error');
            }
        }
    });

    resetForm();
    await fetchCategories();
}

async function loadProductsPage() {
    const tableBody = document.getElementById('productsTable');
    const detailsPanel = document.getElementById('detailsPanel');
    const form = document.getElementById('productForm');
    const formTitle = document.getElementById('productFormTitle');
    const cancelButton = document.getElementById('cancelProduct');
    const productIdInput = document.getElementById('productId');
    const categorySelect = document.getElementById('productCategory');
    const nameInput = document.getElementById('productName');
    const priceInput = document.getElementById('productPrice');
    const stockInput = document.getElementById('productStock');

    function resetForm() {
        productIdInput.value = '';
        categorySelect.value = '';
        nameInput.value = '';
        priceInput.value = '';
        stockInput.value = '';
        formTitle.innerText = 'Agregar producto';
        cancelButton.style.display = 'none';
        clearMessage();
    }

    async function loadCategories() {
        const { response, data } = await apiFetch('/api/categories');
        if (response.ok) {
            categorySelect.innerHTML = `<option value="">Selecciona categoría</option>${data.map(category => `
                <option value="${category.id}">${category.name}</option>
            `).join('')}`;
        }
    }

    async function fetchProducts() {
        const { response, data } = await apiFetch('/api/products');
        if (response.ok) {
            tableBody.innerHTML = data.map(product => `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category?.name || '-'}</td>
                    <td>${product.price}</td>
                    <td>${product.stock}</td>
                    <td>
                        <div class="table-actions">
                            <button type="button" class="secondary" data-action="view" data-id="${product.id}">Ver</button>
                            <button type="button" class="primary" data-action="edit" data-id="${product.id}">Editar</button>
                            <button type="button" class="secondary" data-action="delete" data-id="${product.id}">Borrar</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const productId = productIdInput.value;
        const payload = {
            category_id: categorySelect.value,
            name: nameInput.value,
            price: priceInput.value,
            stock: stockInput.value,
        };

        const endpoint = productId ? `/api/products/${productId}` : '/api/products';
        const method = productId ? 'PUT' : 'POST';

        const { response, data } = await apiFetch(endpoint, {
            method,
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            showMessage(productId ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
            resetForm();
            await fetchProducts();
        } else {
            showMessage(data.message || 'Error guardando producto', 'error');
        }
    });

    cancelButton.addEventListener('click', resetForm);

    tableBody.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;
        const action = button.dataset.action;
        const productId = button.dataset.id;
        const { response, data } = await apiFetch(`/api/products/${productId}`);

        if (action === 'view') {
            if (response.ok) {
                detailsPanel.innerText = JSON.stringify(data, null, 2);
            }
            return;
        }

        if (action === 'edit') {
            if (response.ok) {
                formTitle.innerText = 'Editar producto';
                productIdInput.value = data.id;
                categorySelect.value = data.category_id;
                nameInput.value = data.name;
                priceInput.value = data.price;
                stockInput.value = data.stock;
                cancelButton.style.display = 'inline-flex';
                clearMessage();
            }
            return;
        }

        if (action === 'delete') {
            if (!confirm('¿Seguro que deseas borrar este producto?')) return;
            const result = await apiFetch(`/api/products/${productId}`, { method: 'DELETE' });
            if (result.response.ok) {
                showMessage('Producto eliminado');
                await fetchProducts();
            } else {
                showMessage(result.data.message || 'Error borrando producto', 'error');
            }
        }
    });

    await loadCategories();
    resetForm();
    await fetchProducts();
}

async function loadOrdersPage() {
    const tableBody = document.getElementById('ordersTable');
    const detailsPanel = document.getElementById('detailsPanel');
    const form = document.getElementById('orderForm');
    const formTitle = document.getElementById('orderFormTitle');
    const cancelButton = document.getElementById('cancelOrder');
    const orderIdInput = document.getElementById('orderId');
    const productSelect = document.getElementById('orderProduct');
    const quantityInput = document.getElementById('orderQuantity');
    const statusSelect = document.getElementById('orderStatus');

    function resetForm() {
        orderIdInput.value = '';
        productSelect.value = '';
        quantityInput.value = '1';
        statusSelect.value = 'pending';
        formTitle.innerText = 'Crear orden';
        cancelButton.style.display = 'none';
        clearMessage();
    }

    async function loadProducts() {
        const { response, data } = await apiFetch('/api/products');
        if (response.ok) {
            productSelect.innerHTML = `<option value="">Selecciona producto</option>${data.map(product => `
                <option value="${product.id}">${product.name} — ${product.category?.name || 'Sin categoría'}</option>
            `).join('')}`;
        }
    }

    async function fetchOrders() {
        const { response, data } = await apiFetch('/api/orders');
        if (response.ok) {
            tableBody.innerHTML = data.map(order => `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.product?.name || '-'}</td>
                    <td>${order.quantity}</td>
                    <td>${order.total}</td>
                    <td><span class="badge">${order.status}</span></td>
                    <td>
                        <div class="table-actions">
                            <button type="button" class="secondary" data-action="view" data-id="${order.id}">Ver</button>
                            <button type="button" class="primary" data-action="edit" data-id="${order.id}">Editar</button>
                            <button type="button" class="secondary" data-action="delete" data-id="${order.id}">Borrar</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const orderId = orderIdInput.value;
        const payload = {
            product_id: productSelect.value,
            quantity: quantityInput.value,
            status: statusSelect.value,
        };

        const endpoint = orderId ? `/api/orders/${orderId}` : '/api/orders';
        const method = orderId ? 'PUT' : 'POST';

        const { response, data } = await apiFetch(endpoint, {
            method,
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            showMessage(orderId ? 'Orden actualizada correctamente' : 'Orden creada correctamente');
            resetForm();
            await fetchOrders();
        } else {
            showMessage(data.message || 'Error guardando orden', 'error');
        }
    });

    cancelButton.addEventListener('click', resetForm);

    tableBody.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;
        const action = button.dataset.action;
        const orderId = button.dataset.id;
        const { response, data } = await apiFetch(`/api/orders/${orderId}`);

        if (action === 'view') {
            if (response.ok) {
                detailsPanel.innerText = JSON.stringify(data, null, 2);
            }
            return;
        }

        if (action === 'edit') {
            if (response.ok) {
                formTitle.innerText = 'Editar orden';
                orderIdInput.value = data.id;
                productSelect.value = data.product_id;
                quantityInput.value = data.quantity;
                statusSelect.value = data.status;
                cancelButton.style.display = 'inline-flex';
                clearMessage();
            }
            return;
        }

        if (action === 'delete') {
            if (!confirm('¿Seguro que deseas borrar esta orden?')) return;
            const result = await apiFetch(`/api/orders/${orderId}`, { method: 'DELETE' });
            if (result.response.ok) {
                showMessage('Orden eliminada');
                await fetchOrders();
            } else {
                showMessage(result.data.message || 'Error borrando orden', 'error');
            }
        }
    });

    await loadProducts();
    resetForm();
    await fetchOrders();
}

window.addEventListener('DOMContentLoaded', async () => {
    clearMessage();
    if (pageType === 'dashboard') {
        await loadDashboardCounts();
    }
    if (pageType === 'categories') {
        await loadCategoriesPage();
    }
    if (pageType === 'products') {
        await loadProductsPage();
    }
    if (pageType === 'orders') {
        await loadOrdersPage();
    }
});
