const button2 = document.getElementsByClassName('button2');
const chooseFile = document.getElementById('chooseFile');


function loadFile(input) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
    const previewImage = document.getElementById('previewImage');
    previewImage.src = event.target.result;
    previewImage.style.objectFit = "contain";
    previewImage.style.borderRadius = "70%";
    };
    reader.readAsDataURL(file);
}

  //회원 탈퇴 -> 모달 창 열기
  const modal = document.querySelector('.modal');             //모달 창
  const modalOpen = document.querySelector('.button2');       //회원탈퇴 버튼
  const modalClose = document.querySelector('.close_btn');    //취소 버튼
  const mdClose = document.querySelector('.yes_btn');         //확인 버튼

  //열기 버튼을 눌렀을 때 모달팝업이 열림
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
    alert('탈퇴 처리되었습니다.');
    window.location.href=("login.html");
  });

  //닉네임 입력
  function nickNamecheck(nickName) {
    const engCheck = /[a-z]/;
    const numCheck = /[0-9]/;
    const specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    
    if (nickName == null || nickName == "") {   //닉네임 필수 입력
        alert("*닉네임 입력은 필수입니다.");
        return false;
    } 
    else if (nickName.search(/\s/) != -1) {  //닉네임에 공백 있을 때
        alert("*띄어쓰기를 없애주세요");
        return false;
    } 
    else if (nickName.Length<2 || nickName.Length>10) {  //닉네임 한글 1~10자, 영문 및 숫자 2~20자
        alert("*닉네임은 최대 10자까지 작성 가능합니다.");
        return false;
    } 
    else {
        return true;
    }
    };
  
  // 닉네임 중복 검사
  function duplicateNickName(users,nickName){
    for(let i = 0; i< users.length; i++){
        if (users[i].nickname == nickName){
          return false;     
        }   
      } return true;
  }

// 서버로 요청을 보내는 fetch() 추가
fetch('/DB.json', {
  method: 'PUT',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email, password })   //JSON -> 문자열
})
//서버 요청에 대한 응답이 왔을 때 실행, 응답을 JSON으로 파싱(문자열->json 데이터)
.then(response => {
if (response.ok) {
  return response.json();
} else {
  throw new Error('서버에서 오류가 발생했습니다.');
}
})
// json 데이터로 변경되면 전달
.then(data => {
  button1.addEventListener("click", (event) => {
    event.preventDefault();
    const button1 = document.getElementById('button1');
    const nickName = document.getElementById('nickName').value;
    
  // 닉네임 함수 호출
  if (!nickNamecheck(nickName)) {
    return;
    };
  
  // 닉네임 중복 함수 호출
  if (!duplicateNickName(users,nickName)) {
    return;
    };  
  
  });
})

//에러 처리
.catch(error => {
console.error(error);
alert('서버에 연결할 수 없습니다.');
});

//수정 완료 토스트 메시지 표시
function toast(string) {
  const toast = document.getElementById("toast");

  toast.classList.contains("reveal") ?
    (clearTimeout(removeToast), removeToast = setTimeout(function () {
      document.getElementById("toast").classList.remove("reveal")
    }, 1000)) :
    removeToast = setTimeout(function () {
      document.getElementById("toast").classList.remove("reveal")
    }, 1000)
  toast.classList.add("reveal"),
    toast.innerText = string
}