<template>
    <div class="bar">
        <RouterLink
            :to="{name: 'home'}"
            class="bar-button active">
            <i class="fas fa-home-alt"/>
        </RouterLink>
    </div>
</template>

<script>
export default {
    name: 'TheBar'
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
