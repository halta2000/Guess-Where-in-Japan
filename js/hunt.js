const checkLocationBtn = document.getElementById('checkLocation');
const checkDistanceBtn = document.getElementById('checkDistance');

checkLocationBtn.addEventListener('click', async () => {
    try {
        const position = await getCurrentPosition();
        const result = await checkLocation(position);
        if (result.isCorrect) {
            window.location.href = '/success.html';
        } else {
            showDistanceAndDirection(result);
        }
    } catch (error) {
        alert('位置情報の取得に失敗しました');
    }
});

async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
