<template>
    <div
        v-if="playlist"
        class="playlist-card"
        @click="redirect">
        <div class="playlist-card-image">
            <img
                v-if="playlist.ogImage"
                :src="GetImage(playlist.ogImage, '200x200')"
                :alt="playlist.title">
        </div>

        <h3 class="title">
            {{ playlist.title }}
        </h3>
        <p
            v-if="playlist.artists"
            class="author">
            {{ getArtist(playlist.artists) }}
        </p>

        <p class="type">
            {{ playlist.type }}
        </p>
        <p class="year">
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
        kind: {
            type: Number,
            required: true,
        },
        uid: {
            type: Number,
            default() {
                return -1;
            }
        }
    },
    data() {
        return {
            playlist: {}
        };
    },
    async mounted() {
        this.playlist = this.uid !== -1 ?
            await this.getPlaylistData(this.kind, this.uid)
            : await this.getPlaylistData(this.kind);
    },
    methods: {
        redirect() {
            this.$router.replace({name: 'playlist', params: {kind: this.kind, uid: this.uid}});
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
