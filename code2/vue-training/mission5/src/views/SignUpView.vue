<template>
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
      <h1>회원가입</h1>
    </div>

    <div class="input-group">
      <span>ID : </span>
      <input type="text" v-model="idInput" class="text-input" placeholder="사용할 ID 입력"></input>
      <button @click="checkIdDuplication()" class="action-button">ID 중복확인</button>
    </div>
    <div class="message-area" :class="{ 'success': !isIdDuplicated && idInput.trim(), 'error': isIdDuplicated && idInput.trim() }">
      {{ idCheckMessage }}
    </div>

    <div class="input-group">
      <span>비밀번호 : </span>
      <input type="password" v-model="passwordInput" class="text-input" placeholder="비밀번호 입력"></input>
    </div>

    <!-- 닉네임 입력 필드 추가 -->
    <div class="input-group">
      <span>닉네임 : </span>
      <input type="text" v-model="nicknameInput" class="text-input" placeholder="사용할 닉네임 입력"></input>
    </div>

    <!-- 전화번호 입력 필드 추가 -->
    <div class="input-group">
      <span>전화번호 : </span>
      <input type="text" v-model="mobileInput" class="text-input" placeholder="전화번호 입력 (예: 010-1234-5678)"></input>
    </div>

    <div class="button-group">
      <button @click="signUp()" class="action-button">회원가입</button>
      <button @click="goToHome()" class="action-button">홈으로</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// 입력 필드와 연결될 반응형 변수들
const idInput = ref(''); // ID 입력 필드
const passwordInput = ref(''); // 비밀번호 입력 필드
const nicknameInput = ref(''); // 닉네임 입력 필드 (새로 추가)
const mobileInput = ref(''); // 전화번호 입력 필드 (새로 추가)

// ID 중복 확인 결과 메시지
const idCheckMessage = ref('');
const isIdDuplicated = ref(true);

// ----------------------------------------------------------------------
// 함수 정의
// ----------------------------------------------------------------------

function goToHome() {
  router.push('/');
}

// ID 중복 확인 함수 (변경 없음)
async function checkIdDuplication() {
  console.log('ID 중복확인 버튼 클릭됨');
  const id = idInput.value.trim();

  if (!id) {
    idCheckMessage.value = 'ID를 입력해주세요.';
    isIdDuplicated.value = true;
    return;
  }

  try {
    const response = await axios.get(`http://localhost:7001/account/check-id?id=${id}`);
    console.log('ID 중복확인 응답:', response.data);

    if (response.data.code === 200) {
      if (response.data.isDuplicated) {
        idCheckMessage.value = '이미 사용 중인 ID입니다.';
        isIdDuplicated.value = true;
      } else {
        idCheckMessage.value = `사용 가능한 ID입니다: ${id}`;
        isIdDuplicated.value = false;
      }
    } else {
      idCheckMessage.value = `ID 중복 확인 실패: ${response.data.message}`;
      isIdDuplicated.value = true;
    }
  } catch (error) {
    console.error('ID 중복 확인 중 오류 발생:', error);
    idCheckMessage.value = 'ID 중복 확인 중 오류가 발생했습니다.';
    isIdDuplicated.value = true;
  }
}

// 회원가입 함수 (닉네임, 전화번호 전송 로직 추가)
async function signUp() {
  console.log('회원가입 버튼 클릭됨');

  const id = idInput.value.trim();
  const password = passwordInput.value.trim();
  const nickname = nicknameInput.value.trim(); // 닉네임 값
  const mobile = mobileInput.value.trim(); // 전화번호 값

  // 입력값 유효성 검사 (닉네임, 전화번호도 필수로 포함)
  if (!id || !password || !nickname || !mobile) {
    alert('모든 정보를 입력해주세요 (ID, 비밀번호, 닉네임, 전화번호).');
    return;
  }

  // ID 중복 확인 여부 검사
  if (isIdDuplicated.value) {
    alert('ID 중복 확인을 해주세요. 또는 이미 사용 중인 ID입니다.');
    return;
  }

  // 실제 회원가입 요청
  try {
    const response = await axios.post('http://localhost:7001/account/signup', {
      id: id,
      password: password,
      nickname: nickname, // 닉네임 전송
      mobile: mobile      // 전화번호 전송
    });

    console.log('회원가입 응답:', response.data);

    if (response.data.code === 200) {
      alert('회원가입이 성공적으로 완료되었습니다!');
      router.push('/'); // 회원가입 성공 후 홈으로 이동
    } else {
      alert(`회원가입 실패: ${response.data.message}`);
    }
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    alert('회원가입 중 오류가 발생했습니다.');
  }
}
</script>

<style scoped>

/* Navbar 배경색 사용자 정의 클래스 */
.bg-light-blue-custom {
  background-color: #c2fac6 !important; 
}

.home-container {
    padding: 20px;
    font-family: 'Arial', sans-serif;
    max-width: 800px;
    margin: 0 auto;
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
    margin-bottom: 10px; /* 간격 조정 */
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

.action-button {
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

.action-button:hover {
    background-color: #369b6f;
    transform: translateY(-2px);
}

.action-button:active {
    transform: translateY(0);
}

.button-group {
    margin-top: 25px;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.message-area {
    margin-top: 5px;
    margin-bottom: 15px; /* 메시지 아래 간격 추가 */
    width: 100%;
    max-width: 500px;
    font-size: 0.9em;
    padding: 5px 0;
    min-height: 20px;
    text-align: center;
}

.message-area.success {
    color: #28a745;
    font-weight: bold;
}

.message-area.error {
    color: #dc3545;
    font-weight: bold;
}
</style>
