<template>
    <main class="main">
        <div class="main-container">
            <h2 class="main-container-title">
                Радио
            </h2>
            <div
                v-if="Object.keys(stations).length"
                class="my-wave-container">
                <div
                    v-for="item in stations.stations"
                    :key="item.station.idFroFrom"
                    class="my-wave-block">
                    <div
                        :style="{background:item.station.icon.backgroundColor }"
                        class="my-wave-block-image"
                        @click="playStation(item.station.id)">
                        <img
                            v-if="item.station.icon.imageUrl"
                            :alt="item.station.name"
                            :src="GetImage(item.station.icon.imageUrl)">
                    </div>

                    <p>{{ item.station.name }}</p>
                </div>
            </div>
        </div>
        <div class="main-container">
            <h2 class="main-container-title">
                Жанры
            </h2>
            <div class="genres-container">
                <div
                    v-for="item in stationsAll"
                    :key="item.station.id.tag"
                    class="genre-block">
                    <div
                        :style="{background: item.station.icon.backgroundColor}"
                        class="genre-block-image">
                        <img
                            v-if="item.station.icon.imageUrl"
                            :alt="item.station.name "
                            :src="GetImage(item.station.icon.imageUrl)">
                    </div>

                    <p>{{ item.station.name }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import GetImage from '../mixins/GetImage.js';
import MusicApi from '../mixins/MusicApi.js';

export default {
    name: 'StationPage',
    mixins: [GetImage, MusicApi],
    computed: {
        stations() {
            return this.$store.state.stations.dashboard;
        },
        stationsAll() {
            return this.$store.state.stations.list;
        }
    },
    async mounted() {
        if (!this.$store.state.stations.dashboard.length)
            this.$store.dispatch('setStationsDashboard', await this.getStationsDashboard());

        if (!this.$store.state.stations.list.length)
            this.$store.dispatch('setStationsList', await this.getStationsList());
    },
    methods: {
        async playStation(station_id) {
            //reset queue and reset played list
            this.$store.dispatch('setQueue', []);
            this.$store.dispatch('clearPlayed');
            this.$store.dispatch('setIsPlaying', true);

            this.$store.dispatch('setCurrentStation',
                `${station_id.type}:${station_id.tag}`);

            await this.sendStationFeedback('radioStarted');

            this.$store.dispatch('setQueue',
                await this.getStationTracks(this.$store.state.stations.current));
        }
    }
};
</script>

<style scoped>
.my-wave-container {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    width: 100%;
    gap: 10px;
}

.my-wave-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.my-wave-block-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-bottom: 10px;
}

.my-wave-block-image img {
    width: 50%;
    height: 50%;
}

.genres-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 7px;
    width: 100%;
    grid-auto-flow: row;
    justify-content: space-between;
}

.genre-block {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.genre-block-image {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 5px;
    margin-right: 10px;
    flex-grow: 0;
    flex-shrink: 0;
}

</style>
