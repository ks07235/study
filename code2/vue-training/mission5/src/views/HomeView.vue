<template>
  <div>
    <!-- Bootstrap Offcanvas Navbar 시작 -->
    <nav class="navbar bg-light-blue-custom fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" @click.prevent="goToHome()">My App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">메뉴</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" @click.prevent="goToHome()"
                  data-bs-dismiss="offcanvas">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="goToMenu()" data-bs-dismiss="offcanvas">인기 게시물</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="goToMyPage()" data-bs-dismiss="offcanvas">마이 페이지</a>
              </li>
              <!-- 로그인/로그아웃 상태에 따라 버튼 표시 -->
              <li class="nav-item" v-if="!loggedInUserId">
                <a class="nav-link" href="#" @click.prevent="goToLogin()" data-bs-dismiss="offcanvas">로그인</a>
              </li>
              <li class="nav-item" v-else>
                <a class="nav-link" href="#" @click.prevent="logout()" data-bs-dismiss="offcanvas">로그아웃</a>
              </li>
              <!-- 기존 Dropdown 메뉴는 유지하되, 필요에 따라 Vue Router 링크로 변경 가능 -->
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  게시판
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">일기</a></li>
                  <li><a class="dropdown-item" href="#">기록</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><a class="dropdown-item" href="#">추가..</a></li>
                </ul>
              </li>
            </ul>
            <form class="d-flex mt-3" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
    <!-- Bootstrap Offcanvas Navbar 끝 -->

    <div class="home-container">
      <div class="header-section">
        <h1>환영합니다 {{ userNickname }}님</h1>
      </div>

      <!-- 로그인 상태일 때만 캐러셀과 프라이빗 콘텐츠 표시 -->
      <div v-if="loggedInUserId">
        <!-- Bootstrap Autoplaying carousels 시작 -->
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="image1" class="d-block w-100" alt="Image 1">
            </div>
            <div class="carousel-item">
              <img :src="image2" class="d-block w-100" alt="Image 2">
            </div>
            <div class="carousel-item">
              <img :src="image3" class="d-block w-100" alt="Image 3">
            </div>
            <div class="carousel-item">
              <img :src="image4" class="d-block w-100" alt="Image 4">
            </div>           
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <!-- Bootstrap Autoplaying carousels 끝 -->

        <!-- 기존 프라이빗 홈 콘텐츠 -->
        <div class="private-home-content mt-5">
          <p>이곳은 로그인 후 접근 가능한 프라이빗 홈 화면입니다.</p>
          <button @click="goToHome()" class="btn btn-primary">홈 화면으로</button>
        </div>
      </div>
      <!-- 로그인 상태가 아닐 때 표시될 메시지 (선택 사항) -->
      <div v-else class="not-logged-in-message mt-5">
        <p>로그인하여 더 많은 기능을 이용해보세요!</p>
        <button @click="goToLogin()" class="btn btn-success">로그인하기</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import image1 from '@/images/image1.jpeg';
import image2 from '@/images/image22.jpeg';
import image3 from '@/images/image3.jpeg';
import image4 from '@/images/image44.jpeg';

const router = useRouter();

const loggedInUserId = ref(null);
const userNickname = ref('게스트');

onMounted(() => {
  // localStorage에서 사용자 ID와 닉네임을 불러와 할당
  loggedInUserId.value = localStorage.getItem('userId');
  userNickname.value = localStorage.getItem('nickname') || '게스트';

  // 페이지 로드 시 로그인 상태에 따라 환영 메시지 업데이트
  updateWelcomeMessage();
});

// 로그인 상태에 따라 환영 메시지를 업데이트하는 함수
function updateWelcomeMessage() {
  if (loggedInUserId.value) {
    userNickname.value = localStorage.getItem('nickname')
  } else {
    userNickname.value = '게스트';
  }
}

function goToHome() {
  router.push('/');
}

function goToLogin() {
  router.push('/login');
}

function goToMenu() {
  router.push('/menu');
}

function goToMyPage() {
  const currentUserId = localStorage.getItem('userId');
  if (!currentUserId) {
    alert('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
    router.push('/login');
    return;
  }
  router.push({ path: '/MyPage', query: { id: currentUserId } });
}

function logout() {
  localStorage.removeItem('userId');
  localStorage.removeItem('nickname');

  loggedInUserId.value = null;
  userNickname.value = '게스트';

  alert('로그아웃 되었습니다.');
  router.push('/');
}
</script>

<style scoped>

#carouselExampleAutoplaying {
  width: 100%; 
  max-width: 600px; 
  margin-top: 30px; 
  border-radius: 10px; 
  overflow: hidden; 
}

/* 모든 요소에 box-sizing 적용 */
* {
  box-sizing: border-box;
}

/* Navbar 배경색 사용자 정의 클래스 */
.bg-light-blue-custom {
  background-color: #c2fac6 !important;
}

/* 기존 home-container 스타일 유지 */
.home-container {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 80px auto 0; /* Navbar 높이만큼 상단 여백 추가 (fixed-top 고려) */
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
}

/* 제목 스타일 */
.header-section {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 0;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  display: inline-block;
  min-width: 200px;
}


.carousel-item img {
  max-width: 500px;
  height: 300px;
  object-fit: cover;
}

/* Navbar 링크에 마우스 오버 시 색상 변경 */
.navbar-nav .nav-link:hover {
  color: #42b983 !important;
}

/* 드롭다운 메뉴 아이템 호버 시 배경색 변경 */
.dropdown-item:hover {
  background-color: #e6f7ed;
}

/* Offcanvas 메뉴 항목 클릭 시 자동으로 닫히도록 data-bs-dismiss 추가 */
.offcanvas-body .nav-link,
.offcanvas-body .dropdown-item {
  cursor: pointer;
}

/* 프라이빗 홈 콘텐츠 스타일 */
.private-home-content {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  background-color: #f0f8ff; /* 연한 파란색 배경 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.private-home-content p {
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 20px;
}

/* 로그인하지 않았을 때 메시지 스타일 */
.not-logged-in-message {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 8px;
  color: #664d03;
}

.not-logged-in-message p {
  font-size: 1.1rem;
  margin-bottom: 15px;
}
</style>
