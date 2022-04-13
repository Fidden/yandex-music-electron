<template>
    <main class="main">
        <div class="item-head">
            <img
                v-if="playlist.ogImage"
                :src="getImage(playlist.ogImage, '200x200')"
                alt="">
            <div class="item-info">
                <h2>{{ playlist.title }}</h2>
                <h3 v-if="playlist.artists">
                    {{ getArtist(playlist.artists) }}
                </h3>
                <h4>{{ playlist.year }} - {{ playlist.type }}</h4>
                <div class="item-controls">
                    <button @click="play">
                        Слушать
                    </button>
                    <button>Нравится</button>
                    <button>Скачать</button>
                </div>
            </div>
        </div>
        <div
            v-if="playlist.tracks"
            class="item-body">
            <div
                v-for="(track, index) in playlist.tracks"
                :key="track.id"
                class="item-body-block">
                {{ index + 1 }}
                {{ track.track.title }}

                <span v-if="track.track.version">({{ track.track.version }})</span>
                <span>{{ ConvertDuration(track.track.durationMs) }}</span>
            </div>
        </div>
    </main>
</template>

<script>
import MusicApi from '../mixins/MusicApi';
import GetArtists from '../mixins/GetArtists';
import getImage from '../mixins/getImage';
import ConvertDuration from '../mixins/ConvertDuration';

export default {
    name: 'PlaylistPage',
    mixins: [MusicApi, GetArtists, getImage, ConvertDuration],
    data() {
        return {
            playlist: {}
        };
    },
    async mounted() {
        this.playlist = await this.getPlaylistData([this.$route.params.kind]);
    },
    methods: {
        play() {
            this.$store.dispatch('setQueue', this.playlist.tracks);
        }
    },
};
</script>

<style scoped>
.item-head {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.item-head img {
    width: 220px;
    height: 220px;
    margin-right: 20px;
    border-radius: 6px;
}

.item-info {
    display: flex;
    flex-direction: column;
}

.item-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

</style>
