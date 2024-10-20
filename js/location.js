const map = document.getElementById('map');
let selectedLocation = null;

document.getElementById('confirmLocation').addEventListener('click', () => {
    if (selectedLocation) {
        window.location.href = `/review.html?lat=${selectedLocation.lat}&lng=${selectedLocation.lng}`;
    }
});