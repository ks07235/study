<template>
  <div>
    <!-- Bootstrap Offcanvas Navbar 시작 -->
    <nav class="navbar bg-light-blue-custom fixed-top"> <!-- bg-body-tertiary 대신 bg-light-blue-custom 클래스 적용 -->
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

    <!-- 기존 인기 게시물 콘텐츠 -->
    <div class="content-container">
      <h1>인기 게시물</h1>
      <button @click="goToHome()" class="btn btn-primary mt-3">홈 화면으로</button> <!-- Bootstrap 버튼 스타일 적용 -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // ref, onMounted 추가
import { useRouter } from 'vue-router';

const router = useRouter();

// 로그인 상태 관리를 위한 변수 추가
const loggedInUserId = ref(null);
const userNickname = ref('게스트'); // Navbar 제목에 사용되지 않지만, 일관성을 위해 유지

onMounted(() => {
  // localStorage에서 사용자 ID와 닉네임을 불러와 할당
  loggedInUserId.value = localStorage.getItem('userId');
  userNickname.value = localStorage.getItem('nickname') || '게스트';
  // 이 페이지에서는 환영 메시지가 없으므로 updateWelcomeMessage는 호출하지 않습니다.
});

function goToHome() {
  router.push('/');
}

function goToLogin() {
  router.push('/login');
}

function goToMenu() {
  router.push('/menu'); // 현재 페이지로 다시 이동하는 것이므로 필요에 따라 조정
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
/* Navbar 배경색을 하늘색으로 변경하는 사용자 정의 클래스 */
.bg-light-blue-custom {
  background-color: #c2fac6 !important;
  /* 연한 하늘색 (LightBlue) */
}

/* 모든 요소에 box-sizing 적용 */
* {
  box-sizing: border-box;
}

/* 콘텐츠 컨테이너: Navbar 아래로 콘텐츠가 시작되도록 상단 여백 추가 */
.content-container {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  /* 최대 너비 설정 */
  margin: 80px auto 0;
  /* Navbar 높이만큼 상단 여백 및 좌우 자동 마진으로 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 내부 콘텐츠 중앙 정렬 */
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  /* 제목 아래 여백 */
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  width: 100%;
  /* 부모 컨테이너 너비에 맞춤 */
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
</style>
