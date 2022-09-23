<template>
    <RouterLink
        :to="{name: 'artist', params: {id: artist.id}}"
        class="artist-card"
    >
        <img
            v-if="artist?.cover?.uri"
            v-lazy="useImage(artist?.cover?.uri, 200, 200)"
            :alt="artist.name"
            class="card-image">
        <img
            v-else
            src="../../assets/img/artist-placeholder.svg"
            alt="placeholder"
            class="card-image"
        >
        <h4>{{ artist.name }}</h4>
        <p
            v-if="artist?.counts?.tracks"
            class="tracks-count">
            {{ artist?.counts?.tracks }} Треков
        </p>
    </RouterLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import useImage from '@/composables/useImage';
import { SearchArtistInterface } from '@/interfaces/SearchArtistInterface';

defineProps<{
    artist: SearchArtistInterface;
}>();

</script>

<style scoped>
.artist-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.card-image {
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
}

.tracks-count {
    font-weight: 400;
    font-size: 12px;
}

h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 7px;
}
</style>
