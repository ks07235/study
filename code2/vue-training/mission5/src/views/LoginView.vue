<template>
  <div>
    <!-- Bootstrap Offcanvas Navbar 시작 -->
    <nav class="navbar bg-light-blue-custom fixed-top"> <!-- bg-body-tertiary 대신 bg-light-blue-custom 클래스 적용 -->
      <div class="container-fluid">
        <a class="navbar-brand" href="#" @click.prevent="goToHome()">My App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
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
                <a class="nav-link active" aria-current="page" href="#" @click.prevent="goToHome()" data-bs-dismiss="offcanvas">Home</a>
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
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
    <!-- Bootstrap Offcanvas Navbar 끝 -->

    <div class="home-container">
      <div class="header-section">
        <h1>로그인 화면</h1>
      </div>

      <div class="input-group">
        <span>ID : </span>
        <input type="text" v-model="idInput" class="text-input" placeholder="ID 입력"></input>
      </div>

      <div class="input-group">
        <span>Password : </span>
        <input type="password" v-model="passwordInput" class="text-input" placeholder="비밀번호 입력"></input>
      </div>

      <div class="button-group">
        <button @click="loginUser()" class="action-button">로그인</button>
        <button @click="signUp()" class="action-button">회원가입</button>
      </div>
    </div>
    <!-- "홈으로" 버튼이 포함된 list-section은 Navbar로 대체되므로 제거 -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // onMounted 추가
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const idInput = ref('');
const passwordInput = ref('');

// 로그인 상태 관리를 위한 변수 추가
const loggedInUserId = ref(null); 
const userNickname = ref('게스트'); // Navbar 제목에 사용되지 않지만, 일관성을 위해 유지

onMounted(() => {
  // localStorage에서 사용자 ID와 닉네임을 불러와 할당
  loggedInUserId.value = localStorage.getItem('userId');
  userNickname.value = localStorage.getItem('nickname') || '게스트';
});

// ----------------------------------------------------------------------
// 함수 정의
// ----------------------------------------------------------------------

function goToHome() {
  router.push('/');
}

function goToLogin() {
  router.push('/login'); // 현재 페이지로 다시 이동하는 것이므로 필요에 따라 조정
}

function goToMenu() {
  router.push('/menu');
}

function goToMyPage() {
  const storedUserId = localStorage.getItem('userId'); 
  if (storedUserId) {
    router.push({ path: '/MyPage', query: { id: storedUserId } });
  } else {
    alert('로그인이 필요합니다.');
  }
}

// 로그인 함수
async function loginUser() {
  console.log('로그인 버튼 클릭됨');

  const id = idInput.value.trim();
  const password = passwordInput.value.trim();

  if (!id || !password) {
    alert('ID와 비밀번호를 모두 입력해주세요.');
    return;
  }

  try {
    const response = await axios.post('http://localhost:7001/account/login', {
      id: id,
      password: password
    });

    console.log('로그인 응답:', response.data);

    if (response.data.code === 200) {
      alert('로그인 성공!');
      // 서버에서 받은 사용자 ID와 닉네임을 localStorage에 저장
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('nickname', response.data.nickname); 

      // 입력 필드 초기화
      idInput.value = '';
      passwordInput.value = '';

      // 로그인 성공 후 Home으로 이동
      router.push('/');

    } else {
      alert(`로그인 실패: ${response.data.message}`);
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    if (error.response && error.response.status === 401) {
      alert('ID 또는 비밀번호가 올바르지 않습니다.');
    } else {
      alert('로그인 중 오류가 발생했습니다.');
    }
  }
}

function signUp() {
  router.push('/SignUp');
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
/* 모든 요소에 box-sizing 적용 */
* {
  box-sizing: border-box;
}

/* Navbar 배경색을 하늘색으로 변경하는 사용자 정의 클래스 */
.bg-light-blue-custom {
  background-color: #c2fac6 !important; /* 연한 하늘색 (LightBlue) */
}

.home-container {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 80px auto 0; /* Navbar 높이만큼 상단 여백 추가 (fixed-top 고려) */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-section {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  display: inline-block;
  min-width: 200px;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

.input-group span {
  width: 90px;
  font-weight: bold;
  color: #34495e;
  flex-shrink: 0;
  text-align: right;
  margin-right: 10px;
}

.text-input {
  flex-grow: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;
}

.text-input:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
}

.action-button, .nav-button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
  margin: 5px;
}

.action-button:hover, .nav-button:hover {
  background-color: #369b6f;
  transform: translateY(-2px);
}

.action-button:active, .nav-button:active {
  transform: translateY(0);
}

.button-group, .list-section { /* list-section은 이제 사용되지 않지만 스타일은 유지 */
  margin-top: 25px;
  text-align: center;
  width: 100%;
  max-width: 500px;
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