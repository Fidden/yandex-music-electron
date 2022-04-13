<template>
    <div
        v-if="album"
        class="album-card"
        @click="redirect">
        <div class="album-card-image">
            <button @click="playAlbum">
                <i class="fas fa-play"/>
            </button>
            <img
                v-if="album.ogImage"
                :src="getImage(album.ogImage, '150x150')"
                :alt="album.title">
        </div>

        <h3 class="title">
            {{ album.title }}
        </h3>
        <p
            v-if="album.artists"
            class="author">
            {{ getArtist(album.artists) }}
        </p>

        <p class="type">
            {{ album.type }}
        </p>
        <p class="year">
            {{ album.year }}
        </p>
    </div>
</template>

<script>
import getImage from '../mixins/getImage';
import MusicApi from '../mixins/MusicApi';
import GetArtists from '../mixins/GetArtists';

export default {
    name: 'AlbumCard',
    mixins: [getImage, MusicApi, GetArtists],
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            album: {}
        };
    },
    async mounted() {
        this.album = await this.getAlbum(this.id);
    },
    methods: {
        async playAlbum() {
            this.album = await this.getAlbumData(this.id);
            this.$store.dispatch('setQueue', this.album.volumes[0].map(item => item.id));
        },
        redirect() {
            this.$router.replace({name: 'album', params: {id: this.id}});
        }
    }
};
</script>

<style scoped>
.album-card {
    background: #292C3B;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
}

.album-card img {
    margin-bottom: 12px;
}

.title {
    font-weight: 500;
    font-size: 12.8px;
    line-height: 16px;
}

.author {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
    margin-bottom: 20px;
}

.type {
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
}

.year {
    right: 10px;
    bottom: 10px;
    position: absolute;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E929C;
}

.album-card-image {
    position: relative;
}

.album-card-image button {
    opacity: 0;
    transition: 0.2s;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: var(--main-color);
    width: 45px;
    height: 45px;
    border-radius: 999px;
    z-index: 1000;
}

.album-card:hover .album-card-image button {
    opacity: 1;
    transition: 0.2s;
}

</style>
