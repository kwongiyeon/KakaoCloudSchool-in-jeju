document.addEventListener('DOMContentLoaded', function() {
  const email = "email@email.com"; // 이 부분을 실제 로그인된 사용자의 이메일로 설정해야 합니다.

  fetch(`/users/${email}`)
      .then(response => response.json())
      .then(user => {
          if (user) {
              document.getElementById('email').textContent = user.email;
              document.getElementById('nickName').value = user.nickName;
              if (user.chooseFile) {
                  document.getElementById('previewImage').src = `/uploads/${user.chooseFile}`;
              }
          } else {
              alert("User not found");
          }
      })
      .catch(error => {
          console.error('Error fetching user data:', error);
      });
});

document.getElementById('updateForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').textContent;
  const nickName = document.getElementById('nickName').value;
  const chooseFile = document.getElementById('chooseFile').files[0];

  if (!nickNamecheck(nickName)) {
      return;
  }

  fetch(`/users`)
      .then(response => response.json())
      .then(users => {
          if (!duplicateNickName(users, nickName)) {
              alert("닉네임이 이미 사용 중입니다.");
              return;
          }

          const formData = new FormData();
          formData.append('nickName', nickName);
          if (chooseFile) {
              formData.append('chooseFile', chooseFile);
          }

          fetch(`/users/${email}`, {
              method: 'PATCH',
              body: formData
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  toast('수정 완료');
              } else {
                  alert('Error updating profile');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Profile update failed');
          });
      })
      .catch(error => {
          console.error('Error fetching users data:', error);
      });
});

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

// 닉네임 입력 검사
function nickNamecheck(nickName) {
  if (nickName == null || nickName === "") {
      alert("*닉네임 입력은 필수입니다.");
      return false;
  } 
  if (nickName.search(/\s/) !== -1) {
      alert("*띄어쓰기를 없애주세요");
      return false;
  } 
  if (nickName.length < 2 || nickName.length > 10) {
      alert("*닉네임은 최대 10자까지 작성 가능합니다.");
      return false;
  } 
  return true;
}

// 닉네임 중복 검사
function duplicateNickName(users, nickName) {
  return users.every(user => user.nickName !== nickName);
}

// 회원 탈퇴 모달 창 열기
document.addEventListener('DOMContentLoaded', () => {
  const userId = 21; // 탈퇴할 회원의 ID를 지정합니다.

  const modal = document.querySelector('.modal');
  const modalOpen = document.querySelector('.button2');
  const modalClose = document.querySelector('.close_btn');
  const mdClose = document.querySelector('.yes_btn');

  modalOpen.addEventListener('click', function () {
      modal.style.display = 'block';
  });

  modalClose.addEventListener('click', function () {
      modal.style.display = 'none';
  });

  mdClose.addEventListener('click', async function () {
      try {
          const response = await fetch(`http://localhost:3000/users/${userId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          if (response.ok) {
              alert('탈퇴 처리되었습니다.');
              window.location.href = "login.html";
          } else {
              alert('회원 탈퇴 중 오류가 발생했습니다.');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('회원 탈퇴 중 오류가 발생했습니다.');
      } finally {
          modal.style.display = 'none';
      }
  });
});

// 수정 완료 토스트 메시지 표시
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