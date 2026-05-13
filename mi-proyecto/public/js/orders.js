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
        } else {
            showMessage(data.message || 'Error cargando órdenes', 'error');
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

        if (action === 'view') {
            const { response, data } = await apiFetch(`/api/orders/${orderId}`);
            if (response.ok) {
                detailsPanel.innerText = JSON.stringify(data, null, 2);
            } else {
                showMessage(data.message || 'Error cargando orden', 'error');
            }
            return;
        }

        if (action === 'edit') {
            const { response, data } = await apiFetch(`/api/orders/${orderId}`);
            if (response.ok) {
                formTitle.innerText = 'Editar orden';
                orderIdInput.value = data.id;
                productSelect.value = data.product_id;
                quantityInput.value = data.quantity;
                statusSelect.value = data.status;
                cancelButton.style.display = 'inline-flex';
                clearMessage();
            } else {
                showMessage(data.message || 'Error cargando orden', 'error');
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
    await loadOrdersPage();
});
