<template>
    <div class="search-bar">
        <input
            v-model="search"
            placeholder="Поиск"
            type="text"
            @change="handleInput">
    </div>
</template>

<script lang="ts" setup>
// todo: debounce input
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchStore } from '@/store/search';
import useRequest from '../../composables/useRequest';
import SearchResultInterface from '@/interfaces/SearchResultInterface';

const router = useRouter();
const store = useSearchStore();
const request = useRequest();
const search = ref('');

async function handleInput() {
    if (!search.value.trim().length) {
        return;
    }

    const res = await request.get('/search', {
        params: {
            text: search.value,
            nocorrect: 'false',
            type: 'all',
            page: 0,
            'playlist-in-best': 'false'
        }
    });

    store.setSearchResponse({} as SearchResultInterface);
    store.setSearchResponse(res.data.result as SearchResultInterface);
    await router.push({ name: 'search' });
}
</script>

<style scoped>
.search-bar {
    flex: 1;
    margin: auto 80px;
    align-self: stretch;
    overflow: hidden;
    border-radius: 5px;
    background: #222939;
    border: 1px solid rgba(255, 255, 255, 0.04);
    -webkit-app-region: no-drag;
    height: 35px;
}

.search-bar input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 14px;
    background: none;
    outline: none;
    border: none;
    color: white;
}
</style>
