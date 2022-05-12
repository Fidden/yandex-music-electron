<template>
    <main class="main">
        <div class="item-head">
            <img
                v-if="playlist.ogImage"
                :src="GetImage(playlist.ogImage, '200x200')"
                alt="">
            <div class="item-info">
                <h2>{{ playlist.title }}</h2>
                <h3 v-if="playlist.artists">
                    {{ getArtist(playlist.artists) }}
                </h3>
                <div class="item-info-additional">
                    <p v-if="playlist.year">
                        {{ playlist.year }}
                    </p>
                    <p v-if="playlist.type">
                        - {{ playlist.type }}
                    </p>
                </div>

                <div class="item-controls">
                    <button
                        class="btn"
                        @click="playShuffle">
                        Перемешать
                    </button>
                </div>
            </div>
        </div>
        <TheTracksTable
            v-if="playlist.tracks"
            :tracks="playlist.tracks"/>
    </main>
</template>

<script>
import MusicApi from '../mixins/MusicApi';
import TheTracksTable from '../components/TheTracksTable';
import GetImage from '../mixins/GetImage.js';

export default {
    name: 'PlaylistPage',
    components: {TheTracksTable},
    mixins: [MusicApi, GetImage],
    data() {
        return {
            playlist: {},
        };
    },
    async mounted() {
        this.playlist = await this.getPlaylistData([this.$route.params.kind], this.$route.params.uid);
    },
    methods: {
        playShuffle() {
            this.$store.dispatch('setShuffle', true);
            this.$store.dispatch('setQueue', this.playlist.tracks);
            this.$store.dispatch('setIsPlaying', false);
        },
    }
};
</script>

<style scoped>
.item-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
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

.item-info-additional {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.item-info-additional p:first-child {
    margin-right: 5px;
}

</style>
