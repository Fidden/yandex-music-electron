<template>
    <main class="main">
        <PlaylistsSmall v-once/>
        <NewReleases v-once/>
        <HitsPlaylists v-once/>
        <TheChart v-once/>
        <TheRecentPlayed v-once/>
    </main>
</template>

<script lang="ts" setup>
import PlaylistsSmall from '@/components/PlaylistsSmall.vue';
import NewReleases from '@/components/NewReleases.vue';
import HitsPlaylists from '@/components/HitsPlaylists.vue';
import TheChart from '@/components/TheChart.vue';
import { defineAsyncComponent } from 'vue';

const TheRecentPlayed = defineAsyncComponent(() => import('@/components/TheRecentPlayed.vue'));

</script>

<style>

</style>
