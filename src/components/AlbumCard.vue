<template>
    <div
        v-if="album"
        class="album-card"
        @click="redirect">
        <div class="album-card-image">
            <img
                v-if="album.ogImage"
                :alt="album.title"
                :src="GetImage(album.ogImage, '150x150')">
        </div>

        <h3 class="title">
            {{ album.title }}
        </h3>
        <p
            v-if="album.artists"
            class="author">
            {{ getArtist(album.artists) }}
        </p>

        <p
            v-if="album.type"
            class="type">
            {{ album.type }}
        </p>
        <p
            v-if="album.year"
            class="year">
            {{ album.year }}
        </p>
    </div>
</template>

<script>
import GetImage from '../mixins/GetImage.js';
import MusicApi from '../mixins/MusicApi';
import GetArtists from '../mixins/GetArtists';

export default {
    name: 'AlbumCard',
    mixins: [GetImage, MusicApi, GetArtists],
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    emits: ['data-loaded'],
    data() {
        return {
            album: {}
        };
    },
    watch: {
        album(value) {
            this.$emit('data-loaded', value);
        }
    },
    async mounted() {
        this.album = Object.keys(this.item).length > 1 ?
            this.item :
            await this.getAlbum(this.item.id);
    },
    methods: {
        redirect() {
            this.$router.replace({name: 'album', params: {id: this.item.id}});
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
    cursor: pointer;
    width: 100%;
    height: 100%;
    max-height: 220px;
    max-width: 165px;
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

.album-card-image img {
    width: 100%;
    object-fit: cover;
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
