document.getElementById('confirmPost').addEventListener('click', async () => {
    try {
        await submitPost();
        window.location.href = '/mypage.html';
    } catch (error) {
        alert('投稿に失敗しました');
    }
});