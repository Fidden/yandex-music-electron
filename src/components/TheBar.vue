<template>
    <div class="bar">
        <div
            :style="{top: getLineTopPos}"
            class="bar-line"/>
        <RouterLink
            v-for="item in routesFirstPart"
            :key="item.id"
            :class="{'active': $route.name === item.name}"
            :to="{name: item.name}"
            class="bar-button">
            <i :class="item.icon"/>
        </RouterLink>
        <div class="separator-line"/>
        <RouterLink
            v-for="item in routesSecondPart"
            :key="item.id"
            :class="{'active': $route.name === item.name}"
            :to="{name: item.name}"
            class="bar-button">
            <i :class="item.icon"/>
        </RouterLink>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const routes = ref([
    {id: 0, name: 'home', icon: 'fas fa-home-alt'},
    {id: 1, name: 'station', icon: 'fal fa-broadcast-tower'},
    {id: 2, name: 'tracks', icon: 'fal fa-music'},
    {id: 3, name: 'podcasts', icon: 'fal fa-podcast'},
    {id: 4, name: 'artists', icon: 'fal fa-user-music'},
    {id: 5, name: 'albums', icon: 'fal fa-album'},
]);

const routesFirstPart = computed(() => routes.value.slice(0, 3));
const routesSecondPart = computed(() => routes.value.slice(3));

// todo: автоматизировать чтоб руками не писать )
const getLineTopPos = computed(() => {
    switch (route.name) {
        case 'home':
            return '25px';
        case 'station':
            return '75px';
        case 'tracks':
            return '125px';
        case 'podcasts':
            return '186px'; //cuz separator-line
        case 'artists':
            return '235px';
        case 'albums':
            return '285px';
        default:
            return '25px';
    }
});

</script>

<style scoped>
.bar {
    display: flex;
    flex-direction: column;
    max-width: 50px;
    margin: 0 5px;
    -webkit-app-region: no-drag;
    position: relative;
}

.bar-line {
    position: absolute;
    left: 0;
    top: 25px;
    height: 17px;
    width: 4px;
    border-radius: 9px;
    background: var(--main-color);
    transform: translateY(-50%);
    transition: 0.2s;
}

.bar-button {
    width: 50px;
    height: 50px;
    background: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    color: #AFB8C1;
}

.separator-line {
    height: 1px;
    width: 35px;
    background: #30333d;
    margin: 5px auto;
}

.bar-button.active {
    background: var(--main-color-transperent);
    border-radius: 4px;
    color: var(--main-color);
}
</style>
