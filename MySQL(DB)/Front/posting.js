// posting.js
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('button');
    if (button) {
        button.addEventListener('click', async (event) => {
            event.preventDefault();

            const posttitle = document.getElementById('posttitle').value;
            const content = document.getElementById('content').value;
            const chooseFile = document.getElementById('chooseFile').files[0];

            // 로그인된 사용자의 nickName 가져오기
            const response = await fetch('http://localhost:3000/session', {
                method: 'GET',
                credentials: 'include'
            });
            const sessionData = await response.json();
            const nickName = sessionData.user.nickName;

            if (posttitle === "" || content === "") {
                alert("*제목, 내용을 모두 작성해주세요");
                return;
            }

            const post = {
                posttitle: posttitle,
                content: content,
                nickName: nickName, // nickName 설정
                datetime: new Date().toISOString(),
                chooseFile: null
            };

            if (chooseFile) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    post.chooseFile = reader.result.split(',')[1];
                    await sendPost(post);
                };
                reader.readAsDataURL(chooseFile);
            } else {
                await sendPost(post);
            }
        });
    } else {
        console.error('Submit button not found');
    }
});

async function sendPost(post) {
    try {
        const response = await fetch(`http://localhost:3000/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            alert('게시글이 성공적으로 등록되었습니다.');
            window.location.href = `http://localhost:8000/detail.html?postId=${data.postId}`; // 게시글 상세 페이지로 리디렉션
        } else {
            throw new Error('서버에서 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('게시글 등록 중 오류가 발생했습니다.');
    }
}