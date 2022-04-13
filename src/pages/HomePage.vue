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
                    :id="release"
                    :key="release"
                />
            </div>
        </div>
    </main>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import PlaylistCardSmall from '../components/PlaylistCardSmall';
import AlbumCard from '../components/AlbumCard';
//https://api.music.yandex.net/landing3?blocks=personalplaylists%2Cpromotions%2Cnew-releases%2Cnew-playlists%2Cmixes%2Cchart%2Ccharts%2Cartists%2Calbums%2Cplaylists%2Cplay_contexts%2Cpodcasts
export default {
    name: 'HomePage',
    components: {AlbumCard, PlaylistCardSmall},
    computed: {
        ...mapState([
            'playlists',
            'new_releases'
        ]),
        ...mapGetters([
            'lastPlayedPlaylists',
            'firstReleases'
        ]),
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

.main-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 45px;
}

.main-container-title {
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 20px;
    line-height: 20px;
}

.main-container-subtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #8E929C;
}

.album-container {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
}

</style>
