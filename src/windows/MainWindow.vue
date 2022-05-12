<template>
    <div class="template">
        <TheHeader/>
        <div class="content">
            <TheBar/>
            <router-view/>
            <ThePlayer/>
        </div>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader';
import TheBar from '../components/TheBar';
import ThePlayer from '../components/ThePlayer';

export default {
    name: 'MainWindow',
    components: {TheHeader, TheBar, ThePlayer}
};
</script>

<style scoped>

</style>
