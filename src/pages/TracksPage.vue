<template>
    <main
        v-if="tracks.length"
        class="main">
        <div class="main-container main-container-scroller">
            <h2 class="main-container-title">
                Треки
            </h2>
            <TheTracksTable
                v-if="tracks.length"
                :filter-bar="true"
                :tracks="tracks"/>
        </div>
    </main>
    <BaseLoading v-else/>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import TheTracksTable from '@/components/TheTracksTable.vue';
import usePlaylists from '@/composables/usePlaylists';
import useUserPlaylists from '@/composables/useUserPlaylists';
import TrackInterface from '@/interfaces/TrackInterface';
import useTrack from '@/composables/useTrack';
import { useUserStore } from '@/store/user';
import BaseLoading from '@/components/BaseLoading.vue';

const userStore = useUserStore();
const tracks: Ref<Array<TrackInterface>> = ref([]);

onMounted(async () => {
    // todo: Promise.all
    const playlistsKinds = (await useUserPlaylists()).map(item => item.kind);
    playlistsKinds.push(3);
    const playlists = await usePlaylists(playlistsKinds, userStore.userId);
    const trackIds = playlists.map(item => item.tracks.map(item => item.id)).flat();

    tracks.value = await useTrack(trackIds);
});
</script>

<style scoped>
.main-container-scroller {
    height: calc(100% + 70px);
}

.main {
    overflow-y: hidden;
}
</style>
