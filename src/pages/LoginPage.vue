<template>
    <LayoutSmall>
        <div class="login-page">
            <input
                v-model="token"
                placeholder="Токен"
                type="text"
            >
            <button @click="handleClick">
                Войти
            </button>
        </div>
    </LayoutSmall>
</template>

<script lang="ts" setup>
import LayoutSmall from '@/layouts/LayoutSmall.vue';
import { ref } from 'vue';
import { useMainStore } from '@/store';
import { AppStateEnum } from '@/enums/AppStateEnum';

const store = useMainStore();
const token = ref('');

function handleClick() {
    localStorage.setItem('token', token.value);
    store.setAppState(AppStateEnum.LOADING);
}

</script>

<style scoped>
input {
    background: rgba(44, 53, 77, 0.57);
    border-radius: 4px;
    padding: 8px 12px;
    text-align: center;
    margin-top: 20px;
    color: white;
    width: 100%;
}

button {
    border-radius: 20px;
    border: 2px solid var(--main-color);
    color: var(--main-color);
    background: none;
    width: 100%;
    padding: 8px 12px;
    margin-top: 20px;
}

button:hover {
    background: var(--main-color);
    color: black;
}
</style>
