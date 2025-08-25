<template>

  <div>

    <h1>홈 화면</h1>

  </div>

  <div>

    <div v-if="nameVisiable">
      <label>입력 받은 이름 : </label>
      <span>{{ name }}</span>
    </div>
    <div v-else>
      <label>나이</label>
      <span>21</span>
    </div>

    <div>
      <label>이름 입력 : </label>
      <input type="text" v-model="nameInput">
    </div>

    <div>
      <button @click="show()">확인</button>
    </div>
  </div>

  <div>
    <div style="margin-top:2em; margin-bottom: 2em;">
      <span>동물 정보 </span>
      <button @click="addAnimal()">추가</button>
      <button @click="modifyAnimal()">수정</button>
    </div>
    

    <div v-for="(item, index) in animals" :key="item.id" 
    :class="(item.type == 'dog') ? 'dog-style' : (item.type == 'cat')
                                 ? 'cat-style' : 'nomal-style'">    
      
      <div>
        <label>구분 : </label>
        <span>{{ (item.type == 'dog') ? '강아지' 
                : (item.type == 'cat') ? '고양이'
                : '이건 또 뭔가요?' }}</span>

        <button @click="modifyAnimal(index)">수정</button>
        <button @click="removeAnimal(index)">삭제</button>
      </div>


      <div style="margin-bottom: 1em;">
        <label>이름 : </label>
        <span>{{ item.name }}</span>
      </div>

      <div style="margin-bottom: 1em;">
        <label>나이 : </label>
        <span>{{ item.age }}</span>
      </div>

      <div style="margin-bottom: 1em;">
        <label>전화번호 : </label>
        <span>{{ item.mobile }}</span>
      </div>
      
      <div style="margin-bottom: 1em;">
        <label>이미지 : </label>
        <img :src="(item.type === 'dog' || item.type === 'cat')
        ? item.path : '/images/whatisthat.png'" width="50%">
      </div>      
    </div>

  </div>

</template>

<script setup>

import { onMounted, ref } from 'vue'

// 라우터
import { useRouter } from 'vue-router'
const router = useRouter();


// 스토어 (공통저장소에 있는 것 사용하기)
import { storeToRefs } from 'pinia';

import { useAnimalStore } from '@/stores/animal'
const animalStore = useAnimalStore();
const { animals, mode, selectedIndex } = storeToRefs(animalStore)


// 감시할 수 있는 변수상자, ref 함수를 이용하여 만든다, 봉지를 씌운 것과 같다.
// 자바스크립트 코드에서는 변수상자의 값을 바꿀 때 name.value를 사용해야 한다.
// <template> 안에있는 태그에서 값을 감시할 때는 name을 사용해야 한다.
// 반응형 변수라고 부른다. (Reactive variable)
const name = ref('홍길동1');

const nameInput = ref('');

const nameVisiable = ref(true);



// 화면이 보이기 전에 한번 실행됨
// 목적 : 화면이 보이기 전에 초기화 하거나 또는 실행해야 하는 것들을 실행해줌
onMounted(() => {
  console.log(`AnimalList::onMounted 호출됨`)
})

function show() {
  console.log(`show 함수 호출됨`);

  name.value = nameInput.value;
  // name.value = "홍길동2";

  nameVisiable.value = false;

}

function addAnimal() {
  console.log(`addAnimal 함수 호출됨`);

  mode.value = 'add'
  router.replace('/animal-add');

}

function modifyAnimal(index) {
  console.log(`modifyAnimal 함수 호출됨`);

  mode.value = 'modify';
  selectedIndex.value = index;

  router.replace('/animal-add');

}

function removeAnimal(index) {
  console.log(`removeAnimal 함수 호출됨 -> ${index}`);

  animals.value.splice(index, 1);
}

</script>


<style scoped>
.dog-style{
  background-color: aquamarine;
  margin-bottom: 1em;
}

.cat-style{
  background-color: lemonchiffon;
  margin-bottom: 1em;
}

.nomal-style{
  background-color: gray;
  margin-bottom: 1em;
}
</style>