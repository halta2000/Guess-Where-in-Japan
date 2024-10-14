// app.js
const targetLocation = { lat: 35.681236, lng: 139.767125 }; // 例: 東京駅の緯度経度

document.getElementById('getLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location').textContent = "このブラウザは位置情報に対応していません。";
    }
});

function showPosition(position) {
    const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    document.getElementById('location').textContent = `あなたの位置: 緯度 ${userLocation.lat}, 経度 ${userLocation.lng}`;

    const distance = calculateDistance(userLocation, targetLocation);
    document.getElementById('distance').textContent = `東京駅までの距離: ${distance.toFixed(2)} km`;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').textContent = "位置情報の取得が許可されていません。";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').textContent = "位置情報が利用できません。";
            break;
        case error.TIMEOUT:
            document.getElementById('location').textContent = "位置情報の取得がタイムアウトしました。";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').textContent = "未知のエラーが発生しました。";
            break;
    }
}

function calculateDistance(coord1, coord2) {
    const toRad = (value) => value * Math.PI / 180;
    const R = 6371; // 地球の半径 (km)

    const dLat = toRad(coord2.lat - coord1.lat);
    const dLng = toRad(coord2.lng - coord1.lng);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c; // 距離 (km)
}
