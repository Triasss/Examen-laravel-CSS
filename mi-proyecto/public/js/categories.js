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
        } else {
            showMessage(data.message || 'Error cargando categorías', 'error');
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

        if (action === 'view') {
            const { response, data } = await apiFetch(`/api/categories/${categoryId}`);
            if (response.ok) {
                detailsPanel.innerText = JSON.stringify(data, null, 2);
            } else {
                showMessage(data.message || 'Error cargando categoría', 'error');
            }
            return;
        }

        if (action === 'edit') {
            const { response, data } = await apiFetch(`/api/categories/${categoryId}`);
            if (response.ok) {
                formTitle.innerText = 'Editar categoría';
                categoryIdInput.value = data.id;
                nameInput.value = data.name;
                descriptionInput.value = data.description || '';
                cancelButton.style.display = 'inline-flex';
                clearMessage();
            } else {
                showMessage(data.message || 'Error cargando categoría', 'error');
            }
            return;
        }

        if (action === 'delete') {
            if (!confirm('¿Seguro que deseas borrar esta categoría?')) return;
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

window.addEventListener('DOMContentLoaded', async () => {
    await loadCategoriesPage();
});
