<template>
    <div style="height: calc(100% - 175px)">
        <TheFilter
            v-if="filterBar"
            :data="tracks"
            :filter-func="filterFunc"
            @filtered="onFiltered"
        />
        <RecycleScroller
            :item-size="50"
            :items="filteredTracks"
            class="scroller"
            key-field="id"
        >
            <template #before>
                <div
                    class="scroller-before"
                    :class="{'withOutImage': withoutImage}"
                >
                    <p class="scroller-before-number">
                        #
                    </p>
                    <p class="image-th"/>
                    <p class="scroller-before-name">
                        Название
                    </p>
                    <p>Альбом</p>
                    <p/>
                    <i class="fal fa-clock fa-sm"/>
                </div>
            </template>
            <template #default="{ item, index }">
                <div
                    class="track"
                    :class="{'withOutImage': withoutImage}"
                >
                    <div
                        class="track-back"
                        @click="playCurrent(item, index)"
                    />
                    <div class="index">
                        <span>{{ index + 1 }}</span>
                        <i class="fas fa-play"/>
                    </div>
                    <div
                        class="image">
                        <img
                            :alt="item.title"
                            :src="useImage(item.ogImage, 100, 100)">
                        <PlayingIcon
                            v-if="playerStore.trackIndex === Number(item.id)"
                        />
                    </div>
                    <p class="title">
                        <span class="title-text">
                            {{ item.title }}
                            <span v-if="item.version">
                                ({{ item.version }})
                            </span>
                        </span>
                        <span class="title-body">
                            <ContentWarning
                                v-if="item.contentWarning"
                                :content-warning="item.contentWarning"
                            />
                            <ArtistsLinks
                                class="title-artists"
                                :artists="item.artists"
                            />
                        </span>
                    </p>
                    <AlbumLinks
                        class="albums"
                        :albums="item.albums"
                    />
                    <BaseLikeButton
                        class="like"
                        :liked="item.liked"
                        @click="handleLike(item)"/>
                    <p class="duration">
                        {{ useConvertDuration(item.durationMs) }}
                    </p>
                </div>
            </template>
            <template
                v-if="!withoutMargin"
                #after>
                <div class="track-template"/>
                <div class="track-template"/>
            </template>
        </RecycleScroller>
    </div>
</template>

<script lang="ts" setup>
import TrackInterface from '@/interfaces/TrackInterface';
import ArtistInterface from '@/interfaces/TrackArtistInterface';
import TheFilter from '@/components/TheFilter.vue';
import PlayingIcon from '@/components/PlayingIcon.vue';
import ArtistsLinks from '@/components/ArtistsLinks.vue';
import useConvertDuration from '@/composables/useConvertDuration';
import useImage from '@/composables/useImage';
import { defineProps, onMounted, reactive, ref, Ref } from 'vue';
import { usePlayerStore } from '@/store/player';
import { useQueueStore } from '@/store/queue';
import BaseLikeButton from '@/components/BaseLikeButton.vue';
import { useUserStore } from '@/store/user';
import useLikeAction from '@/composables/useLikeAction';
import { LikesObjectTypesEnum } from '@/enums/LikesObjectTypesEnum';
import TrackLikeInterface from '@/interfaces/TrackLikeInterface';
import AlbumLinks from '@/components/AlbumLinks.vue';
import ContentWarning from '@/components/ContentWarning.vue';

const playerStore = usePlayerStore();
const queueStore = useQueueStore();
const userStore = useUserStore();

const props = defineProps<{
    filterBar?: boolean;
    withoutImage?: boolean;
    tracks: Array<TrackInterface>;
    withoutMargin?: boolean;
}>();

const filterFunc = reactive([
    compareName,
    compareArtists,
    compareDuration
]);

const filteredTracks: Ref<Array<TrackInterface>> = ref([]);

// todo: оптимизируй меня !!!!
// note: при переборе через цикл он замыкается, разберись с этим
// note2: узнай есть ли более легкий и оптимизированный способ проставить лайки
// ибо каждый раз проходить по массиву и искать в другом массиве вхождения не самая лучшая твоя идея
onMounted(() => {
    filteredTracks.value = props.tracks
        .filter(item => item.available)
        .map(item => {
            item.liked = userStore.likes.tracks.findIndex(track => track.id === item.id) !== -1;
            return item;
        });
});

function getArtistMappingName(artists: Array<ArtistInterface>) {
    return artists.map(item => item.name[0]).toString();
}

function compareName(a: TrackInterface, b: TrackInterface) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}

function compareArtists(a: TrackInterface, b: TrackInterface) {
    if (getArtistMappingName(a.artists) > getArtistMappingName(b.artists)) {
        return 1;
    }

    if (getArtistMappingName(a.artists) < getArtistMappingName(b.artists)) {
        return -1;
    }

    return 0;
}

function compareDuration(a: TrackInterface, b: TrackInterface) {
    if (a.durationMs > b.durationMs) {
        return 1;
    }

    if (a.durationMs < b.durationMs) {
        return -1;
    }

    return 0;
}

function onFiltered(data: Array<TrackInterface>) {
    filteredTracks.value = data;
}

function playCurrent(track: TrackInterface, index: number) {
    playerStore.setShuffle(0);

    let newQueue = filteredTracks.value.slice(index, filteredTracks.value.length);
    newQueue = newQueue.concat(filteredTracks.value.slice(0, index));
    queueStore.setQueue(newQueue);

    playerStore.setIsStation(false);
}

async function handleLike(track: TrackInterface) {
    track.liked = await useLikeAction(
        LikesObjectTypesEnum.TRACK,
        Number(track.id),
        track.liked
    );

    const trackObject: TrackLikeInterface = {
        id: track.id,
        albumId: String(track.albums[0].id)
    };

    if (track.liked) {
        userStore.addTrackToLikes(trackObject);
    } else {
        userStore.removeTrackFromLikes(trackObject);
    }
}

</script>

<style scoped>
.scroller {
    height: 100%;
    margin-top: 20px;
}

.scroller-before, .track {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 40px 40px 40fr 16fr 45px 45px;
}

.withOutImage.track, .withOutImage.scroller-before {
    grid-template-columns: 40px 40fr 16fr 45px 45px;
}

.track {
    position: relative;
}

.track-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
}

.scroller-before {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    color: #8E929C;
    text-align: left;
    margin-bottom: 15px;
}

.withOutImage > .image-th, .withOutImage > .image {
    display: none;
}

.scroller-before-number {
    text-align: center;
}

.scroller-before-name {
    margin-left: 20px;
}

.scroller-before i {
    text-align: center;
}

.track, .track-template {
    height: 50px;
    padding: 5px 0;
    font-size: 14px;
    cursor: pointer;
}

.track:hover .like {
    opacity: 1;
    transition: 0.2s;
}

.like {
    opacity: 0;
    transition: 0.2s;
}

.track-template {
    cursor: default;
}

.index {
    width: 100%;
    position: relative;
}

.index i {
    display: none;
    font-size: 10px;
}

.index span, .index i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: right;
}

.track:hover .index i {
    display: block;
}

.track:hover .index span {
    display: none;
}

.track:hover {
    background: #1E222D;
}

.image {
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    z-index: 20;
}

.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    overflow: hidden;
    padding-right: 10px;
}

.title-body {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.title-text {
    font-size: 15px;
    line-height: 15px;
    width: max-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.title-artists {
    font-size: 12px;
    color: #8E929C;
    width: max-content;
    z-index: 20;
}

.albums {
    transition: 0.2s;
    color: #8E929C;
    z-index: 20;
}

.track:hover .albums {
    transition: 0.2s;
    color: white;
}

.duration {
    font-size: 12px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 20;
}

</style>
