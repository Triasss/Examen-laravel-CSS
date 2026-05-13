async function loadDashboardCounts() {
    const [categoriesResult, productsResult, ordersResult] = await Promise.all([
        apiFetch('/api/categories'),
        apiFetch('/api/products'),
        apiFetch('/api/orders')
    ]);

    if (categoriesResult.response.ok) {
        document.getElementById('countCategories').innerText = categoriesResult.data.length;
    }
    if (productsResult.response.ok) {
        document.getElementById('countProducts').innerText = productsResult.data.length;
    }
    if (ordersResult.response.ok) {
        document.getElementById('countOrders').innerText = ordersResult.data.length;
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadDashboardCounts();
});
