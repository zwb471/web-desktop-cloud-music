<template>
  <div class='Lyric' :style="styles">
    <div class="lyric-wrap">
      <ul :style="{transform: `translate3d(0,-${top}px,0)`}">
        <li
            v-for="(item,index) in songLyric"
            :key="index"
            :class="line === index ? 'active' : ''"
        >{{item['text']}}</li>
      </ul>

<!--      <ul>-->
<!--        <li>ddddddddddddd</li>-->
<!--        <li>ddddddddddddd</li>-->
<!--        <li>ddddddddddddd</li>-->
<!--        <li>ddddddddddddd</li>-->
<!--        <li>ddddddddddddd</li>-->
<!--        <li>ddddddddddddd</li>-->
<!--        <li>ddddddddddddd</li>-->
<!--        <li>ddddddddddddd</li>-->
<!--      </ul>-->
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex"
import {toRefs} from "vue"

export default {
  name: "Lyric",
  props: {
    styles: {
      type: Object,
      default: ()=>({
        color: '#fff'
      })
    }
  },
  setup(){
    const {state} = useStore()

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.Lyric{
  height: 80%;
  overflow: hidden;
  color: #fff;
  font-size: 14px;
}

.lyric-wrap{
  flex: 1;
  //background: linear-gradient( 135deg, rgb(142, 132, 133) 0%, rgb(230, 132, 110) 100% );
  //color: rgba(255,255,255,0.5);
  text-align: left;
  overflow: hidden;
  font-family:"王汉宗中隶书繁", "Microsoft JhengHei", "明黑", Arial, Helvetica,sans-serif;

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

// 歌词逐词滚动
@keyframes scan {
  0% {
    background-size: 0 100%;
  }
  100% {
    background-size: 100% 100%;
  }
}

</style>