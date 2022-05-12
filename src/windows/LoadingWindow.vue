<template>
    <div class="loading-window">
        <img
            alt="logo"
            src="../assets/img/logo.svg">
        <h1>Yandex.Music</h1>
        <LoadingSpinner/>
    </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
    name: 'LoadingWindow',
    components: {LoadingSpinner}
};
</script>

<style scoped>
.loading-window {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
}

.loading-window img {
    width: 50px;
    height: 50px;
}

.loading-window h1 {
    color: white;
}
</style>
