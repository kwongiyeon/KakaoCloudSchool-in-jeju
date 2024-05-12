import fs from 'fs';
import path from 'path';
const dbFilePath = path.join(__dirname, '../Front/DB.json');

const small = document.querySelector('.small');
//이메일 유효성 체크
function emailcheck(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email) || email === "") {
        return false;
    } else {
        return true;
    }
}

//비밀번호 유효성 체크
function passwordcheck(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
        alert("*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.");
        return false;
    } else if (password.value === "") {
        alert("*비밀번호를 입력해주세요.");
        return false;
    } else {
        return true;
    }
}

function passwordcf(users, email, password) {
    for(let i = 0; i<users.length; i++) { if (users[i].email == email && users[i].password == password) {
        return true;
    }};
    return false;
}

// DB.json 파일을 읽어오는 함수
function readDBFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}
    
// 서버로 요청을 보내는 fetch() 추가
fetch('http://localhost:3000/api/data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 다른 필요한 헤더 추가 가능
    },
})
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
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const button1 = document.getElementById('button1');

    button1.addEventListener("click", (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        // 이메일 유효성 검사
        if (!emailcheck(email)) {
            return false;
        }
        // 비밀번호 유효성 검사
        else if (!passwordcheck(password)) {
            return false;
        }
        else if (!passwordcf(users, email, password)) {
            return false;
        }
        else {
            button1.disabled = false; // 버튼 활성화
            setTimeout(function() {
                window.location.href = 'main.html';
            }, 3000);   // 3초 후 페이지 이동
        }
    
        // 이메일과 비밀번호가 맞았을 때와 틀렸을 때
        if (email === email.value && password === password.value) {
            window.location.href = "main.html";
        } else {
            alert("입력하신 계정 정보가 정확하지 않았습니다.");
        }
    });

})

//에러 처리
.catch(error => {
    console.error(error);
    alert('서버에 연결할 수 없습니다.');
});
