<template>
    <main class="main">
        <div class="main-container">
            <h2 class="main-container-title">
                Главное
            </h2>
            <div class="playlists-container">
                <PlaylistCardSmall
                    v-for="playlist in lastPlayedPlaylists"
                    :key="playlist.playlistUuid"
                    :playlist="playlist"
                />
            </div>
        </div>
        <div class="main-container">
            <h2 class="main-container-title">
                Новые релизы<br>
                <span class="main-container-subtitle">Новые треки, альбомы и сборники</span>
            </h2>
            <div class="album-container">
                <AlbumCard
                    v-for="release in firstReleases"
                    :key="release.id"
                    :item="release"
                    @data-loaded="dispatchNewRelease"
                />
            </div>
        </div>
        <div class="main-container">
            <h2 class="main-container-title">
                Хиты и новинки<br>
                <span class="main-container-subtitle">Новая популярная музыка для вас от нашей редакции</span>
            </h2>
            <div class="album-container">
                <PlaylistCard
                    v-for="hit in firstHits"
                    :key="hit.uid + hit.kind"
                    :item="hit"
                    @data-loaded="dispatchHits"
                />
            </div>
        </div>
        <TheChart/>
    </main>
</template>

<script>
//https://api.music.yandex.net/landing3?blocks=personalplaylists,promotions,new-releases,new-playlists,mixes,chart,charts,artists,albums,playlists,play_contexts,podcasts
import { mapGetters } from 'vuex';
import PlaylistCardSmall from '../components/PlaylistCardSmall';
import AlbumCard from '../components/AlbumCard';
import PlaylistCard from '../components/PlaylistCard';
import TheChart from '../components/TheChart';

export default {
    name: 'HomePage',
    components: {TheChart, PlaylistCard, AlbumCard, PlaylistCardSmall},
    computed: {
        ...mapGetters([
            'lastPlayedPlaylists',
            'firstReleases',
            'firstHits'
        ]),
    },
    methods: {
        dispatchNewRelease(value) {
            this.$store.dispatch('setNewReleaseData', value);
        },
        dispatchHits(value) {
            this.$store.dispatch('setHitData', value);
        }
    }
};
</script>

<style scoped>
.playlists-container {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
}

.album-container {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
}

</style>
