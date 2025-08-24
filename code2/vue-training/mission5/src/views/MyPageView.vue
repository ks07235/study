<template>
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

  <div class="my-page-container">
    <div class="header-section">
      <h1>마이 페이지</h1>
    </div>

    <div class="info-section">
      <p>환영합니다, **{{ userId }}** 님!</p>
      <p>이곳은 사용자님의 개인 정보를 관리하는 공간입니다.</p>
    </div>

    <div class="action-buttons">
      <button @click="deleteAccount()" class="action-button delete-button">계정 삭제</button>
      <button @click="changePassword()" class="action-button">비밀번호 변경</button>
      <button @click="goToHome()" class="action-button nav-button">홈으로 돌아가기</button>
    </div>

    <div v-if="showPasswordChangeForm" class="password-change-form">
      <h2>비밀번호 변경</h2>
      <div class="input-group">
        <label for="newPassword">새 비밀번호:</label>
        <input type="password" id="newPassword" v-model="newPassword" placeholder="새 비밀번호를 입력하세요" autocomplete="new-password">
      </div>
      <div class="input-group">
        <label for="confirmNewPassword">새 비밀번호 확인:</label>
        <input type="password" id="confirmNewPassword" v-model="confirmNewPassword" placeholder="새 비밀번호를 다시 입력하세요" autocomplete="new-password">
      </div>
      <p v-if="passwordChangeMessage" :class="passwordChangeMessage.includes('성공') ? 'success-message' : 'error-message'">
        {{ passwordChangeMessage }}
      </p>
      <div class="form-buttons">
        <button @click="savePasswordChange()" class="action-button">비밀번호 변경 저장</button>
        <button @click="cancelPasswordChange()" class="action-button cancel-button">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const userId = ref('');
const showPasswordChangeForm = ref(false); // 비밀번호 변경 폼 표시 여부
const newPassword = ref(''); // 새 비밀번호 입력 값
const confirmNewPassword = ref(''); // 새 비밀번호 확인 입력 값
const passwordChangeMessage = ref(''); // 비밀번호 변경 결과 메시지

onMounted(() => {
  userId.value = route.query.id;

  if (!userId.value) {
    alert('사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.');
    router.push('/login');
  } else {
    console.log(`마이 페이지에 접근한 사용자 ID: ${userId.value}`);
  }
});

async function deleteAccount() {
  if (!userId.value) {
    alert('삭제할 사용자 정보가 없습니다.');
    return;
  }

  const confirmDelete = confirm(`정말로 ${userId.value} 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`);

  if (confirmDelete) {
    try {
      // 백엔드의 DELETE /account/delete/:id 엔드포인트를 호출합니다.
      const response = await axios.delete(`http://localhost:7001/account/delete/${userId.value}`);

      if (response.data.code === 200) {
        alert('계정이 성공적으로 삭제되었습니다.');
        localStorage.removeItem('userId'); // 로컬 스토리지에서 사용자 ID 제거
        localStorage.removeItem('nickname'); // 로컬 스토리지에서 닉네임 제거
        router.push('/login'); // 로그인 페이지로 리다이렉트
      } else {
        alert(`계정 삭제 실패: ${response.data.message}`);
      }
    } catch (error) {
      console.error('계정 삭제 중 오류 발생:', error);
      if (error.response && error.response.status === 401) {
          alert('권한이 없습니다. 다시 로그인 해주세요.');
      } else if (error.response && error.response.status === 404) {
          alert('해당 계정을 찾을 수 없습니다.');
      } else {
          alert('계정 삭제 중 오류가 발생했습니다.');
      }
    }
  } else {
    alert('계정 삭제가 취소되었습니다.');
  }
}

// 비밀번호 변경 폼을 토글
function changePassword() {
  showPasswordChangeForm.value = !showPasswordChangeForm.value; // 폼 표시 여부 토글
  if (showPasswordChangeForm.value) { // 폼이 열릴 때 초기화
    newPassword.value = '';
    confirmNewPassword.value = '';
    passwordChangeMessage.value = ''; // 기존 메시지 지우기
  }
}

// 비밀번호 변경
async function savePasswordChange() {
  if (!userId.value) {
    passwordChangeMessage.value = '사용자 정보가 없습니다. 다시 로그인해주세요.';
    router.push('/login');
    return;
  }

  if (newPassword.value === '') {
    passwordChangeMessage.value = '새 비밀번호를 입력해주세요.';
    return;
  }

  if (newPassword.value !== confirmNewPassword.value) {
    passwordChangeMessage.value = '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.';
    return;
  }

  // 비밀번호 유효성 검사 (예: 8자 이상)
  if (newPassword.value.length < 8) {
    passwordChangeMessage.value = '비밀번호는 8자 이상이어야 합니다.';
    return;
  }

  try {

    const response = await axios.post('http://localhost:7001/account/change-password', {
      id: userId.value,
      newPassword: newPassword.value
    });

    if (response.data.code === 200) {
      passwordChangeMessage.value = '비밀번호가 성공적으로 변경되었습니다.';
      alert('비밀번호가 성공적으로 변경되었습니다.');
      showPasswordChangeForm.value = false; // 폼 닫기
      newPassword.value = ''; // 입력 필드 초기화
      confirmNewPassword.value = ''; // 입력 필드 초기화
    } else {
      passwordChangeMessage.value = `비밀번호 변경 실패: ${response.data.message}`;
    }
  } catch (error) {
    console.error('비밀번호 변경 중 오류 발생:', error);
    if (error.response && error.response.data && error.response.data.message) {
      passwordChangeMessage.value = `오류: ${error.response.data.message}`;
    } else {
      passwordChangeMessage.value = '비밀번호 변경 중 오류가 발생했습니다.';
    }
  }
}

function goToHome() {
  router.push('/');
}
</script>

<style scoped>

/* Navbar 배경색 사용자 정의 클래스 */
.bg-light-blue-custom {
  background-color: #c2fac6 !important; 
}

.my-page-container {
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

.info-section {
  margin-bottom: 25px;
  text-align: center;
  font-size: 1.1rem;
  color: #34495e;
}

.info-section p {
  margin-bottom: 10px;
}

.info-section strong {
  color: #42b983;
}

.action-buttons {
  margin-top: 25px;
  text-align: center;
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px; /* 버튼 사이 간격 추가 */
  margin-bottom: 20px; /* 폼과의 간격 */
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
  /* margin: 5px; 기존 margin 대신 gap 사용 권장 */
}

.action-button:hover, .nav-button:hover {
  background-color: #369b6f;
  transform: translateY(-2px);
}

.action-button:active, .nav-button:active {
  transform: translateY(0);
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}

/* --- 비밀번호 변경 폼 스타일 추가 --- */
.password-change-form {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 25px;
  margin-top: 30px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.password-change-form h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #34495e;
  font-weight: bold;
}

.input-group input[type="password"] {
  width: calc(100% - 20px); /* 패딩 고려 */
  padding: 12px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.input-group input[type="password"]:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
}

.form-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.form-buttons .action-button {
  min-width: 120px; /* 버튼 너비 통일 */
}

.cancel-button {
  background-color: #6c757d;
}

.cancel-button:hover {
  background-color: #5a6268;
}

.success-message {
  color: #28a745; /* Green */
  margin-top: 10px;
  font-weight: bold;
}

.error-message {
  color: #dc3545; /* Red */
  margin-top: 10px;
  font-weight: bold;
}
</style>