<template>
  <div class='PlayDisc'>
    <div class="needle">
      <img :class="isPlayState?'':'rotate'" width="100%" height="100%" src="../../assets/img/needle.png" alt="">
    </div>
    <div :class="['disc',isPlayState? 'play-disc-rotate' : '']">
      <div class="play-song-cover">
        <img width="100%" height="100%" :src="audioInfo.pic"  alt=""/>
      </div>
    </div>

    <div class="createOutchain">
      <!--<i></i>-->
      <a :href="`https://music.163.com/#/outchain/2/${id}/`">生成外链播放器</a>

    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue"
import {useStore} from "vuex"

export default {
  name: "PlayDisc",
  props: ['id'],
  setup(props){
    // console.log(props.id)
    console.log(props.id)
    const {state} = useStore()
    const discState = reactive({
      // isPlayingState: true,
      // pic: 'http://p3.music.126.net/W_cq4O9FPhVGNljPtIvM8Q==/109951165302462819.jpg'
    })

    return {
      ...toRefs(state),
      ...toRefs(discState),
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes myRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.play-disc-rotate{
  animation: myRotate 10s infinite linear;
}

.createOutchain{
  position: absolute;
  //left: 20%;
  //bottom: -35px;
  //display: flex;

  i{
    width: 16px;
    height: 16px;
    background: url("/static/icon.png") no-repeat -34px -863px;
  }

  a{
    color: #0c73c2;
  }
}

.PlayDisc{
  width: 198px;
  height: 198px;
  background:rgba(255,255,255,0.1) ;
  border-radius: 50%;
  margin: 0 25px 0 40px;
  flex-shrink: 0;
  //overflow: hidden;
  position: relative;

  .needle{
    position: absolute;
    z-index: 99;
    left: calc( (100% - 50px) / 2 );
    top: -60px;
    width: 75px;
    height: 110px;

    img{
      width: 100%;
      height: 100%;
      transform: scale(0.6);
      transition: 1s;
      transform-origin: 32px 44px;
    }
    img.rotate{
      transform: scale(0.6) rotate(-30deg);
    }

  }

  .disc{
    width: 100%;
    height: 100%;
    background: url("../../assets/images/disc.png");
    background-size: cover;

    display: flex;

    .play-song-cover{
      width: 136px;
      height: 136px;
      margin: auto;
      border-radius: 50%;

      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: block;
        margin: auto;
      }
    }
  }
}
</style>
