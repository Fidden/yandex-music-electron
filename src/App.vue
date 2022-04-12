<template>
  <div class="template">
    <TheHeader/>
    <div class="content">
      <TheBar/>
      <router-view></router-view>
      <ThePlayer/>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheBar from "./components/TheBar";
import ThePlayer from "./components/ThePlayer";
import MusicApi from "./mixins/MusicApi";

export default {
  name: 'App',
  components: {TheBar, TheHeader, ThePlayer},
  mixins: [MusicApi],
  async mounted() {
    this.$store.dispatch('setUser', await this.getAccountInfo());
    this.$store.dispatch('setPlaylists', await this.getPlaylists());
    this.$store.dispatch('setNewReleases', await this.getNewReleases());
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
  padding: 45px 54px 150px 54px;
  background: var(--main-color-transperent);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-app-region: no-drag;
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
