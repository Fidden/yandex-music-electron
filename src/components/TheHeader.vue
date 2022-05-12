<template>
    <header class="header">
        <div class="header-logo">
            <img
                alt="logo"
                src="../assets/img/logo.svg">
            <p>Яндекс.Музыка</p>
        </div>

        <div class="search-bar">
            <input
                placeholder="Поиск"
                type="text">
        </div>

        <RouterLink
            class="account"
            to="/">
            A
        </RouterLink>

        <div class="controls">
            <button @click="minimize">
                <img
                    alt="min"
                    src="../assets/img/minimize.svg">
            </button>
            <button @click="maximize">
                <img
                    alt="min"
                    src="../assets/img/maxsimize.svg">
            </button>
            <button @click="close">
                <img
                    alt="min"
                    src="../assets/img/close.svg">
            </button>
        </div>
    </header>
</template>

<script>
const {ipcRenderer} = require('electron');
export default {
    name: 'TheHeader',
    methods: {
        minimize() {
            ipcRenderer.send('minimize');
        },
        maximize() {
            ipcRenderer.send('maximize');
        },
        close() {
            ipcRenderer.send('close');
        }
    }
};
</script>

<style scoped>
.header, .search-bar, .controls, .header-logo {
    display: flex;
    flex-direction: row;
}

.header {
    height: 35px;
    color: white;
    align-items: center;
    position: relative;
    margin: 15px 0 15px 20px;
}

.header-logo img {
    width: 15px;
    height: 15px;
    margin: auto 10px auto 0;
}

.header-logo {
    font-size: 12px;
    font-weight: 400;
}

.search-bar {
    flex: 1;
    margin: 0 80px;
    align-self: stretch;
    overflow: hidden;
    border-radius: 5px;
    background: #222939;
    border: 1px solid rgba(255, 255, 255, 0.04);
    -webkit-app-region: no-drag;
    height: 100%;
}

.search-bar input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 14px;
    background: none;
    outline: none;
    border: none;
    color: white;
}

.controls {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
}

.controls button {
    width: 45px;
    height: 35px;
    background: none;
    outline: none;
    border: none;
}

.controls button img {
    width: 10px;
    height: 10px;
}

.account {
    margin-right: 20px;
    border-radius: 999px;
    background: yellow;
    color: black;
    text-decoration: none;
    width: 35px;
    height: 35px;
}


</style>
