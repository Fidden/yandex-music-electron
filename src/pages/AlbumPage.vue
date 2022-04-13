<template>
    <main class="main">
        <div class="item-head">
            <img
                v-if="album.ogImage"
                :src="getImage(album.ogImage, '200x200')"
                alt="">
            <div class="item-info">
                <h2>{{ album.title }}</h2>
                <h3 v-if="album.artists">
                    {{ getArtist(album.artists) }}
                </h3>
                <h4>{{ album.year }} - {{ album.type }}</h4>
                <div class="item-controls">
                    <button>Слушать</button>
                    <button>Нравится</button>
                    <button>Скачать</button>
                </div>
            </div>
        </div>
        <div
            v-if="album.volumes"
            class="item-body">
            <div
                v-for="(volume, index) in album.volumes[0]"
                :key="volume.id"
                class="item-body-block">
                {{ index + 1 }}
                {{ volume.title }}

                <span v-if="volume.version">({{ volume.version }})</span>
                <span>{{ ConvertDuration(volume.durationMs) }}</span>
            </div>
        </div>
    </main>
</template>

<script>
import MusicApi from '../mixins/MusicApi';
import getImage from '../mixins/getImage';
import GetArtists from '../mixins/GetArtists';
import ConvertDuration from '../mixins/ConvertDuration';

export default {
    name: 'AlbumPage',
    mixins: [MusicApi, getImage, GetArtists, ConvertDuration],
    data() {
        return {
            album: {},
        };
    },
    async mounted() {
        this.album = await this.getAlbumData(this.$route.params.id);
    }
};
</script>

<style scoped>

</style>
