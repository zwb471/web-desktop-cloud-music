<template>
  <div class="loading-wrapper">
    <slot>
      <div class="ani_playing">
        <div :class="playAndPause" v-for="i in 4" :key="i"></div>
      </div>
    </slot>
    <div v-if="$slots && $slots.text">
      <slot name="text"></slot>
    </div>
    <div v-else>{{ text }}</div>

  </div>
</template>

<script>

import {computed,} from "vue"


export default {
  name: "Loading",
  props: {
    text: {
      type: String,
      default: "",
    },
    playing: {
      type: Boolean,
      default: true,
    },
  },
  setup(props){
    const playAndPause = computed(()=>{
      return props.playing ? "line play" : "line play paused"
    })

    return {
      playAndPause,
    }
  }
}
</script>

<style lang="less" scoped>
.loading-wrapper {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ani_playing {
  width: 30px;
  height: 12px;
  overflow: hidden;
  transform-style: preserve-3d;
  display: inline-flex;
  justify-content: center;
  align-items: flex-end;
  .play {
    animation: bounce ease-in-out infinite alternate forwards;
    &.paused {
      animation-play-state: paused;
    }
  }
  .line {
    height: 12px;
    width: 2px;
    margin-right: 2px;
    background: #c62f2f;
    transform-origin: bottom;
    &:nth-of-type(1) {
      height: 6px;
      animation-duration: 0.4s;
      -webkit-animation-duration: 0.4s;
    }
    &:nth-of-type(2) {
      height: 12px;
      animation-duration: 0.6s;
      -webkit-animation-duration: 0.6s;
    }
    &:nth-of-type(3) {
      height: 10px;
      animation-duration: 0.7s;
      -webkit-animation-duration: 0.7s;
    }
    &:nth-of-type(4) {
      height: 8px;
      animation-duration: 0.5s;
      -webkit-animation-duration: 0.5s;
    }
  }
}

@keyframes bounce {
  0% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.1);
  }
}
</style>
