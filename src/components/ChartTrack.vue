<template>
    <div
        class="chart-tracks-block"
        @click="() => playTrack()"
    >
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
            <div class="chart-track-body-image">
                <img
                    v-lazy="useImage(item.track.ogImage, 100, 100)"
                    :alt="item.track.title">
                <PlayingIcon
                    v-if="playerStore.trackIndex === Number(item.track.id)"
                />
            </div>

            <div class="chart-track-body-info">
                <p class="chart-track-body-title">
                    {{ item.track.title }}
                </p>
                <ArtistsLinks
                    :artists="item.track.artists"
                    class="artist-links"
                />
            </div>
            <p class="chart-track-duration">
                {{ useConvertDuration(item.track.durationMs) }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import ArtistsLinks from '@/components/ArtistsLinks.vue';
import useConvertDuration from '@/composables/useConvertDuration';
import PlayingIcon from '@/components/PlayingIcon.vue';
import useImage from '@/composables/useImage';
import { Data } from '@/interfaces/LandingBlocksInterface';
import { useQueueStore } from '@/store/queue';
import { usePlayerStore } from '@/store/player';

const queueStore = useQueueStore();
const playerStore = usePlayerStore();

const props = defineProps<{
    item: Data;
}>();

async function playTrack() {
    queueStore.unshiftToQueue(props.item.track);
}

</script>

<style scoped>
.chart-tracks-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
}

.chart-tracks-block img {
    width: 45px;
    height: 45px;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 4px;
    flex: 1;
    border-radius: 4px;
    overflow: hidden;
}

.chart-track-body-image {
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    margin-right: 10px;
}

.chart-track-body-info {
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 100px);
    overflow-x: hidden;
}

.chart-track-body-title {
    line-height: 16px;
    font-size: 16px;
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.artist-links {
    font-size: 13px;
    line-height: 17px;
    color: #8E929C;
    font-weight: 400;
}

.chart-track-duration {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #8E929C;
    margin-left: auto;
}

.fa-caret-up {
    color: lightgreen;
}

.fa-caret-down {
    color: lightcoral;
}
</style>
