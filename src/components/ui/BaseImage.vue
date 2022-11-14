<template>
    <img
        v-lazy="imgSource"
        :alt="alt"
    >
</template>

<script lang="ts" setup>
import useImage from '@/composables/useImage';

const props = defineProps<{
    src: string;
    width: number;
    height: number;
    alt: string;
    type?: 'track' | 'album' | 'artist' | 'playlist';
}>();

function getErrorImage() {
    switch (props.type) {
    case 'track':
        return require('@/assets/img/track-placeholder.svg');
    case 'artist':
        return require('@/assets/img/artist-placeholder.svg');
    case 'playlist':
        return require('@/assets/img/playlist-placeholder.svg');
        // case 'album': Todo: починить рендер картинки
        //     return require('@/assets/img/album-placeholder.svg');
    }
}

const imgSource = {
    src: useImage(props.src, props.width, props.height),
    error: getErrorImage()
};
</script>
