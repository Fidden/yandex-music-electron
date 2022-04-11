<template>
    <div class="album-card" v-if="album">
        <img :src="getImage(album.ogImage, '150x150')" :alt="album.title" v-if="album.ogImage">
        <h3 class="title">{{ album.title }}</h3>
        <p class="author" v-if="album.artists">{{ getArtist }}</p>

        <p class="type">Альбом</p>
        <p class="year">2022</p>
    </div>
</template>

<script>
import getImage from "../mixins/getImage";

export default {
    name: "AlbumCard",
    mixins: [getImage],
    data() {
        return {
            album: {}
        }
    },
    props: {
        id: {
            type: Number,
            required: true,
        }
    },
    computed: {
        getArtist() {
            return this.album.artists.map(item => item.name).toString().replace(',', ', ');
        }
    },
    methods: {
        async getAlbumsInfo() {
            let res = await this.$request.get(`/albums/${this.id}`);
            this.album = res.data.result;
        }
    },
    async mounted() {
        await this.getAlbumsInfo();
    }
}
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

</style>
