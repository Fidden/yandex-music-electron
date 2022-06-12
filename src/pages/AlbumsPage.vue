<template>
    <main class="main">
        <div class="albums-head">
            <h2>Альбомы</h2>
        </div>
        <div class="albums-body">
            <AlbumCard
                v-for="album in albums"
                :key="album.id"
                :item="album"/>
        </div>
    </main>
</template>

<script setup>
import AlbumCard from '../components/AlbumCard.vue';
import { inject, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import useAlbum from '../composables/useAlbum.js';

const request = inject('$request');
const store = useStore();

const albums = ref([]);

onMounted(async () => {
    let res = await request.get(`/users/${store.state.user.account.uid}/likes/albums`);
    for (const item of res.data.result) {
        const index = res.data.result.indexOf(item);
        albums.value[index] = await useAlbum(request, item.id);
    }
});

</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
}

.albums-head {
    margin-bottom: 20px;
}

h2 {
    font-weight: 500;
    font-size: 31.25px;
    line-height: 32px;
    margin-bottom: 20px;
}

.albums-body {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    gap: 10px;
}

.albums-search {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
