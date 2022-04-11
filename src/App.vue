<template>
    <div class="template">
        <TheHeader/>
        <div class="content">
            <TheBar/>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheBar from "./components/TheBar";

export default {
    name: 'App',
    components: {TheBar, TheHeader},
    methods: {
        async getAccountInfo() {
            let res = await this.$request.get('account/status');
            this.$store.dispatch('setUser', res.data.result);
        },
        async getPlaylists() {
            let res = await this.$request.get(`users/${this.$store.state.user.account.uid}/playlists/list/`);
            this.$store.dispatch('setPlaylists', res.data.result);
        },
        async getNewReleases() {
            let res = await this.$request.get(`/landing3/new-releases`);
            this.$store.dispatch('setNewReleases', res.data.result.newReleases);
        }
    },
    async mounted() {
        await this.getAccountInfo();
        await this.getPlaylists();
        await this.getNewReleases();
    }
}
</script>

<style>
@import url('./assets/css/reset.css');
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {
    --background: #151a22;
    --main-color: #F7F096;
    --main-color-transperent: rgba(247, 240, 150, 0.03);
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

button, input {
    -webkit-app-region: no-drag;
    outline: none;
    border: none;
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

main {
    color: white;
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
