// app.js
const targetLocation = { lat: 35.56653, lng: 139.61069 }; // 蒲田駅の緯度経度

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
    const direction = calculateDirection(userLocation, targetLocation);

    if (distance <= 0.1) { // 100m = 0.1km
        document.getElementById('result').textContent = "正解";
    } else {
        document.getElementById('result').textContent = `蒲田駅までの距離: ${distance.toFixed(2)} km, 方角: ${direction}`;
    }
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

function calculateDirection(coord1, coord2) {
    const lat1 = coord1.lat;
    const lon1 = coord1.lng;
    const lat2 = coord2.lat;
    const lon2 = coord2.lng;

    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const initialBearing = Math.atan2(y, x);

    const directionDegrees = (initialBearing * 180 / Math.PI + 360) % 360; // 方位角を0-360度に変換

    // 8方位に変換
    const directions = [
        "北", "北北東", "北東", "東", "南東", "南", "南西", "西", "北西", "北"
    ];

    const index = Math.round(directionDegrees / 45) % 8; // 0から7のインデックス
    return directions[index];
}
