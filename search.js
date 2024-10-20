document.querySelectorAll('.spot-card').forEach(card => {
    card.addEventListener('click', () => {
        const spotId = card.dataset.spotId;
        window.location.href = `/hunt.html?spot=${spotId}`;
    });
});