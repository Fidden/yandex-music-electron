<template>
    <LayoutItems :loaded="Object.keys(playlists).length > 0">
        <template #title>
            Плейлисты
        </template>
        <template #body>
            <PlaylistCard
                v-for="playlist in playlists"
                :key="playlist.uid"
                :playlist-kind="playlist.kind"
                :playlist-uid="playlist.uid"
            />
        </template>
    </LayoutItems>
</template>

<script lang="ts" setup>
import LayoutItems from '@/layouts/LayoutItems.vue';
import { onMounted, ref, Ref } from 'vue';
import PlaylistInterface from '@/interfaces/PlaylistInterface';
import useUserPlaylists from '@/composables/useUserPlaylists';
import useUserFavoritePlaylist from '@/composables/useUserFavoritePlaylist';
import PlaylistWithOutTracksInterface from '@/interfaces/PlaylistWithOutTracksInterface';
import PlaylistCard from '@/components/PlaylistCard.vue';

const playlists: Ref<Array<PlaylistInterface | PlaylistWithOutTracksInterface>> = ref([]);

onMounted(async () => {
    playlists.value = await useUserPlaylists();
    playlists.value.push(await useUserFavoritePlaylist());
});

</script>

<style scoped>

</style>
