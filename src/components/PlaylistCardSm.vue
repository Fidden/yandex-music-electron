<template>
    <RouterLink to="" class="playlist-block">
        <img :src="getImage(playlist.ogImage)" :alt="playlist.title">
        <h4>{{ playlist.title }}</h4>
    </RouterLink>
</template>

<script>
import getImage from "../mixins/getImage";

export default {
    name: "PlaylistCardSm",
    mixins: [getImage],
    props: {
        playlist: {
            required: true,
            type: Object,
        }
    },
}
</script>

<style scoped>
.playlist-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 56px;
    overflow: hidden;
    padding: 3px;
    border-radius: 4px;
    background: #292D39;
    -webkit-app-region: no-drag;
    cursor: pointer;
}

.playlist-block img {
    width: 50px;
    height: 50px;
    margin-right: 24px;
}

.playlist-block h4 {
    font-weight: 500;
    font-size: 14px;
}

</style>
