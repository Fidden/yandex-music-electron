<template>
    <Transition>
        <div
            v-show="currentTrack"
            class="player-container">
            <div class="player-seek-slider">
                <p class="start-time">
                    {{ convertTime(player.time) }}
                </p>

                <RangeSlider
                    :max-value="player.duration"
                    :step="0.01"
                    :value="player.time"
                    @change="setTime"/>

                <p class="end-time">
                    {{ convertTime(player.duration) }}
                </p>
            </div>
            <div class="player-body">
                <audio
                    ref="audio"
                    autoplay
                    preload="auto"
                    style="display: none"
                    @buffered="update"
                    @loadeddata="load"
                    @pause="pause"
                    @play="play"
                    @timeupdate="update"
                />
                <div
                    v-if="currentTrack"
                    class="player-track-info">
                    <img
                        v-lazy="useImage(currentTrack.ogImage || currentTrack.coverUri, 100, 100)"
                        alt="img"
                        class="player-track-image">
                    <div class="player-track-text">
                        <p
                            class="player-track-title"
                        >
                            {{ currentTrack.title }}
                        </p>
                        <div
                            v-memo="[currentTrack.artists]"
                            class="player-track-artist"
                        >
                            <ArtistsLinks
                                :artists="currentTrack.artists"
                                style="font-size: 12px"
                            />
                        </div>
                    </div>
                </div>

                <BaseLikeButton
                    class="control-btn"
                    :liked="currentTrack?.liked"
                    @click="() => like()"/>

                <div class="player-body-controls">
                    <button
                        v-if="!playerStore.isStation"
                        class="control-btn"
                        @click="shuffle"
                    >
                        <i
                            :class="{'active': playerStore.shuffle}"
                            class="fal fa-random"/>
                    </button>
                    <button
                        v-else
                        class="control-btn"
                    >
                        <i class="far fa-sliders-h"/>
                    </button>

                    <button
                        v-if="!playerStore.isStation"
                        class="control-btn"
                        @click="prev"
                    >
                        <i class="fal fa-step-backward"/>
                    </button>
                    <BaseLoadingSpinner v-if="!player.loaded"/>
                    <div v-else>
                        <button
                            v-if="player.playing"
                            class="control-btn"
                            @click="pause"
                        >
                            <i class="fas fa-pause"/>
                        </button>
                        <button
                            v-else
                            class="control-btn"
                            @click="play"
                        >
                            <i class="fas fa-play"/>
                        </button>
                    </div>

                    <button
                        class="control-btn"
                        @click="() => next()">
                        <i class="fal fa-step-forward"/>
                    </button>
                    <button
                        class="control-btn"
                        @click="repeat"
                    >
                        <i
                            :class="repeatIcon"
                            class="fal"/>
                    </button>
                </div>
                <div class="volume-container">
                    <button
                        v-if="player.volume > 0"
                        class="control-btn"
                        @click="mute">
                        <i
                            :class="volumeIcon"
                            class="fal"/>
                    </button>
                    <button
                        v-else
                        class="control-btn"
                        @click="unMute">
                        <i class="fal fa-volume-mute"/>
                    </button>

                    <RangeSlider
                        :max-value="100"
                        :value="player.volume"
                        @change="setVolume"
                    />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, Ref, watch } from 'vue';
import { usePlayerStore } from '@/store/player';
import { useQueueStore } from '@/store/queue';
import useImage from '@/composables/useImage';
import RangeSlider from '@/components/RangeSlider.vue';
import ArtistsLinks from '@/components/ArtistsLinks.vue';
import BaseLoadingSpinner from '@/components/BaseLoadingSpinner.vue';
import useTrackDirectLink from '@/composables/useTrackDirectLink';
import { useRpcStore } from '@/store/rpc';
import useSendStationFeedback from '@/composables/useSendStationFeedback';
import { StationFeedbackTypeEnum } from '@/enums/StationFeedbackTypeEnum';
import useStationTrack from '@/composables/useStationTracks';
import TrackInterface from '@/interfaces/TrackInterface';
import { useUserStore } from '@/store/user';
import useLikeAction from '@/composables/useLikeAction';
import { LikesObjectTypesEnum } from '@/enums/LikesObjectTypesEnum';
import TrackLikeInterface from '@/interfaces/TrackLikeInterface';
import BaseLikeButton from '@/components/BaseLikeButton.vue';

const queueStore = useQueueStore();
const playerStore = usePlayerStore();
const rpcStore = useRpcStore();
const userStore = useUserStore();

const audio: Ref<HTMLAudioElement | null> = ref(null);
const player = ref({
    player: null,
    time: 0,
    duration: 0,
    buffered: 0,
    playing: false,
    volume: playerStore.getVolume,
    loaded: false,
    volumeBackup: 0
});

const currentTrack = computed(() => {
    if (!queueStore.queue.length) {
        return null;
    }

    const randIndex = Math.floor(Math.random() * (queueStore.queue.length - 1));

    const track = queueStore.queue[playerStore.shuffle >= 2 ? randIndex : 0];
    playerStore.setTrackIndex(Number(track.id));

    track.liked = userStore.likes.tracks.findIndex(item => item.id === track.id) !== -1;

    rpcStore.setRpc({
        name: track.title,
        artists: track.artists.map(item => item.name).toString(),
        image: useImage(track.ogImage, 200, 200)
    });

    setMediaData(track);

    if (playerStore.shuffle === 1) {
        playerStore.incrementShuffle();
    } else if (playerStore.shuffle >= 3) {
        playerStore.resetShuffle();
    }

    return track;
});

onMounted(() => {
    if (audio.value) {
        audio.value.volume = player.value.volume * 0.01;
    }

    navigator.mediaSession.setActionHandler('previoustrack', () => {
        prev();
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
        next();
    });
});

watch(currentTrack, async (value) => {
    if (!value || !audio.value) {
        return;
    }

    player.value.loaded = false;

    const trackDirectLink = await useTrackDirectLink(Number(value.id));

    audio.value.pause();
    audio.value.currentTime = 0;
    audio.value.src = trackDirectLink;
});

watch(player, async (value) => {
    if (!audio.value) {
        return;
    }

    playerStore.setPlaying(value.playing);

    // Устанавливаем громкость
    audio.value.volume = value.volume * 0.01;
    playerStore.setVolume(value.volume);

    // Переключаем трек если время пришло
    if (value.time >= value.duration && (value.time !== 0 && value.duration !== 0)) {
        player.value.time = 0;
        player.value.duration = 0;
        await next(false);
    }
}, { deep: true });

async function like() {
    if (!currentTrack.value) {
        return;
    }

    currentTrack.value.liked = await useLikeAction(
        LikesObjectTypesEnum.TRACK,
        Number(currentTrack.value.id),
        currentTrack.value?.liked
    );

    const trackObject: TrackLikeInterface = {
        id: currentTrack.value.id,
        albumId: String(currentTrack.value.albums[0].id)
    };

    if (currentTrack.value.liked) {
        userStore.addTrackToLikes(trackObject);
    } else {
        userStore.removeTrackFromLikes(trackObject);
    }
}

async function next(skip = true) {
    if (!currentTrack.value) {
        return;
    }

    if (playerStore.repeat > 0) {
        if (playerStore.repeat === 1) {
            playerStore.resetRepeat();
        }

        if (audio.value) {
            audio.value.currentTime = 0;
        }

        return;
    }

    queueStore.addToPlayed(currentTrack.value);
    queueStore.removeFromQueue(currentTrack.value);

    if (playerStore.isStation) {
        await useSendStationFeedback(
            skip ? StationFeedbackTypeEnum.SKIP : StationFeedbackTypeEnum.TRACK_FINISHED,
            true,
            player.value.time,
            Number(currentTrack.value.id)
        );

        await loadNewStationTracks();

        await useSendStationFeedback(
            StationFeedbackTypeEnum.TRACK_STARTED,
            true,
            null,
            Number(currentTrack.value.id)
        );
    }
}

async function loadNewStationTracks() {
    let newQueue = {} as TrackInterface;
    if (queueStore.queue.length) {
        newQueue = queueStore.queue[0];
        queueStore.setQueue([newQueue]);
    }

    let tracks = await useStationTrack(true,
        Number(queueStore.played[queueStore.played.length - 1].id));

    if (queueStore.queue.length) {
        tracks = tracks.filter(item => item.id !== newQueue.id);
    }

    queueStore.addToQueue(tracks);
}

async function prev() {
    if (!audio.value) {
        return;
    }

    if (player.value.time > 3) {
        audio.value.currentTime = 0;
    } else {
        player.value.loaded = false;
        await pause();
        const prevTrack = queueStore.played.pop();
        if (prevTrack) {
            queueStore.unshiftToQueue(prevTrack);
        }
    }
}

function update() {
    if (!audio.value) {
        return;
    }

    player.value.time = audio.value.currentTime;
    player.value.buffered = audio.value.buffered.length ? audio.value.buffered.end(0) : 0;
}

async function load() {
    if (!audio.value || audio.value.readyState < 2) {
        throw new Error('Failed to load sound file.');
    }

    player.value.loaded = true;
    player.value.duration = audio.value.duration;
    return await play();
}

async function pause() {
    if (audio.value) {
        player.value.playing = false;
        await audio.value.pause();
    }
}

async function play() {
    if (audio.value) {
        await audio.value.play();
        player.value.playing = true;
    }
}

function shuffle() {
    playerStore.setShuffle(playerStore.shuffle > 0 ? 0 : 1);
}

function convertTime(value: number) {
    const time = new Date(value * 1000).toISOString().substr(11, 8);
    return time.indexOf('00:') === 0 ? time.substr(3) : time;
}

function setVolume(volume: number) {
    player.value.volume = volume;
}

function setTime(time: number) {
    if (audio.value) {
        audio.value.currentTime = time;
    }
}

function mute() {
    player.value.volumeBackup = player.value.volume;
    player.value.volume = 0;
}

function unMute() {
    player.value.volume = player.value.volumeBackup;
}

function repeat() {
    if (playerStore.repeat < 2) {
        playerStore.incrementRepeat();
    } else {
        playerStore.setRepeat(0);
    }
}

const volumeIcon = computed(() => {
    if (player.value.volume === 0) {
        return 'fa-volume-off';
    } else if (player.value.volume <= 25) {
        return 'fa-volume-down';
    } else if (player.value.volume >= 75) {
        return 'fa-volume-up';
    } else {
        return 'fa-volume';
    }
});

const repeatIcon = computed(() => {
    switch (playerStore.repeat) {
    case 1:
        return 'fa-repeat active';
    case 2:
        return 'fa-repeat-1 active';
    default:
        return 'fa-repeat';
    }
});

function setMediaData(track: TrackInterface) {
    // eslint-disable-next-line no-undef
    navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artists.map(item => item.name).toString(),
        album: track.albums.map(item => item.title).toString(),
        artwork: [
            {
                src: useImage(track.ogImage, 200, 200),
                sizes: '200x200',
                type: 'image/png'
            }
        ]
    });
}
</script>

<style scoped>
.player-container {
    background: #242833;
    display: flex;
    flex-direction: column;
    padding: 8px;
    border-radius: 6px;
    position: fixed;
    left: 68px;
    bottom: 8px;
    width: calc(100% - 76px);
    -webkit-app-region: no-drag;
    z-index: 20;
}

.player-seek-slider {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
}

.start-time, .end-time {
    font-weight: 400;
    font-size: 10px;
    line-height: 16px;
    color: #D8DBE4;
    width: 30px;
}

.start-time {
    margin-right: 5px;
}

.end-time {
    margin-left: 5px;
}

.player-body {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
}

.control-btn {
    color: #C4C4C4;
    background: none;
}

.player-track-image {
    width: 42px;
    height: 42px;
    border-radius: 4px;
    margin-right: 10px;
    z-index: 100;
}

.player-track-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 17px;
    width: 200px;
    overflow: hidden;
}

.player-track-text {
    display: flex;
    flex-direction: column;
}

.player-track-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    color: white;
    overflow-x: scroll;
    width: 145px;
    white-space: nowrap;
}

.player-track-title::-webkit-scrollbar {
    display: none;
}

.player-track-artist {
    color: #8E919A;
    white-space: nowrap;
}

.player-body-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 35px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 69%;
    transform: translate(-50%, -50%);
}

.active {
    color: var(--main-color);
}

.volume-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
}

.v-enter-active,
.v-leave-active {
    transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateY(120%);
}

</style>
