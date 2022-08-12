<template>
    <main class="main">
        <BaseNavigation/>
        <div class="main-head">
            <h2>
                <slot name="title"/>
                <br>
                <span><slot name="subtitle"/></span>
            </h2>
        </div>
        <slot
            v-if="loaded"
            name="body"/>
        <BaseLoading v-else/>
    </main>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import BaseNavigation from '@/components/BaseNavigation.vue';
import BaseLoading from '@/components/BaseLoading.vue';

defineProps<{
    loaded: boolean;
}>();

</script>

<style scoped>
.main-head h2 {
    font-weight: 500;
    font-size: 31.25px;
    line-height: 20px;
    margin-bottom: 20px;
}

.main-head span {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #8E929C;
}
</style>
