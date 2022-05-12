<template>
    <div>
        <div
            v-if="filterBar"
            class="table-filter">
            <input
                v-model.trim="search.title"
                placeholder="Поиск"
                type="text">
            <select v-model.number="search.filter">
                <option value="0">
                    По стандарту
                </option>
                <option value="1">
                    Название
                </option>
                <option value="2">
                    Артист
                </option>
                <option value="3">
                    Длительность
                </option>
            </select>
        </div>
        <table v-if="tracks.length > 0">
            <thead>
            <tr>
                <th>№</th>
                <th>Название</th>
                <th>Артист</th>
                <th class="clock">
                    <i class="fal fa-clock fa-sm"/>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(track, index) in filteredTracks"
                :key="track.id"
                @click="playCurrent(track)"
            >
                <td class="index">
                    {{ index + 1 }}
                </td>
                <td class="table-row">
                    <div
                        v-if="withoutImage === false"
                        class="table-row-image">
                        <img
                            :alt="track.track.title"
                            :src="GetImage(track.track.ogImage)">
                        <div
                            v-if="track.track.id === $store.state.player.track_index"
                            class="black-bar">
                            <PlayingIcon :stop="!$store.state.player.playing"/>
                        </div>
                        <button
                            v-else
                            class="table-row-play">
                            <i class="fas fa-play fa-xs"/>
                        </button>
                    </div>

                    <p class="title">
                        {{ track.track.title }}
                        <span
                            v-if="track.track.version"
                            class="sub-title">
                            ({{ track.track.version }})
                        </span>
                    </p>
                </td>
                <td class="artists">
                    {{ getArtist(track.track.artists) }}
                </td>
                <td class="duration">
                    {{ ConvertDuration(track.track.durationMs) }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import PlayingIcon from './PlayingIcon.vue';
import MusicApi from '../mixins/MusicApi.js';
import GetArtists from '../mixins/GetArtists.js';
import GetImage from '../mixins/GetImage.js';
import ConvertDuration from '../mixins/ConvertDuration.js';

export default {
    name: 'TheTracksTable',
    components: {PlayingIcon},
    mixins: [MusicApi, GetArtists, GetImage, ConvertDuration],
    props: {
        tracks: {
            type: Array,
            required: true,
        },
        withoutImage: {
            type: Boolean,
            default() {
                return false;
            }
        },
        filterBar: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    data() {
        return {
            search: {
                title: '',
                filter: 0,
            }
        };
    },
    computed: {
        filteredTracks() {
            let out = this.tracks;

            if (this.search.title.length > 0) {
                let searchResult = out
                    .filter(item => {
                        return item.track.title.toLowerCase().indexOf(this.search.title.toLowerCase()) !== -1
                            || item.track.artists.findIndex(item => item.name.toLowerCase().indexOf(this.search.title.toLowerCase()) !== -1) !== -1;
                    });

                out = searchResult.concat(out.filter(item => !searchResult.includes(item)));
            }

            switch (this.search.filter) {
                case 1:
                    out = out.sort(this.compareName);
                    break;
                case 2:
                    out = out.sort(this.compareArtists);
                    break;
                case 3:
                    out = out.sort(this.compareDuration);
                    break;
            }

            return out;
        }
    },
    methods: {
        playCurrent(track) {
            this.$store.dispatch('setShuffle', false);
            this.$store.dispatch('unshiftToQueue', track);
            this.$store.dispatch('setIsPlaying', false);
        },
        getArtistMappingName(artists) {
            return artists.map(item => item.name[0]).toString();
        },
        compareName(a, b) {
            if (a.track.title > b.track.title)
                return 1;

            if (a.track.title < b.track.title)
                return -1;

            return 0;
        },
        compareArtists(a, b) {
            if (this.getArtistMappingName(a.track.artists) > this.getArtistMappingName(b.track.artists))
                return 1;

            if (this.getArtistMappingName(a.track.artists) < this.getArtistMappingName(b.track.artists))
                return -1;

            return 0;
        },
        compareDuration(a, b) {
            if (a.track.durationMs > b.track.durationMs)
                return 1;

            if (a.track.durationMs < b.track.durationMs)
                return -1;

            return 0;
        }
    }
};
</script>

<style scoped>
table {
    margin: 0;
    width: 100%;
    border-spacing: 0 10px;
}

thead {
    text-align: left;
}

thead th {
    font-weight: 400;
    color: #8E929C;
    text-transform: uppercase;
}

thead tr:hover {
    background: none;
}

tr {
    font-size: 14px;
    transition: background-color 0.2s;
}

tr:hover {
    transition: background-color 0.2s;
    background-color: #1E222D;
}

.table-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.table-row img {
    width: 41px;
    height: 41px;
    border-radius: 4px;
}

.table-row .like {
    margin-left: 10px;
    color: #AFB8C1;
    cursor: pointer;
}

.title {
    font-weight: 400;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.index {
    font-size: 14px;
    font-weight: 300;
    width: 30px;
}

.like {
    opacity: 0;
    transition: opacity 0.2s;
    cursor: pointer;
}

tr:hover .like, tr:hover .table-row-play {
    opacity: 1;
    transition: opacity 0.2s;
}


.duration {
    font-size: 12px;
    text-align: center;
}

.table-row-image {
    position: relative;
    margin-right: 12px;
}

.table-row-play {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: var(--main-color);
    border-radius: 999px;
    width: 25px;
    height: 25px;
    opacity: 0;
    transition: opacity 0.2s;
}

.table-row-play i {
    transform: translate(0, -1px);
}

.clock {
    display: flex;
    flex-direction: row;
    justify-content: center;
    transform: translateX(-2px);
}

.black-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
}

.table-filter {
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin-bottom: 17px;
}

.table-filter input[type="text"] {
    background: rgba(44, 53, 77, 0.57);
    border-radius: 4px;
    color: white;
    padding: 0 12px;
}

.table-filter select {
    background: none;
    margin-left: 20px;
    border: none;
    outline: none;
    color: white;
}

.table-filter option {
    background: rgba(44, 53, 77, 0.57);
}

</style>
