<template>
    <div class="bar">
        <button class="bar-button active">
            <img src="../assets/img/home.svg" alt="home">
        </button>
    </div>
</template>

<script>
export default {
    name: "TheBar"
}
</script>

<style scoped>
.bar {
    display: flex;
    flex-direction: column;
    max-width: 50px;
    margin: 0 5px;
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
}

.bar-button img {
    z-index: 20;
}

.bar-button.active {
    background: var(--main-color-transperent);
    border-radius: 4px;
}
</style>
