// frontend/auth.js

// 1. 회원가입 함수
async function register() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if(!name || !email || !password) {
        alert("모든 정보를 입력해주세요.");
        return;
    }

    try {
        // [수정됨] 'http://localhost:3000' 제거 -> 상대 경로 사용
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("회원가입 성공! 로그인 페이지로 이동합니다.");
            window.location.href = "login.html";
        } else {
            alert("실패: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("서버 연결에 실패했습니다.");
    }
}

// 2. 로그인 함수
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if(!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
    }

    try {
        // [수정됨] 'http://localhost:3000' 제거 -> 상대 경로 사용
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); 
            window.location.href = "index.html";
        } else {
            alert("로그인 실패: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("서버 연결에 실패했습니다.");
    }
}