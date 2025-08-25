

import{ ref } from 'vue'
import { defineStore } from "pinia";

export const useAnimalStore = defineStore('animal', () => {

    const animals = ref([
        {
            id: 1,
            type: 'dog',
            name: '강아지1',
            age: 1,
            mobile : '010-1000-1000',
            path: '/images/dog1.jpg'
        },
        {
            id: 2,
            type: 'dog',
            name: '강아지2',
            age: 2,
            mobile : '010-2000-2000',
            path: '/images/dog2.jpg'
        },
        {
            id: 3,
            type: 'dog',
            name: '강아지3',
            age: 3,
            mobile : '010-3000-3000',
            path: '/images/dog3.png'
        },
        {
            id: 4,
            type: 'cat',
            name: '고양이1',
            age: 4,
            mobile : '010-4000-4000',
            path: '/images/cat1.jpg'
        },
        {
            id: 5,
            type: 'cat',
            name: '고양이5',
            age: 5,
            mobile : '010-5000-5000',
            path: '/images/cat2.jpg'
        },
        {
            id: 6,
            type: 'god4',
            name: '강아지4',
            age: 6,
            mobile : '010-6000-6000',
            path: '/images/dog4.jpg'
        }
    
    ])

    // 추가, 수정 화면 중 어떤 모드인지 구분
    // 'add': 추가 모드
    // 'modify' 수정 모드
    const mode = ref('add')

    // 배열 안의 아이템 중에서 몇 번째 아이탬이 선택되었는지에 대한 인덱스 값
    const selectedIndex = ref(-1)

    return {
        animals, mode, selectedIndex
    }

});

