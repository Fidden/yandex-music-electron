<template>
    <div
        v-if="playlist"
        class="playlist-card"
        @click="redirect">
        <div class="playlist-card-image">
            <img
                v-if="playlist.ogImage"
                :alt="playlist.title"
                :src="GetImage(playlist.ogImage, '200x200')">
        </div>

        <h3 class="title">
            {{ playlist.title }}
        </h3>
        <p
            v-if="playlist.artists"
            class="author">
            {{ getArtist(playlist.artists) }}
        </p>

        <p
            v-if="playlist.type"
            class="type">
            {{ playlist.type }}
        </p>
        <p
            v-if="playlist.year"
            class="year">
            {{ playlist.year }}
        </p>
    </div>
</template>

<script>
import GetImage from '../mixins/GetImage.js';
import MusicApi from '../mixins/MusicApi';
import GetArtists from '../mixins/GetArtists';

export default {
    name: 'PlaylistCard',
    mixins: [GetImage, MusicApi, GetArtists],
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    emits: ['data-loaded'],
    data() {
        return {
            playlist: {}
        };
    },
    watch: {
        playlist(value) {
            this.$emit('data-loaded', value);
        }
    },
    async mounted() {
        this.playlist = Object.keys(this.item).length > 2 ?
            this.item :
            await this.getPlaylistData(this.item.kind, this.item.uid || null);
    },
    methods: {
        redirect() {
            this.$router.replace({name: 'playlist', params: {kind: this.item.kind, uid: this.item.uid}});
        }
    }
};
</script>

<style scoped>
.playlist-card {
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

.playlist-card img {
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

.playlist-card-image {
    position: relative;
}

.playlist-card-image img {
    width: 100%;
    object-fit: cover;
}

</style>
