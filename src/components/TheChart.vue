<template>
    <div class="chart-container">
        <h2 class="chart-container-title">
            Чарт Яндекс.Музыки<br>
            <span class="chart-container-subtitle">{{ chart.title }}</span>
        </h2>
        <div
            v-if="chart.all.length"
            class="chart-tracks-container">
            <div class="chart-tracks-block">
                <img
                    alt=""
                    src="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheChart',
    computed: {
        chart() {
            return this.$store.state.chart.all;
        }
    }
};
</script>

<style scoped>

</style>