<template>
    <div
        v-show="currentTrack"
        class="player-container">
        <div class="player-seek-slider">
            <p class="start-time">
                {{ convertToTime(time) }}
            </p>

            <RangeSlider
                :max-value="duration"
                :step="0.01"
                :value="time"
                @change="setTime"/>

            <p class="end-time">
                {{ convertToTime(duration) }}
            </p>
        </div>
        <div class="player-body">
            <audio
                ref="audioFile"
                autoplay
                crossorigin
                preload="auto"
                style="display: none"
                @buffered="update"
                @loadeddata="load"
                @pause="setPlayingState(false)"
                @play="setPlayingState(true)"
                @timeupdate="update"
            />
            <!--todo: сделать вывод саб заголовка ( Remix, MIX Instr. etc ) -->
            <div
                v-if="currentTrack"
                class="player-track-info">
                <img
                    :src="GetImage(currentTrack.track.ogImage)"
                    alt="img"
                    class="player-track-image">
                <div class="player-track-text">
                    <a
                        class="player-track-title"
                        href="#">
                        {{ currentTrack.track.title }}
                    </a>
                    <a
                        class="player-track-artist"
                        href="#">
                        {{ getArtist(currentTrack.track.artists) }}
                    </a>
                </div>
            </div>

            <button class="like control-btn">
                <i class="fal fa-heart"/>
            </button>

            <div class="player-body-controls">
                <button
                    class="control-btn"
                    @click="shuffleTracks">
                    <i
                        :class="{'active': shuffle}"
                        class="fal fa-random"/>
                </button>
                <button
                    class="control-btn"
                    @click="prev">
                    <i class="fal fa-step-backward"/>
                </button>
                <LoadingSpinner v-if="!loaded"/>
                <div v-else>
                    <button
                        v-if="playing"
                        class="control-btn"
                        @click="pause">
                        <i class="fas fa-pause"/>
                    </button>
                    <button
                        v-else
                        class="control-btn"
                        @click="play">
                        <i class="fas fa-play"/>
                    </button>
                </div>

                <button
                    class="control-btn"
                    @click="next">
                    <i class="fal fa-step-forward"/>
                </button>
                <button class="control-btn">
                    <i class="fal fa-repeat"/>
                </button>
            </div>
            <div class="volume-container">
                <button
                    v-if="volume > 0"
                    class="control-btn"
                    @click="mute">
                    <i class="fal fa-volume"/>
                </button>
                <button
                    v-else
                    class="control-btn"
                    @click="unmute">
                    <i class="fal fa-volume-mute"/>
                </button>

                <RangeSlider
                    :max-value="100"
                    :value="volume"
                    @change="setVolume"
                />
            </div>
        </div>
    </div>
</template>

<script>
import MusicApi from '../mixins/MusicApi';
import GetArtists from '../mixins/GetArtists';
import GetImage from '../mixins/GetImage.js';
import RangeSlider from './RangeSlider.vue';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
    name: 'ThePlayer',
    components: {LoadingSpinner, RangeSlider},
    mixins: [MusicApi, GetArtists, GetImage],
    data() {
        return {
            player: null,
            time: 0,
            duration: 0,
            buffered: 0,
            playing: false,
            volume: 20,
            loaded: false,
            playPromise: undefined,
            volumeBackup: 0,
        };
    },
    computed: {
        currentTrack() {
            if (!this.$store.state.track.queue.length)
                return null;

            let randIndex = Math.floor(
                Math.random() * (this.$store.state.track.queue.length - 1));

            let track = this.$store.state.track.queue[this.shuffle
                ? randIndex
                : 0];

            this.$store.dispatch('setTrackIndex', track.track.id);

            return track;
        },
        shuffle() {
            return this.$store.state.player.shuffle;
        }
    },
    watch: {
        playing(value) {
            this.$store.dispatch('setPlaying', value);

            if (value)
                return this.play();

            this.pause();
        },
        volume(value) {
            this.player.volume = value * 0.01;
        },
        '$store.state.track.queue': {
            deep: true,
            async handler() {
                if (!this.currentTrack)
                    return;

                await this.player.pause();
                {
                    this.player.currentTime = 0;
                    this.loaded = false;
                    this.player.src = await this.getTrackDirectLink(this.currentTrack.id || this.currentTrack.track.id);
                    await this.player.load();
                }
                await this.player.play();
            }
        },
        async time(value) {
            if (value >= this.duration) {
                await this.next(false);
            }
        }
    },
    mounted() {
        this.player = this.$refs.audioFile;
        this.player.volume = this.volume * 0.01;
    },
    methods: {
        play() {
            //https://developer.chrome.com/blog/play-request-was-interrupted/
            this.playPromise = this.player.play();
        },
        pause() {
            if (this.playPromise !== undefined) {
                this.playPromise.then(() => {
                    this.player.pause();
                });
            }
        },
        async next(skip = true) {
            this.pause();
            this.$store.dispatch('addToPlayed', this.currentTrack);
            this.$store.dispatch('removeFromQueue', this.currentTrack);

            if (this.$store.state.stations.isPlaying) {
                await this.sendStationFeedback(skip ? 'skip' : 'trackFinished',
                    this.player.currentTime,
                    this.$store.state.stations.current.batch_id,
                    `${this.currentTrack.track.id}:${this.currentTrack.track.albums[0].id}`,
                );

                await this.loadNewStationTracks();

                await this.sendStationFeedback('trackStarted',
                    null,
                    this.$store.state.stations.current.batch_id,
                    `${this.currentTrack.track.id}:${this.currentTrack.track.albums[0].id}`,
                );
            }

        },
        prev() {
            if (this.time > 3) {
                this.player.currentTime = 0;
            } else {
                this.pause();
                this.$store.dispatch('unshiftToQueue', this.$store.state.track.played.pop());
            }
        },
        shuffleTracks() {
            this.$store.dispatch('setShuffle', !this.shuffle);
        },
        update() {
            this.time = this.player.currentTime;
            this.buffered = this.player.buffered.length ? this.player.buffered.end(0) : 0;
        },
        load() {
            if (this.player.readyState >= 2) {
                this.loaded = true;
                this.duration = parseInt(this.player.duration);
                return this.playing;
            }
            throw new Error('Failed to load sound file.');
        },
        mute() {
            this.volumeBackup = this.volume;
            this.volume = 0;
        },
        unmute() {
            this.volume = this.volumeBackup;
        },
        convertToTime(value) {
            const time = new Date(value * 1000).toISOString().substr(11, 8);
            return time.indexOf('00:') === 0 ? time.substr(3) : time;
        },
        setPlayingState(value = null) {
            this.playing = value === null ? !this.playing : value;
        },
        setVolume(volume) {
            this.volume = volume;
        },
        setTime(time) {
            this.player.currentTime = time;
        },
        async loadNewStationTracks() {
            this.$store.dispatch('setQueue', []);
            let tracks = await this.getStationTracks(false, this.$store.state.track.played[this.$store.state.track.played.length - 1]);
            this.$store.dispatch('setQueue', tracks);
        }
    }
};
</script>

<style scoped>
.player-container {
    background: #242833;
    display: flex;
    flex-direction: column;
    padding: 8px;
    border-radius: 6px;
    overflow: hidden;
    position: fixed;
    left: 68px;
    bottom: 8px;
    width: calc(100% - 76px);
    -webkit-app-region: no-drag;
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
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: normal;
    overflow: hidden;
}

.player-track-artist {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E919A;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: normal;
    overflow: hidden;
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

.seek-container {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
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

</style>
