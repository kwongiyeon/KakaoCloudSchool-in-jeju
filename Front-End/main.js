import fs from 'fs';
import path from 'path';
const dbFilePath = path.join(__dirname, '../Front/DB.json');
// 게시글을 무한으로 배열하는 JavaScript 코드
const container = document.getElementById('posts-container');

// 무한 반복을 위한 루프
let count = 1;

// 숫자 형식 변환 함수
const formatNumber = (number) => {
    if (number >= 100000) {
        return (number / 1000).toFixed(0) + 'K';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number;
    }
};

while (true) {
    // 게시글 제목 생성 함수
    const generatePostTitle = () => {
        const maxLength = 26;
        const baseTitle = '환영합니다. 여기는 커뮤니티입니다. 이건 ';
        const titleSuffix = `${count}번째 글입니다.`;
        const title = baseTitle + titleSuffix;

        // 제목이 26자를 초과하는 경우, 26자까지 자르고 '...'을 붙임
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        } else {
            return title;
        }
    };

    // 새로운 게시글 요소 생성
    // const post = document.createElement('div');
    // post.className = 'container';
    // post.innerHTML = `
    //     <a href="detail.html"><h1 id="posttitle">${generatePostTitle()}</h1></a>
    //     <div class = "footer">
    //     <div class = "count">
    //     <span id = "likes"> 좋아요 ${formatNumber(1234)}</span> &nbsp;
    //     <span id = "comments">댓글 수 ${formatNumber(5678)}</span> &nbsp;
    //     <span id = "views">조회수 ${formatNumber(98765)}</span> </div>
    //     <div class="datetime"> 2021-01-01 00:00:00 </div>
    //     </div>
    //     <hr class="horizontal-rule"/>
    //     <img src="/Front/circle.png" width="36px" height="36px"> <small id="nickName">운영진</small>
    // `;
    // // 생성한 게시글을 컨테이너에 추가
    // container.appendChild(post);

    // // 다음 게시글을 위해 카운트 증가
    // count++;

    // // 100번째 게시글까지만 생성 후 종료 (무한으로 생성하려면 조건을 변경하거나 제거하세요)
    // if (count > 100) {
    //     break;
    // }
}

// 초기에 페이지 로드될 때 새로운 게시글 추가
addNewPosts();

fetch("/DB.json")
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('서버에서 오류가 발생했습니다.');
    }
})
// json 데이터로 변경되면 전달
.then(data => {
    const posts = data.posts;
    // 새로운 게시글 요소 생성
    const postElement = document.createElement('div');
    postElement.className = 'container';
    postElement.innerHTML = `
        <a href="detail.html"><h1 id="posttitle">${generatePostTitle()}</h1></a>
        <div class = "footer">
        <div class = "count">
        <span id = "likes"> 좋아요 ${formatNumber(1234)}</span> &nbsp;
        <span id = "comments">댓글 수 ${formatNumber(5678)}</span> &nbsp;
        <span id = "views">조회수 ${formatNumber(98765)}</span> </div>
        <div class="datetime"> 2021-01-01 00:00:00 </div>
        </div>
        <hr class="horizontal-rule"/>
        <img src="/Front/circle.png" width="36px" height="36px"> <small id="nickName">운영진</small>
    `;
    // 생성한 게시글을 컨테이너에 추가
    container.appendChild(post);

    // 다음 게시글을 위해 카운트 증가
    count++;

    if (!formatNumber(number)) {
        return false;
    }
    else if (!generatePostTitle(posts, posttitle)) {
        return false;
    }
    else {
        return true;
    }
})

// 스크롤 이벤트 처리
window.addEventListener('scroll', () => {
    // 현재 스크롤 위치
    const scrollHeight = window.innerHeight + window.scrollY;
    // 문서 전체 높이
    const documentHeight = document.body.offsetHeight;

    // 페이지 하단에 도달하면 새로운 게시글 추가
    if (scrollHeight >= documentHeight) {
        addNewPosts();
    }
});