document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('postId');
  const titleInput = document.getElementById('posttitle');
  const contentInput = document.getElementById('content');
  const chooseFile = document.getElementById('chooseFile');

  // 현재 게시글 정보를 불러와서 폼에 채우기
  fetch(`http://localhost:3000/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        document.getElementById('posttitle').value = post.posttitle;
        document.getElementById('content').value = post.content;
        if (post.chooseFile) {
            const chooseFileElement = document.getElementById('chooseFile');
            chooseFileElement.setAttribute('data-url', post.chooseFile);
        }
    })
    .catch(error => {
        console.error('게시글 정보를 불러오는 중 오류가 발생했습니다:', error);
    });

  // 제목과 내용을 검증하는 함수
  function makePost() {
      const posttitle = titleInput.value.trim();
      const content = contentInput.value.trim();

      if (posttitle === "" || content === "") {
          alert("*제목, 내용을 모두 작성해주세요");
          return false;
      }

      return true;
  }

  const button = document.getElementById('button');
  button.addEventListener('click', (event) => {
      event.preventDefault();

      if (!makePost()) {
        return;
      }

      const posttitle = document.getElementById('posttitle').value;
      const content = document.getElementById('content').value;
      const chooseFile = document.getElementById('chooseFile').files[0];

      if (!posttitle || !content) {
          alert("*제목, 내용을 모두 작성해주세요");
          button.disabled = true; // 비활성화
          return;
      }

      button.disabled = false; // 활성화

      const updatedPost = {
          posttitle: posttitle,
          content: content,
          datetime: new Date().toISOString()
      };

      if (chooseFile) {
          updatedPost.chooseFile = URL.createObjectURL(chooseFile);
      } else if (document.getElementById('chooseFile').dataset.url) {
          updatedPost.chooseFile = document.getElementById('chooseFile').dataset.url;
      }

      fetch(`http://localhost:3000/posts/${postId}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedPost)
      })
      .then(response => response.json())
      .then(data => {
          alert('게시글이 성공적으로 수정되었습니다.');
          window.location.href = `http://localhost:8000/detail.html?postId=${postId}`; // 게시글 상세 페이지로 리디렉션
      })
      .catch(error => {
          console.error('게시글 수정 중 오류가 발생했습니다:', error);
          alert('게시글 수정 중 오류가 발생했습니다.');
      });
  });
});