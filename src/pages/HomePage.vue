<template>
    <main class="main">
        <PlaylistsSmall v-once/>
        <PersonalPlaylists v-once/>
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
import TheRecentPlayed from '@/components/TheRecentPlayed.vue';
import PersonalPlaylists from '@/pages/PersonalPlaylists.vue';
</script>

<style>

</style>
