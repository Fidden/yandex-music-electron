<template>
    <div class="layout-container">
        <TheHeader/>
        <div class="content">
            <TheBar/>
            <RouterView/>
            <TheNotifications/>
            <ThePlayer/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/TheHeader.vue';
import TheBar from '@/components/TheBar.vue';
import ThePlayer from '@/components/ThePlayer.vue';
import TheNotifications from '@/components/TheNotifications.vue';
</script>

<style scoped>

</style>
