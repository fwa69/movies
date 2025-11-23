// script.js (전체 코드 최종 확정 - 모든 카드 GIF 전환)

// ------------------ 전역 변수 ------------------ //
const subtitles = ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"];

// ⭐ [수정] 데이터 경로를 GIF 파일로 일관되게 변경
const movieData = [
    // GIF 파일명과 이미지 경로 매칭 (GIF 파일명은 video/ 폴더에 있어야 합니다)
    { id: 1, title: "Chapter 1 (2014)", transitionMedia: "video/johnwick1.gif" },
    { id: 2, title: "Chapter 2 (2017)", transitionMedia: "video/johnwick2.gif" },
    { id: 3, title: "Chapter 3 (2019)", transitionMedia: "video/johnwick3.gif" },
    { id: 4, title: "Chapter 4 (2023)",transitionMedia: "video/johnwick4.gif" }
];

const contentDivs = document.querySelectorAll('.content');
const topBtn = document.getElementById("top-btn");

const headerElement = document.querySelector('header');
const titleElement = document.querySelector('.Britz');
const body = document.querySelector('body');
const originalTitle = titleElement.innerText;


// ------------------ DOM: 카드 내용 주입 (기존과 동일) ------------------ //
contentDivs.forEach((div, index) => {
    const title = document.createElement('h3');
    title.innerText = subtitles[index];
    title.className = 'js-title';
    div.appendChild(title);

    const desc = document.createElement('p');
    desc.innerText = "View Details";
    desc.className = 'js-desc';
    div.appendChild(desc);
});


// ------------------ 스크롤 제어 (BOM) (기존과 동일) ------------------ //
window.onscroll = function () {
    if (window.scrollY > 200) topBtn.style.display = "block";
    else topBtn.style.display = "none";
};

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ------------------ 시네마틱 전환 (GIF 로직 일반화) ------------------ //
function startCinematicTransition(targetUrl, title, index) {
    let overlay = document.getElementById('cinematic-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'cinematic-overlay';
        body.appendChild(overlay);
    }

    const movie = movieData[index]; // 현재 영화 데이터
    const mediaPath = movie.transitionMedia; // GIF 경로 사용
    
    // GIF는 onended 이벤트가 없으므로 고정된 4초 후 이동
    let redirectTime = 2500; 
    let contentHTML = ``;

    // ⭐ [수정] 모든 카드에 대해 GIF 경로가 있는지 확인합니다.
    if (mediaPath) {
        contentHTML = `
            <img src="${mediaPath}" style="
                position:absolute; top:0; left:0;
                width:100%; height:100%;
                object-fit:cover;
                opacity:0.85;
            ">

            <div style="
                position: absolute; 
                z-index: 20; 
                text-align: center;
                top: 50%; 
                left: 50%;
                transform: translate(-50%, -50%);
                color: #d4af37; 
                text-shadow: 0 0 5px #000;
            ">
                <h2 style="letter-spacing: 5px; font-size: 3rem;">ACCESSING ARCHIVE...</h2>
                <p style="font-size: 1.5rem;">${title}</p>
            </div>
        `;
    } else {
        // 경로가 없는 경우 대비
        contentHTML = `
            <h2 style="letter-spacing: 5px;">ACCESSING ARCHIVE...</h2>
            <p>${title}</p>
        `;
    }

    overlay.innerHTML = contentHTML;
    overlay.classList.add("active"); // 즉시 전환 시작

    // [BOM] 설정된 시간 후 페이지 이동
    setTimeout(() => {
        window.location.href = targetUrl;
    }, redirectTime);
    
    // [삭제] GIF는 onended 이벤트가 없으므로 비디오 이벤트 관련 코드는 완전히 제거합니다.
}


// ------------------ 카드 이벤트 ------------------ //
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {

    // Hover Preview (이미지 미리보기)
    card.addEventListener('mouseenter', () => {
        headerElement.style.backgroundImage = `url(${movieData[index].image})`;
        headerElement.style.backgroundSize = 'cover';
        headerElement.style.backgroundPosition = 'center';
        headerElement.style.transition = 'background-image 0.5s ease-in-out';
        headerElement.style.textShadow = '2px 2px 5px #000';
    });

    card.addEventListener('mouseleave', () => {
        headerElement.style.backgroundImage = 'none';
        headerElement.style.backgroundColor = '#121212';
        titleElement.innerText = originalTitle;
        headerElement.style.textShadow = 'none';
    });

    // Click → 시네마틱 전환
    card.addEventListener('click', (event) => {
        event.preventDefault();
        const targetUrl = card.href;
        const cardTitle = card.querySelector('.js-title').innerText; 

        startCinematicTransition(targetUrl, cardTitle, index);
    });
});