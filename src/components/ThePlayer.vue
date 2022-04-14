<template>
    <div
        v-show="currentTrack"
        class="player-container">
        <div class="player-seek-slider">
            <p class="start-time">
                {{ convertToTime(time) }}
            </p>

            <div class="player-seek-slider-body">
                <div
                    class="seek-slider-selected"
                    :style="{width: getSliderWidth}">
                    <div class="seek-slider-circle">
                        <div class="seek-slider-circle-inside"/>
                    </div>
                </div>
                <div
                    class="seek-container"
                    @click="seek"/>
            </div>

            <p class="end-time">
                {{ convertToTime(duration) }}
            </p>
        </div>
        <div class="player-body">
            <audio
                ref="audioFile"
                preload="auto"
                style="display: none"
                @timeupdate="update"
                @loadeddata="load"
                @buffered="update"
                @pause="setPlayingState(false)"
                @play="setPlayingState(true)"
            />

            <div
                v-if="currentTrack"
                class="player-track-info">
                <img
                    :src="getImage(currentTrack.track.ogImage)"
                    alt="img"
                    class="player-track-image">
                <h5>
                    {{ currentTrack.track.title }}<br>
                    <span>{{ getArtist(currentTrack.track.artists) }}</span>
                </h5>
            </div>

            <button class="like control-btn">
                <i class="fal fa-heart"/>
            </button>

            <div class="player-body-controls">
                <button
                    class="control-btn"
                    @click="shuffleTracks">
                    <i
                        class="fal fa-random"
                        :class="{'active': shuffle}"/>
                </button>
                <button
                    class="control-btn"
                    @click="prev">
                    <i class="fal fa-step-backward"/>
                </button>
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
                <button
                    class="control-btn"
                    @click="next">
                    <i class="fal fa-step-forward"/>
                </button>
                <button class="control-btn">
                    <i class="fal fa-repeat"/>
                </button>
                <div class="volume-container">
                    <button class="control-btn">
                        <i class="fal fa-volume"/>
                    </button>

                    <div class="volume-slider">
                        <div class="volume-slider-selected" :style="{width: getVolumeSliderWidth}">
                            <div class="volume-slider-selected-circle">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MusicApi from '../mixins/MusicApi';
import GetArtists from '../mixins/GetArtists';
import getImage from '../mixins/getImage';

export default {
    name: 'ThePlayer',
    mixins: [MusicApi, GetArtists, getImage],
    data() {
        return {
            player: null,
            time: 0,
            duration: 0,
            buffered: 0,
            playing: false,
            volume: 0,
            loaded: false,
            src: null,
        };
    },
    computed: {
        getSliderWidth() {
            return `${(this.time / this.duration) * 100}%`;
        },
        getVolumeSliderWidth() {
            return `${this.volume / 10}%`;
        },
        currentTrack() {
            return this.$store.state.track.queue[this.shuffle
                ? Math.round(Math.random() * this.$store.state.track.queue.length - 1)
                : 0];
        },
        shuffle() {
            return this.$store.state.player.shuffle;
        }
    },
    watch: {
        playing(value) {
            if (value)
                return this.player.play();

            this.player.pause();
        },
        volume() {
            this.player.volume = this.volume / 100;
        },
        '$store.state.track.queue': {
            deep: true,
            async handler() {
                if (!this.currentTrack)
                    return;

                await this.player.pause();
                this.player.current = 0;
                this.player.src = await this.getTrackDirectLink(this.currentTrack.id);
                await this.player.play();
            }
        },
        async time(value) {
            if (value >= this.duration)
                await this.next();
        }
    },
    mounted() {
        this.player = this.$refs.audioFile;
    },
    methods: {
        play() {
            this.player.play();
            this.playing = true;
        },
        pause() {
            this.player.pause();
            this.playing = false;
        },
        next() {
            this.pause();
            this.$store.dispatch('addToPlayed', this.currentTrack);
            this.$store.dispatch('removeFromQueue', this.currentTrack);
        },
        prev() {
            if (this.time > 3) {
                this.player.currentTime = 0;
            } else {
                this.player.pause();
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
        convertToTime(value) {
            const time = new Date(value * 1000).toISOString().substr(11, 8);
            return time.indexOf('00:') === 0 ? time.substr(3) : time;
        },
        setPlayingState(value = null) {
            this.playing = value === null ? !this.playing : value;
        },
        seek(e) {
            if (!this.loaded)
                return;

            const el = e.target.getBoundingClientRect();
            const seekPos = (e.clientX - el.left) / el.width;
            this.player.currentTime = (this.player.duration * seekPos);
        },
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

.player-seek-slider-body {
    background: #9FA0A2;
    border-radius: 42px;
    flex: 1;
    height: 6px;
    margin: 0 14px;
    display: flex;
    flex-direction: row;
    position: relative;
}

.seek-slider-selected {
    background: var(--main-color);
    border-radius: 42px;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    transition: width 0.2s linear, left 0.2s linear;
}

.seek-slider-circle {
    width: 20px;
    height: 20px;
    background: #434343;
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.seek-slider-circle-inside {
    background: var(--main-color);
    border-radius: 50px;
    width: 14px;
    height: 14px;
    margin: auto;
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
}

.player-track-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 17px;
}

.player-track-info h5 {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    color: white;
}

.player-track-info h5 span {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8E919A;
}

.player-body-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 35px;
    margin: 0 auto;
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
}

.volume-slider {
    width: 100px;
    height: 6px;
    background: #9FA0A2;
    border-radius: 42px;
    position: relative;
}

.volume-slider-selected {
    background: var(--main-color);
    border-radius: 42px;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    transition: width 0.2s linear, left 0.2s linear;
}

</style>
