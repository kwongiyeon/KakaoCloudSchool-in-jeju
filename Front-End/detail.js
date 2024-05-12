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
      alert('게시글이 삭제되었습니다.');
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
    });
  });

// 게시글 상세 정보 가져오기
fetch("/DB.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답이 실패했습니다.');
        }
        return response.json();
    })
    .then(data => {
      const fs = require('fs');
      // 파일 읽기
      fs.readFile('./DB.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
      });

      const posts = data.posts;
        // 여기서 받은 데이터를 활용하여 HTML 요소에 채워 넣습니다.
        // 예를 들어, 제목을 채우는 방법:
        document.querySelector('h1').innerText = data.title;
        // 나머지 정보들도 유사하게 처리합니다.
    })
    .catch(error => {
        console.error('게시글 상세 정보를 불러오는 동안 오류가 발생했습니다:', error);
    });

// 페이지가 로드되면 게시글 상세 정보를 가져옵니다.
window.addEventListener('load', function() {
  // URL에서 postId를 추출합니다. 예를 들어, http://example.com/detail.html?postId=123
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('postId');

  // postId를 사용하여 게시글 상세 정보를 가져옵니다.
  fetchPostDetails(postId);
});


// 댓글을 무한으로 배열하는 JavaScript 코드
const communicateList = document.querySelector('.communicateList');

// 댓글 정보 가져오기
function fetchPostDetails(postId) {
fetch("/DB.json")
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('서버에서 오류가 발생했습니다.');
    }
  })
  .then(data => {
    const comments = data.comments;
    const posts = data.posts;

    // comments 배열에서 각 댓글 정보를 가져와서 화면에 추가
    comments.forEach(comment => {
      // 새로운 댓글 요소 생성
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
      commentElement.innerHTML = `
        <div class="info">
          <img src="circle.png" width="36px" height="36px"> <small>${comment.ninkname}</small>
          <span class="date">${comment.datetime}</span>
        </div>
        <div class="controlBtns">
          <button type="submit" class="cmdelete" name="cmdelete">삭제</button>
          <div class="cm_modal">
            <div class="modal_popup">
              <h3 style="text-align: center;">댓글을 삭제하시겠습니까?</h3>
              <p>삭제한 내용은 복구 할 수 없습니다.</p>
              <div class="mobt">
                <button type="button" class="close_btn">취소</button>
                <button type="button" class="yes_btn">확인</button>
              </div>
            </div>
          </div>
          <button type="submit" class="cmmodify" name="cmmodify">수정</button>
        </div>
        <p class="cmcontent">${comment.cmcontent}</p>
      `;
      // 생성한 댓글을 컨테이너에 추가
      communicateList.appendChild(commentElement);
    });
  })
  .catch(error => {
    console.error('댓글 정보를 가져오는 도중 오류가 발생했습니다:', error);
    alert('댓글 정보를 가져오는 도중 오류가 발생했습니다.');
  });
}

// 댓글 등록 버튼 활성화
const button1 = document.getElementById('button1');

button1.addEventListener("click", (event) => {
  event.preventDefault();
  const comment = document.getElementById('comment').value;

  // 댓글 입력
  function makeComment(comment) {
    const engCheck = /[a-z]/;
    const numCheck = /[0-9]/;
    const specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/;
    
    if (comment == "") {   // 댓글 필수 입력
        alert('댓글을 입력해주세요.');
        return false;
    } else {
        return true;
    }
  };

  // 댓글 작성 함수 호출
  if (!makeComment(comment)) {
    return;
  }

  // 댓글을 POST하는 fetch 요청 보내기
  fetch("/api/comments", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cmcontent: comment
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('댓글 등록에 실패했습니다.');
    }
    return response.json();
  })
  .then(data => {
    const fs = require('fs');
    // 파일 쓰기
    const content = '파일에 쓸 내용';
    fs.writeFile('./DB.json', content, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('파일이 성공적으로 저장되었습니다.');
    });

    // 댓글 등록 성공 시 화면 갱신 등 추가 작업이 필요할 수 있습니다.
    alert('댓글이 성공적으로 등록되었습니다.');
    console.log(data); // 새로 등록된 댓글 정보를 확인하기 위해 출력합니다.
  })
  .catch(error => {
    console.error('댓글을 등록하는 도중 오류가 발생했습니다:', error);
    alert('댓글 등록에 실패했습니다.');
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
