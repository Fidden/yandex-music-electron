<template>
    <main class="main">
        <div class="artists-container">
            <ArtistCard
                v-for="artist in artists"
                :key="artist.id"
                :artist="artist"/>
        </div>
    </main>
</template>

<script>
import MusicApi from '../mixins/MusicApi.js';
import GetImage from '../mixins/GetImage.js';
import ArtistCard from '../components/ArtistCard.vue';

export default {
    name: 'ArtistsPage',
    components: {ArtistCard},
    mixins: [MusicApi, GetImage],
    computed: {
        artists() {
            return this.$store.state.artists.data;
        }
    },
    async mounted() {
        if (!this.artists.length)
            this.$store.dispatch('setArtists', await this.getArtists());
    }
};
</script>

<style scoped>
.artists-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
}
</style>
