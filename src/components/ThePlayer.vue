<template>
  <div class="player-container">
    <div class="player-seek-slider">
      <p class="start-time">0:00</p>

      <div class="player-seek-slider-body">
        <div class="seek-slider-selected">
          <div class="seek-slider-circle">
            <div class="seek-slider-circle-inside"></div>
          </div>
        </div>
      </div>

      <p class="end-time">5:00</p>
    </div>
    <div class="player-body">
      <div class="player-track-info">
        <img src="https://lastfm.freetls.fastly.net/i/u/770x0/82baebc4b85543eac3aad9f7a75e2f1e.jpg" alt="img"
             class="player-track-image">
        <h5>Взрослые травмы<br>
          <span>Валентин Стрыкало</span>
        </h5>
      </div>

      <button class="like control-btn">
        <i class="fal fa-heart"></i>
      </button>

      <div class="player-body-controls">
        <button class="control-btn">
          <i class="fal fa-random"></i>
        </button>
        <button class="control-btn">
          <i class="fal fa-step-backward"></i>
        </button>
        <button class="control-btn">
          <i class="fas fa-pause"></i>
        </button>
        <button class="control-btn">
          <i class="fal fa-step-forward"></i>
        </button>
        <button class="control-btn">
          <i class="fal fa-repeat"></i>
        </button>
        <button class="control-btn">
          <i class="fal fa-volume"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThePlayer"
}
</script>

<style scoped>
.player-container {
  background: #242833;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 6px;
  overflow: hidden;
  position: fixed;
  left: 68px;
  bottom: 8px;
  width: calc(100% - 76px);
}

.player-seek-slider {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
}

.start-time, .end-time {
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: #D8DBE4;
}

.player-seek-slider-body {
  background: #9FA0A2;
  border-radius: 42px;
  flex: 1;
  height: 6px;
  margin: 0 14px;
  display: flex;
  flex-direction: row;
}

.seek-slider-selected {
  width: 60%;
  background: var(--main-color);
  border-radius: 42px;
  position: relative;
}

.seek-slider-circle {
  width: 20px;
  height: 20px;
  background: #434343;
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.seek-slider-circle-inside {
  background: var(--main-color);
  border-radius: 50px;
  width: 14px;
  height: 14px;
  margin: auto;
}


.player-body {
  display: flex;
  flex-direction: row;
  margin-top: 16px;
}

.control-btn {
  color: #C4C4C4;
  background: none;
}

.player-track-image {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  margin-right: 10px;
}

.player-track-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 17px;
}

.player-track-info h5 {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin: 0;
  color: white;
}

.player-track-info h5 span {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #8E919A;
}

.player-body-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 35px;
  margin: 0 auto;
}

</style>