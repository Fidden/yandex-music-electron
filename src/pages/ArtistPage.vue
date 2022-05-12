<template>
    <main
        v-if="Object.keys(artist).length"
        class="main">
        <div class="artist-head">
            <img
                :alt="artist.artist.name"
                :src="GetImage(artist.artist.ogImage, '150x150')"
                class="artist-image"
            >
            <div class="artist-head-info">
                <p>Исполнитель</p>
                <h1>{{ artist.artist.name }}</h1>
            </div>
        </div>
        <div class="artist-body">
            <div class="artist-body-block">
                <h2>Популярные треки</h2>
                <TheTracksTable
                    :filter-bar="false"
                    :tracks="popularTracks"/>
            </div>

            <div class="artist-body-block">
                <h2>Популярные альбомы</h2>
                <div class="artist-body-block-body">
                    <AlbumCard
                        v-for="album in popularAlbums"
                        :key="album.id"
                        :item="album"/>
                </div>
            </div>

            <div class="artist-body-block">
                <h2>Похожие артисты</h2>
                <div class="artist-body-block-body">
                    <ArtistCard
                        v-for="similarArtist in similarArtists"
                        :key="similarArtist.id"
                        :artist="similarArtist"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import MusicApi from '../mixins/MusicApi.js';
import GetImage from '../mixins/GetImage.js';
import TheTracksTable from '../components/TheTracksTable.vue';
import AlbumCard from '../components/AlbumCard.vue';
import ArtistCard from '../components/ArtistCard.vue';

export default {
    name: 'ArtistPage',
    components: {ArtistCard, AlbumCard, TheTracksTable},
    mixins: [MusicApi, GetImage],
    data() {
        return {
            artist: {}
        };
    },
    computed: {
        popularTracks() {
            return this.artist.popularTracks.map(item => ({track: item}));
        },
        popularAlbums() {
            let albums = this.artist.albums;
            return albums.splice(0, 5);
        },
        similarArtists() {
            let artists = this.artist.similarArtists;
            return artists.splice(0, 5);
        }
    },
    async mounted() {
        this.artist = await this.getArtistBriefInfo(this.$route.params.id);
    }
};
</script>

<style scoped>
.artist-head {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.artist-image {
    border-radius: 50%;
    margin-right: 40px;
}

/*fixme: сделать 1 классом */
.artist-body-block {
    display: flex;
    flex-direction: column;
}

.artist-body-block-body {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
}


</style>
