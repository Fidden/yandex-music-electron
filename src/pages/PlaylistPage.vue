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
                    <button
                        @click="playShuffle"
                        class="btn">
                        Перемешать
                    </button>
                </div>
            </div>
        </div>
        <table v-if="playlist.tracks">
            <thead>
            <tr>
                <th>№</th>
                <th>Название</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(track, index) in playlist.tracks"
                :key="track.id">
                <td class="index">{{ index + 1 }}</td>
                <td class="table-row">
                    <img :src="getImage(track.track.ogImage)" :alt="track.track.title">
                    <p class="title">{{ track.track.title }}
                        <span class="sub-title" v-if="track.track.version">
                            ({{ track.track.version }})
                        </span>
                    </p>
                    <i class="fal fa-heart fa-xs like"/>
                </td>
                <td>{{ ConvertDuration(track.track.durationMs) }}</td>
            </tr>
            </tbody>
        </table>
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
            playlist: {},
            backup: {},
        };
    },
    async mounted() {
        this.playlist = await this.getPlaylistData([this.$route.params.kind]);
    },
    methods: {
        playShuffle() {
            this.$store.dispatch('setShuffle', true);
            this.$store.dispatch('setQueue', this.playlist.tracks);
        }
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

table {
    margin: 0;
    width: 100%;
}

.table-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.table-row img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 12px;
}

.table-row .like {
    margin-left: 10px;
    color: #AFB8C1;
    cursor: pointer;
}

.title {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
}

.index {
    font-size: 14px;
    font-weight: 300;
}


</style>
