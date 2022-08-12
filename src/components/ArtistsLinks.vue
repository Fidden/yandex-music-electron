<template>
    <p
        v-if="artists.length"
        class="container">
        <RouterLink
            v-for="(artist, index) in artists"
            :key="artist.id"
            :to="{name: 'artist', params: {id: artist.id}}">
            {{ useArtistName(artist, index, artists.length) }}
        </RouterLink>
    </p>
</template>

<script lang="ts" setup>
import useArtistName from '@/composables/useArtistName';
import { defineProps } from 'vue';
import TrackArtistInterface from '@/interfaces/TrackArtistInterface';
import ArtistInterface from '@/interfaces/ArtistInterface';

defineProps<{
    artists: Array<ArtistInterface> | Array<TrackArtistInterface>;
}>();
</script>

<style scoped>
.container {
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    margin: auto 0;
}

a {
    font-size: inherit;
    color: inherit;
}

a:hover {
    text-decoration: underline;
}
</style>
