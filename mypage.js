document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        loadPhotos(tab.dataset.tab);
    });
});

async function loadPhotos(type) {
    const photoGrid = document.getElementById('photoGrid');
    try {
        const photos = await fetchPhotos(type);
        renderPhotos(photos, photoGrid);
    } catch (error) {
        console.error('写真の読み込みに失敗しました', error);
    }
}