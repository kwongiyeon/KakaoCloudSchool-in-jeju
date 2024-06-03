//게시글 삭제 모달 창 표시
const postdelete = document.getElementById('postdelete');

  postdelete.addEventListener("click",(event) => {
    event.preventDefault();
    const modalOpen = document.querySelector('#postdelete');  //삭제 버튼
    const modal = document.querySelector('.po_modal');        //모달 창
    const modalClose = document.querySelector('.close_btn');  //취소 버튼
    const mdClose = document.querySelector('.yes_btn');       //확인 버튼
    
    //삭제 버튼을 눌렀을 때 모달팝업이 열림
    modalOpen.addEventListener('click', function () {
      //display 속성을 block로 변경
      modal.style.display = 'block';
    });
    //취소 버튼을 눌렀을 때 모달팝업이 닫힘
    modalClose.addEventListener('click', function () {
      //display 속성을 none으로 변경
      modal.style.display = 'none';
    });
    //확인 버튼을 눌렀을 때 모달팝업이 닫힘
    mdClose.addEventListener('click', function () {
      //display 속성을 none으로 변경
      modal.style.display = 'none';
      postdelete.closest('.post').remove(); // 게시글 삭제
      alert('게시글이 삭제되었습니다.');
    });
  });

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (!postId) {
        alert('유효하지 않은 게시글입니다.');
        return;
    }

    // 게시글 상세 정보 가져오기
    fetch(`http://localhost:3000/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            document.getElementById('posttitle').innerText = post.posttitle;
            document.getElementById('datetime').innerText = post.datetime;
            document.getElementById('nickName').innerText = post.nickName;
            document.getElementById('content').innerText = post.content;

            if (post.chooseFile) {
                const imageElement = document.getElementById('image');
                imageElement.src = post.chooseFile;
                imageElement.style.display = 'block';
            }

            // 댓글 데이터 가져오기 및 표시
            fetch(`http://localhost:3000/posts/${postId}/comments`)
                .then(response => response.json())
                .then(comments => {
                    const commentContainer = document.querySelector('.communicateList');
                    comments.forEach(comment => {
                        const commentElement = document.createElement('article');
                        commentElement.className = 'comment';
                        commentElement.innerHTML = `
                            <div class="info">
                                <img src="circle.png" width="36px" height="36px">
                                <small>${comment.nickName}</small>
                                <span class="date">${comment.datetime}</span>
                            </div>
                            <div class="controlBtns">
                                <button type="submit" class="cmdelete" name="cmdelete">삭제</button>
                                <div class="cm_modal">
                                    <div class="modal_popup">
                                        <h3 style="text-align: center;">댓글을 삭제하시겠습니까?</h3>
                                        <p>삭제한 내용은 복구할 수 없습니다.</p>
                                        <div class="mobt">
                                            <button type="button" class="close_btn">취소</button>
                                            <button type="button" class="yes_btn">확인</button>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="cmmodify" name="cmmodify">수정</button>
                            </div>
                            <p class="cmcontent">${comment.content}</p>
                        `;
                        commentContainer.appendChild(commentElement);
                    });
                })
                .catch(error => {
                    console.error('댓글 데이터를 불러오는 동안 오류가 발생했습니다:', error);
                });
        })
        .catch(error => {
            console.error('게시글 상세 정보를 불러오는 동안 오류가 발생했습니다:', error);
        });

    // 수정 버튼 클릭 시 postupdate.html로 이동
    const modifyButton = document.getElementById('postmodify');
    modifyButton.addEventListener('click', () => {
    window.location.href = `http://localhost:8000/postupdate.html?postId=${postId}`;
    });

    // 게시글 수정
    document.getElementById('postmodify').addEventListener('click', (event) => {
    event.preventDefault();
    const postId = new URLSearchParams(window.location.search).get('postId');
    const posttitle = document.getElementById('posttitle').innerText;
    const content = document.getElementById('content').innerText;
    const updatedPost = { posttitle, content };

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
        window.location.reload(); // 페이지 새로고침
    })
    .catch(error => {
        console.error('게시글 수정 중 오류가 발생했습니다:', error);
        alert('게시글 수정 중 오류가 발생했습니다.');
    });
});

    // 게시글 삭제
    document.getElementById('postdelete').addEventListener('click', (event) => {
    event.preventDefault();
    const postId = new URLSearchParams(window.location.search).get('postId');

    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('게시글이 성공적으로 삭제되었습니다.');
        window.location.href = '/main.html'; // 메인 페이지로 리디렉션
    })
    .catch(error => {
        console.error('게시글 삭제 중 오류가 발생했습니다:', error);
        alert('게시글 삭제 중 오류가 발생했습니다.');
    });
});


    // 댓글 등록 이벤트 처리
    document.getElementById('button1').addEventListener('click', () => {
        const commentContent = document.getElementById('comment').value;
        if (!commentContent) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        const comment = {
            nickName: '현재 사용자', // 현재 사용자 정보로 대체
            datetime: new Date().toISOString(),
            content: commentContent
        };

        fetch(`http://localhost:3000/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('댓글 등록 중 오류가 발생했습니다.');
            }
        })
        .then(data => {
            alert('댓글이 성공적으로 등록되었습니다.');
            window.location.href = `http://localhost:3000/posts/${postId}`; // 리다이렉션
        })
        .catch(error => {
            console.error('댓글 등록 중 오류가 발생했습니다:', error);
        });
    });
});

// 댓글 수정
document.querySelectorAll('.cmmodify').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const commentElement = button.closest('.comment');
        const commentId = commentElement.dataset.commentId;
        const content = commentElement.querySelector('.cmcontent').innerText;
        const updatedComment = { content };

        fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedComment)
        })
        .then(response => response.json())
        .then(data => {
            alert('댓글이 성공적으로 수정되었습니다.');
            window.location.reload(); // 페이지 새로고침
        })
        .catch(error => {
            console.error('댓글 수정 중 오류가 발생했습니다:', error);
            alert('댓글 수정 중 오류가 발생했습니다.');
        });
    });
});

// 댓글 삭제
document.querySelectorAll('.cmdelete').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const commentElement = button.closest('.comment');
        const commentId = commentElement.dataset.commentId;

        fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('댓글이 성공적으로 삭제되었습니다.');
            window.location.reload(); // 페이지 새로고침
        })
        .catch(error => {
            console.error('댓글 삭제 중 오류가 발생했습니다:', error);
            alert('댓글 삭제 중 오류가 발생했습니다.');
        });
    });
});


// 댓글 삭제 모달 창 표시
document.addEventListener('DOMContentLoaded', function() {
  const cmDeleteElements = document.querySelectorAll('.cmdelete');
  cmDeleteElements.forEach((el) => {
      el.addEventListener('click', (event) => {
          event.preventDefault(); // 기본 동작 방지

          // 모달 열기
          const modal = el.closest('.comment').querySelector('.cm_modal');
          modal.style.display = 'block';

          // 확인 버튼 이벤트 처리
          const confirmButton = modal.querySelector('.yes_btn');
          confirmButton.addEventListener('click', () => {
              el.closest('.comment').remove(); // 댓글 삭제
              modal.style.display = 'none'; // 모달 닫기
              alert('댓글이 삭제되었습니다.');
          });

          // 취소 버튼 이벤트 처리
          const cancelButton = modal.querySelector('.close_btn');
          cancelButton.addEventListener('click', () => {
              modal.style.display = 'none'; // 모달 닫기
          });
      });
  });
});