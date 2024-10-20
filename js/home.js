document.querySelectorAll('[data-area]').forEach(button => {
    button.addEventListener('click', () => {
        const area = button.dataset.area;
        window.location.href = `/search.html?area=${area}`;
    });
});
