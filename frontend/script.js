// script.js

// -------------------------------------------------------
// 1. DOM (Document Object Model) 구현
// 기존 디자인의 빈칸(.content)에 텍스트만 살짝 채워줍니다.
// -------------------------------------------------------

const subtitles = [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4"
];

const contentDivs = document.querySelectorAll('.content');

contentDivs.forEach((div, index) => {
    // 영화 제목 추가 (h3 태그 생성)
    const title = document.createElement('h3');
    title.innerText = subtitles[index];
    title.className = 'js-title'; // style.css에 정의한 클래스 적용

    // 설명 추가 (p 태그 생성)
    const desc = document.createElement('p');
    desc.innerText = "View Details";
    desc.className = 'js-desc'; // style.css에 정의한 클래스 적용

    // 태그 집어넣기
    div.appendChild(title);
    div.appendChild(desc);
});


// -------------------------------------------------------
// 2. BOM (Browser Object Model) 구현
// 스크롤을 내리면 버튼이 생기고, 누르면 올라가는 기능
// -------------------------------------------------------

const topBtn = document.getElementById("top-btn");

// 스크롤 감지
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    // 스크롤을 20px 이상 내리면 버튼 보이기
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// 버튼 클릭 시 맨 위로 이동
topBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});