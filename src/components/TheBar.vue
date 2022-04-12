<template>
  <div class="bar">
    <RouterLink :to="{name: 'home'}" class="bar-button active">
      <i class="far fa-home-alt"></i>
    </RouterLink>
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

.bar-button img {
  z-index: 20;
  width: 13.5px;
  height: 15px;
}

.bar-button.active {
  background: var(--main-color-transperent);
  border-radius: 4px;
  color: var(--main-color);
}
</style>
