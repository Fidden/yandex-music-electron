<template>
  <RouterLink :to="{name: 'tracks', params: {id: this.id}}" class="album-card" v-if="album">
    <img :src="getImage(album.ogImage, '150x150')" :alt="album.title" v-if="album.ogImage">
    <h3 class="title">{{ album.title }}</h3>
    <p class="author" v-if="album.artists">{{ getArtist(album.artists) }}</p>

    <p class="type">{{ album.type }}</p>
    <p class="year">{{ album.year }}</p>
  </RouterLink>
</template>

<script>
import getImage from "../mixins/getImage";
import MusicApi from "../mixins/MusicApi";
import GetArtists from "../mixins/GetArtists";

export default {
  name: "ItemColCard",
  mixins: [getImage, MusicApi, GetArtists],
  data() {
    return {
      album: {}
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    }
  },
  async mounted() {
    this.album = await this.getAlbumsInfo(this.id);
  }
}
</script>

<style scoped>
.album-card {
  background: #292C3B;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.album-card img {
  margin-bottom: 12px;
}

.title {
  font-weight: 500;
  font-size: 12.8px;
  line-height: 16px;
}

.author {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #8E929C;
  margin-bottom: 20px;
}

.type {
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #8E929C;
}

.year {
  right: 10px;
  bottom: 10px;
  position: absolute;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #8E929C;
}

</style>
