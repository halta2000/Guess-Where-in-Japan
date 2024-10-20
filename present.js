const photoUpload = document.getElementById('photoUpload');
const photoPreview = document.getElementById('photoPreview');

photoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            photoPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});