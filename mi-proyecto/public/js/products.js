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
        } else {
            showMessage(data.message || 'Error cargando productos', 'error');
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

        if (action === 'view') {
            const { response, data } = await apiFetch(`/api/products/${productId}`);
            if (response.ok) {
                detailsPanel.innerText = JSON.stringify(data, null, 2);
            } else {
                showMessage(data.message || 'Error cargando producto', 'error');
            }
            return;
        }

        if (action === 'edit') {
            const { response, data } = await apiFetch(`/api/products/${productId}`);
            if (response.ok) {
                formTitle.innerText = 'Editar producto';
                productIdInput.value = data.id;
                categorySelect.value = data.category_id;
                nameInput.value = data.name;
                priceInput.value = data.price;
                stockInput.value = data.stock;
                cancelButton.style.display = 'inline-flex';
                clearMessage();
            } else {
                showMessage(data.message || 'Error cargando producto', 'error');
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

window.addEventListener('DOMContentLoaded', async () => {
    await loadProductsPage();
});
