<template>
  <div class='PlayerIndex' :style="{width,height}">

    <FullscreenExitOutlined
        style="color: #fff;cursor: pointer;opacity: 0.90;position: absolute;right: 0;top: 0;z-index: 9;"
        spin
        title="退出全屏"
        @click="handleFullscreenExit"
    />

    <h3 class="title">{{ $store.state.audioInfo.name }}</h3>

    <!--歌词组件-->
    <!-- <Lyric /> -->
    <!--歌词组件-->
    <Lyric />

  </div>
</template>

<script setup>
// import Lyric from "@/components/Global/play/Lyric"

import Lyric from "@/components/Global/Play/Lyric";

defineProps({
  width: String,
  height: String,
})
const emit = defineEmits()

const handleFullscreenExit = () => {
  // console.log(123)
  emit('update:width','0vw')
  emit('update:height','0vh')
}

</script>

<style lang="less" scoped>

.PlayerIndex{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;


  width: 0;
  height: 0;
  overflow: hidden;

  background-color: hotpink;
  transition: all 0.2s ease-out;

  font-size: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;


  background-image: -webkit-linear-gradient(
      135deg,
      rgb(142, 132, 133) 0%,
      rgb(230, 132, 110) 100%
  );

  .title{
    color: yellow;
    margin: 0 !important;

    .author{
      font-size: 16px;
      font-weight: 100;
    }
  }
  ul {
    transition: 1s;
    text-align: center;

    li {
      height: 20px;
      line-height: 20px;
      //transition: 0.5s;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      //background: hsla(0, 0%, 100%, .5) -webkit-linear-gradient(left, #fff, #fff) no-repeat 0 0;
      //-webkit-text-fill-color: transparent;
      //-webkit-background-clip: text;
      //background-size: 0 100%;

      &.active {
        color: greenyellow;
        font-weight: bold;
        font-size: 14px;

        //background-size: 100% 100%;
        //animation: scan 3s linear;
      }
    }
  }
}
</style>