<template>
    <div class="hello">
        <audio
            ref="audioFile"
            preload="auto"
            style="display: none"
            @timeupdate="update"
            @loadeddata="load"
            @buffered="update"
            @pause="setPlayingState(false)"
            @play="setPlayingState(true)"
        >
            <source src="../assets/audio.mp3">
        </audio>
        <button @click="play">
            Play
        </button>
        <button @click="stop">
            Stop
        </button>
        <p v-if="player">
            {{ convertToTime(currentSeconds) }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            player: null,
            currentSeconds: 0,
            buffered: 0,
            playing: false,
            volume: 0,
        };
    },
    watch: {
        playing(value) {
            if (value)
                return this.player.play();

            this.player.pause();
        },
        volume() {
            this.player.volume = this.volume / 100;
        }
    },
    mounted() {
        this.player = this.$refs.audioFile;
    },
    methods: {
        play() {
            this.player.play();
        },
        stop() {
            this.player.pause();
        },
        update() {
            this.currentSeconds = this.player.currentTime;
            this.buffered = this.player.buffered.end(0);
        },
        load() {
            if (this.player.readyState >= 2) {
                this.loaded = true;
                this.durationSeconds = parseInt(this.player.duration);
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
        }
    }
};
</script>

<style scoped>

</style>
