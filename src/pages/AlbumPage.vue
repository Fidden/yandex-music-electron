<template>
    <main class="main">
        <div class="item-head">
            <img
                v-if="album.ogImage"
                :src="GetImage(album.ogImage, '200x200')"
                alt="">
            <div class="item-info">
                <h2>{{ album.title }}</h2>
                <h3 v-if="album.artists">
                    {{ getArtist(album.artists) }}
                </h3>
                <div class="item-info-additional">
                    <p v-if="album.year">
                        {{ album.year }}
                    </p>
                    <p v-if="album.type">
                        - {{ album.type }}
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
            v-if="album.volumes"
            :tracks="album.volumes[0]"
            :without-image="true"
        />
    </main>
</template>

<script>
import MusicApi from '../mixins/MusicApi.js';
import TheTracksTable from '../components/TheTracksTable.vue';
import GetImage from '../mixins/GetImage.js';
import ConvertDuration from '../mixins/ConvertDuration.js';
import GetArtists from '../mixins/GetArtists.js';


export default {
    name: 'AlbumPage',
    components: {TheTracksTable},
    mixins: [MusicApi, GetImage, ConvertDuration, GetArtists],
    data() {
        return {
            album: {},
        };
    },
    async mounted() {
        this.album = await this.getAlbumData(this.$route.params.id);
    },
    methods: {
        playShuffle() {
            this.$store.dispatch('setShuffle', true);
            this.$store.dispatch('setQueue', this.album.volumes[0]);
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
