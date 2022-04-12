<template>
  <main class="main">
    <div class="item-head">
      <img v-if="item.ogImage" :src="getImage(item.ogImage, '200x200')" alt="">
      <div class="item-info">
        <h2>{{ item.title }}</h2>
        <h3 v-if="item.artists">{{ getArtist(item.artists) }}</h3>
        <h4>{{ item.year }} - {{ item.type }}</h4>
        <div class="item-controls">
          <button>Слушать</button>
          <button>Нравится</button>
          <button>Скачать</button>
        </div>
      </div>
    </div>
    <div class="item-body" v-if="item.volumes">
      <div class="item-body-block" v-for="(volume, index) in item.volumes[0]" :key="volume.id">
        {{ index + 1 }}
        {{ volume.title }}

        <span v-if="volume.version">
          ({{ volume.version }})
        </span>
        <span>{{ getDuration(volume.durationMs) }}</span>
      </div>
    </div>
  </main>
</template>

<script>
import MusicApi from "../mixins/MusicApi";
import GetArtists from "../mixins/GetArtists";
import getImage from "../mixins/getImage";

export default {
  name: "ItemTracksPage",
  mixins: [MusicApi, GetArtists, getImage],
  data() {
    return {
      item: {}
    }
  },
  methods: {
    getDuration(milliseconds) {
      const date = new Date(milliseconds);
      return `${date.getMinutes()}:${date.getSeconds() < 10
          ? `0${date.getSeconds()}`
          : date.getSeconds()}`;
    }
  },
  async mounted() {
    this.item = await this.getAlbumsInfo(this.$route.params.id, true);
    console.log(this.item.volumes[0])
  }
}
</script>

<style scoped>
.item-head {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.item-head img {
  width: 220px;
  height: 220px;
  margin-right: 20px;
  border-radius: 6px;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

</style>