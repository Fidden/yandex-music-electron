<template>
    <div class="chart-container">
        <h2 class="chart-container-title">
            Чарт Яндекс.Музыки<br>
            <span class="chart-container-subtitle">{{ chart.title }}</span>
        </h2>
        <div
            v-if="Object.keys(chart).length"
            class="chart-tracks-container">
            <div
                v-for="item in firstChartTracks"
                :key="item.id"
                class="chart-tracks-block">
                <div class="chart-block-info">
                    <p class="chart-block-info-pos">
                        {{ item.chart.position }}
                    </p>
                    <i
                        v-if="item.chart.progress === 'up'"
                        class="fas fa-caret-up fa-xs"/>
                    <i
                        v-else-if="item.chart.progress === 'down'"
                        class="fas fa-caret-down fa-xs"/>
                    <i
                        v-else
                        class="far fa-horizontal-rule"/>
                </div>
                <div class="chart-track-body">
                    <img
                        :alt="item.track.title"
                        :src="GetImage(item.track.ogImage)">
                    <p class="chart-track-body-title">
                        {{ item.track.title }}<br>
                        <span>{{ getArtist(item.track.artists) }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GetImage from '../mixins/GetImage.js';
import { mapGetters } from 'vuex';
import GetArtists from '../mixins/GetArtists.js';

export default {
    name: 'TheChart',
    mixins: [GetImage, GetArtists],
    computed: {
        chart() {
            return this.$store.state.chart.all;
        },
        ...mapGetters([
            'firstChartTracks',
        ])
    }
};
</script>

<style scoped>
.chart-tracks-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 7px;
}

.chart-tracks-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
}

.chart-tracks-block img {
    width: 50px;
    height: 50px;
}

.chart-container-title {
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 20px;
    line-height: 20px;
}

.chart-container-subtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #8E929C;
}

.chart-block-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15px;
}

.chart-block-info-pos {
    font-size: 14px;
    font-weight: 300;
}

.fa-horizontal-rule {
    width: 8px;
    overflow: hidden;
}

.chart-track-body {
    background: #292D39;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 4px;
    flex: 1;
    border-radius: 4px;
    overflow: hidden;
}

.chart-track-body img {
    margin-right: 10px;
    border-radius: 4px;
}

.chart-track-body-title {
    line-height: 95%;
}

.chart-track-body-title span {
    color: #8E919A;
    font-weight: 400;
    font-size: 12px;
}

</style>
