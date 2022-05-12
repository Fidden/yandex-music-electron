<template>
    <div class="bar">
        <RouterLink
            v-for="route in routes"
            :key="route.id"
            :class="{'active': $route.name === route.name}"
            :to="{name: route.name}"
            class="bar-button">
            <i :class="route.icon"/>
        </RouterLink>
    </div>
</template>

<script>
export default {
    name: 'TheBar',
    data() {
        return {
            routes: [
                {id: 0, name: 'home', icon: 'fas fa-home-alt'},
                {id: 1, name: 'station', icon: 'fal fa-broadcast-tower'},
                {id: 2, name: 'tracks', icon: 'fal fa-music'},
                {id: 3, name: 'artists', icon: 'fal fa-user-music'},
            ]
        };
    }
};
</script>

<style scoped>
.bar {
    display: flex;
    flex-direction: column;
    max-width: 50px;
    margin: 0 5px;
    -webkit-app-region: no-drag;
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

.bar-button.active {
    background: var(--main-color-transperent);
    border-radius: 4px;
    color: var(--main-color);
}
</style>
