<template>
  <div class="d-flex justify-content-center align-items-center bg-light-info">
    <h1>로그인 화면</h1>
  </div>
  
  <div>
    <button class="btn btn-primary" @click="login()">로그인</button>
  </div>

</template>

<script setup>

import {useRouter } from 'vue-router'
const router = useRouter();

function login() {
  goToHome();
}

function goToHome() {
  
  
  router.push('/');
}


</script>

<style>

</style>
