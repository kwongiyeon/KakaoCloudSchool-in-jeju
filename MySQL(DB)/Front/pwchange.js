const button = document.getElementById('button');
const smallNewPassword = document.getElementById('smallNewPassword');
const smallConfirmPassword = document.getElementById('smallConfirmPassword');

// 비밀번호 유효성 검사 함수
const passwordcheck = password => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
        smallNewPassword.innerText = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
        return false;
    } else if (!password) {
        smallNewPassword.innerText = "*비밀번호를 입력해주세요.";
        return false;
    } else {
        return true;
    }
};

// 비밀번호 확인 함수
const confirmPasswordcheck = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        smallConfirmPassword.innerText = "*비밀번호가 다릅니다.";
        return false;
    } else if (!confirmPassword) {
        smallConfirmPassword.innerText = "*비밀번호를 한 번 더 입력해주세요.";
        return false;
    } else {
        smallConfirmPassword.innerText = "";
        return true;
    }
};

// 기존 비밀번호와 새로운 비밀번호 확인 함수
const checkIfPasswordsMatch = async (newPassword) => {
    const user = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1]);
    const email = user.email;

    const response = await fetch(`http://localhost:3000/users/password/check`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok || data.password === newPassword) {
        smallNewPassword.innerText = "*새 비밀번호는 기존 비밀번호와 다르게 설정해주세요.";
        return false;
    } else {
        smallNewPassword.innerText = "";
        return true;
    }
};

const updatePassword = async (newPassword) => {
    try {
        // 세션 또는 쿠키에서 이메일 가져오기
        const user = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1]);
        const email = user.email;

        const response = await fetch(`http://localhost:3000/users/password/${email}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword }),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('서버에 연결할 수 없습니다.');
        }

        const data = await response.json();
        if (data.message === 'User password updated') {
            toast('수정 완료');
        } else {
            alert('수정 실패');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('서버에 연결할 수 없습니다.');
    }
};

button.addEventListener("click", async (event) => {
    event.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!passwordcheck(newPassword)) return;
    if (!confirmPasswordcheck(newPassword, confirmPassword)) return;
    if (!await checkIfPasswordsMatch(newPassword)) return;

    await updatePassword(newPassword);
});

const toast = message => {
    const toastElement = document.getElementById("toast");

    if (toastElement.classList.contains("reveal")) {
        clearTimeout(removeToast);
        removeToast = setTimeout(() => {
            toastElement.classList.remove("reveal");
        }, 1000);
    } else {
        removeToast = setTimeout(() => {
            toastElement.classList.remove("reveal");
        }, 1000);
    }
    toastElement.classList.add("reveal");
    toastElement.innerText = message;
};

document.getElementById('update').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/update';
});

document.getElementById('pwchange').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/pwchange';
});

document.getElementById('logout').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        if (data.status === 200) {
            alert('로그아웃 되었습니다.');
            window.location.href = '/login';
        } else {
            alert('로그아웃 중 문제가 발생했습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('서버에 연결할 수 없습니다.');
    }
});