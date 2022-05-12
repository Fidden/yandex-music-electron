<template>
    <main class="main">
        <div class="main-container">
            <h2 class="main-container-title">
                Треки
            </h2>
            <TheTracksTable :tracks="tracks"/>
        </div>
    </main>
</template>

<script>
import MusicApi from '../mixins/MusicApi.js';
import TheTracksTable from '../components/TheTracksTable.vue';

export default {
    name: 'TracksPage',
    components: {TheTracksTable},
    mixins: [MusicApi],
    computed: {
        tracks() {
            return this.$store.state.user.tracks;
        }
    },
    async mounted() {
        //todo: переделать эту хуйню, подумать своей тупой головой над пагинацией и как лучше разбивать данные
        if (!this.tracks.length) {
            let playlists = await this.getPlaylists();
            let kinds = playlists.map(item => item.kind);
            let playlistWithTracks = await this.getUserPlaylistsData(kinds);


            let ids = [];
            playlistWithTracks.forEach(item => {
                ids.push(item.tracks.map(item => `${item.id}:${item.albumId}`));
            });

            let tracks = await this.getTracksByIds(ids);
            tracks = tracks.filter(item => item.available === true).map(item => ({track: item}));
            this.$store.dispatch('setUserTracks', tracks);
        }
    }
};
</script>

<style scoped>

</style>
