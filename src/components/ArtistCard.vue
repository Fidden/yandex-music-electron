<template>
    <RouterLink
        :to="{name: 'artist', params: {id: artist.id}}"
        class="artist-card">
        <img
            :alt="artist.name"
            :src="GetImage(artist.cover.uri, '200x200')"
            class="card-image">
        <h4>{{ artist.name }}</h4>
        <p class="tracks-count">
            {{ artist.counts.tracks }} Треков
        </p>
    </RouterLink>
</template>

<script>
import GetImage from '../mixins/GetImage.js';

export default {
    name: 'ArtistCard',
    mixins: [GetImage],
    props: {
        artist: {
            type: Object,
            required: true,
        }
    },
};
</script>

<style scoped>
.artist-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 7px 0;
}

.card-image {
    border-radius: 50%;
    object-fit: cover;
}

.tracks-count {
    font-weight: 400;
    font-size: 12px;
}

</style>
