<template>
<!--    <LoginWindow v-if="pageIndex === 0"/>-->
<!--    <LoadingWindow v-else-if="pageIndex === 1"/>-->
    <MainWindow/>
<!--    <div v-else>-->
<!--        Что то пошло не так-->
<!--    </div>-->
</template>

<script>
import MusicApi from './mixins/MusicApi';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import MainWindow from './windows/MainWindow.vue';
// import LoadingWindow from './windows/LoadingWindow.vue';
import { mapGetters } from 'vuex';
// import LoginWindow from './windows/LoginWindow.vue';
import axios from 'axios';


const {ipcRenderer} = require('electron');
export default {
    name: 'App',
    components: {MainWindow},
    mixins: [MusicApi],
    data() {
        return {
            isLoaded: false,
        };
    },
    computed: {
        ...mapGetters(['pageIndex']),
    },
    watch: {
        '$store.state.chart': {
            deep: true,
            handler(value) {
                if (Object.keys(value.all).length)
                    this.$store.dispatch('setLoaded', true);
            }
        },
        '$store.state.page.loaded': {
            deep: true,
            handler(value) {
                if (value)
                    ipcRenderer.send('loaded');
                else
                    ipcRenderer.send('loading');
            }
        },
        '$store.state.page.authorized': {
            handler(value) {
                if (value)
                    this.$axios = axios.create({
                        baseURL: 'https://api.music.yandex.net',
                        headers: {
                            'Authorization': 'OAuth AQAAAABevSUfAAG8Xrt2CZAbxEvSnyBU4FXXcSY',
                            'Accept-Language': 'ru',
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                    });
            }
        }
    },
    async mounted() {
        ipcRenderer.send('loading');
        registerRoute(
            // Cache image files.
            /\.(?:png|jpg|jpeg|svg|gif)$/,
            // Use the cache if it's available.
            new CacheFirst({
                // Use a custom cache name.
                cacheName: 'image-cache',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 100,
                        maxAgeSeconds: 24 * 60 * 60,
                    })
                ],
            })
        );

        this.$store.dispatch('setUser', await this.getAccountInfo());
        this.$store.dispatch('setPlaylists', await this.getPlaylists());
        this.$store.dispatch('setNewReleases', await this.getNewReleases());
        this.$store.dispatch('setHitsPlaylists', await this.getHitsPlaylists());
        this.$store.dispatch('setChart', await this.getChart());
    }
};
</script>

<style>
@import url('./assets/css/reset.css');
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {
    --background: #151a22;
    --main-color: #F7F096;
    --main-color-transperent: rgba(247, 240, 150, 0.03);
    --volume-width: 0px;
}

* {
    font-family: 'Rubik', sans-serif;
    box-sizing: border-box;
}

html, body, #app {
    width: 100%;
    height: 100%;
}

body {
    background: var(--background);
    overflow: hidden;
}

button, input, a {
    -webkit-app-region: no-drag;
    outline: none;
    border: none;
    text-decoration: none;
}

a {
    color: white;
    cursor: pointer;
}

button, a {
    cursor: pointer;
}

.template {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.content {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.main {
    padding: 45px 54px 180px 54px;
    background: rgba(30, 34, 45, 0.7);
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-app-region: no-drag;
    color: white;
    border-radius: 8px 0px;
}

.main-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 45px;
}

.main-container-title {
    font-weight: 500;
    font-size: 25px;
    margin-bottom: 20px;
    line-height: 20px;
}

.main-container-subtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #8E929C;
}

.btn {
    color: var(--main-color);
    border-radius: 999px;
    padding: 7px 25px;
    background: none;
    border: 2px solid var(--main-color);
    font-size: 14px;
    transition: 0.2s;
}

.btn:hover {
    background: var(--main-color);
    color: black;
    transition: 0.2s;
}

*::-webkit-scrollbar {
    background: none;
    width: 4px;
}

*::-webkit-scrollbar-track {
    background: none;
}

*::-webkit-scrollbar-thumb {
    background-color: var(--main-color);
    border-radius: 10px;
}

</style>
