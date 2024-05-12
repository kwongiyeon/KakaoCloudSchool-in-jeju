const button1 = document.getElementById('button1');
const small = document.querySelector('.small');
const chooseFile = document.getElementById('chooseFile');


// 이미지 업로드
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

    // 프로필 사진 유효성 검사
    function imgcheck(chooseFile) {
        if(chooseFile.value == "") {
            alert("*프로필 사진을 추가해주세요.");
            return false;
        } else {
            return true;
        }
    };

    //이메일 입력(유효성 체크, 너무 짧을 때, 비어 있을 때, 틀렸을 때)
    function emailcheck(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return false;
        } else {
            return true;
        }
    };

    //이메일 중복 검사
    function duplicateEmail(users,email){
        for(let i = 0; i< users.length; i++){
            if (users[i].email == email){
                return false;
            }
        }   return true;
    }

    //비밀번호 입력(유효성 체크, 입력 안 했을 때, 틀렸을 때)
    function passwordcheck(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (!passwordRegex.test(password)) {
            alert("*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.");
            return false;
        } else if (password.value !== confirmPassword.value) {
            alert("*비밀번호가 다릅니다.");
            return false;
        } else if (password.value === "") {
            alert("*비밀번호를 입력해주세요.");
            return false;
        } else {
            return true;
        }
    };

    //비밀번호 확인 입력
    function confirmPasswordcheck(users, email, password) {
        for(let i = 0; i<users.length; i++) { if (users[i].email == email && users[i].password == password) {
            return true;
        }};
        return false;
    }
        if (!confirmPassword(users, email, password)) {
            alert("*비밀번호가 다릅니다.");
            return false;
        } else if (confirmPassword.value === "") {
            alert("*비밀번호를 한 번 더 입력해주세요.");
            return false;
        } else if (password.value === confirmPassword.value) {
            return true;
        };

    //닉네임 입력
    function nickNamecheck(nickName) {
        const engCheck = /[a-z]/;
        const numCheck = /[0-9]/;
        const specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        
        if (nickName == null || nickName == "") {   //닉네임 필수 입력
            alert("*닉네임 입력은 필수입니다.");
            innersmall.InnerText = "*닉네임 입력은 필수입니다.";
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

    //닉네임 중복 검사
    function duplicateNickName(users,nickName){
            for(let i = 0; i< users.length; i++){
                if (users[i].nickname == nickName){
                        return false;     
                    }   
                }   return true;
     }

    //전부 입력 완료
    function check() {
        if (chooseFile == null || email == "" || password == "" || confirmPassword == "" || nickName == "") {
            button1.disabled = true; // 버튼 비활성화
        }
        else {
            button1.disabled = false; // 버튼 활성화
            window.location.href = "http://127.0.0.1:5500/login.html";
            alert('회원가입하였습니다. 로그인 해 주세요.');
        }
    }


// 서버로 요청을 보내는 fetch() 추가
fetch('/DB.json')
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
   const users = data.users;

   button1.addEventListener("click", (Event) => {
    Event.preventDefault();
    const chooseFile = document.getElementById('chooseFile').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const nickName = document.getElementById('nickName').value;
    const duplicateEmail = document.getElementById('email').value;

    if (email == "") {
        emailtext.InnerText = "*이메일을 입력해주세요.";
        return false;
    } else if (!emailRegex.test(email)) {
        emailtext.InnerText = "*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)";
    } else if (!duplicateEmail(users,email)) {
        emailtext.InnerText = "*중복된 이메일입니다.";
    }
    
        // 프로필 사진 함수 호출
        if (!imgcheck(chooseFile)) {
            return;
        };
    
        // 이메일 함수 호출
        if (!emailcheck(email)) {
            return;
        };
    
        // 이메일 중복 함수 호출
        if (!duplicateEmail(users,email)) {
            return;
        };
    
        // 비밀번호 함수 호출
        if (!passwordcheck(password)) {
            return;
        };
    
        // 비밀번호 확인 함수 호출
        if (!confirmPasswordcheck(confirmPassword)) {
            return;
        };
    
        // 닉네임 함수 호출
        if (!nickNamecheck(nickName)) {
            return;
        };
        
        // 닉네임 중복 함수 호출
        if (!duplicateNickName(users,nickName)) {
            return;
        };        
    
        // 전부 입력했는지 확인하는 함수 호출
        if (!check()) {
            return;
        };
});

})

//에러 처리
.catch(error => {
    console.error(error);
    alert('서버에 연결할 수 없습니다.');
});


const button2 = document.getElementById('button2');

button2.addEventListener("click", (Event) => {
    window.location.href = "http://127.0.0.1:5500/login.html";
});