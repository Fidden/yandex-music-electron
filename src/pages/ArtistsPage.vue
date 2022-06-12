<template>
    <main class="main">
        <h2 class="artists-title">
            Исполнители
        </h2>
        <div class="artists-container">
            <ArtistCard
                v-for="artist in artists"
                :key="artist.id"
                :artist="artist"/>
        </div>
    </main>
</template>

<script setup>
import ArtistCard from '../components/ArtistCard.vue';
import { computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const request = inject('$request');

const artists = computed(() => {
    return store.state.artists.data;
});

onMounted(async () => {
    await store.dispatch('setArtists', await getUserArtists());
});

//get user favorite artists
async function getUserArtists() {
    let res = await request.get(`/users/${store.state.user.account.uid}/likes/artists`);
    return res.data.result;
}
</script>

<style scoped>

.artists-title {
    margin-bottom: 20px;
}

.artists-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
}
</style>
