import fs from 'fs';
import path from 'path';
const dbFilePath = path.join(__dirname, '../Front/DB.json');
const button = document.getElementById('button');

//제목, 내용 입력
function makePost() {
  const engCheck = /[a-z]/;
  const numCheck = /[0-9]/;
  const specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/;
}

// 서버로 요청을 보내는 fetch() 추가
fetch('/DB.json')

.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('서버에서 오류가 발생했습니다.');
  }
  })

.then(data => {
  const users = data.users;
  const posts = data.posts;
  
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const posttitle = document.getElementById('posttitle').value;
    const content = document.getElementById('content').value;

      if (posttitle == "" || content == "") {   //제목, 내용 필수 입력
          alert("*제목, 내용을 모두 작성해주세요");
          button.disabled = true; // 비활성화
      } 
      else {
          button.disabled = false; // 활성화
      }
    })

  // 게시글 작성 함수 호출
    if (!makePost()) {
      return;
    };
});