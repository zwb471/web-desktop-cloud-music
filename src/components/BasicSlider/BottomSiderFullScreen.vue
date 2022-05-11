<template>
  <div class='BottomSiderFullScreen' :style="{width: sideWidth +'px'}">

    <!--歌曲封面图-->
    <div class="audioAvatar" ref="audioAvatar">
      <a-avatar
        shape="square"
        :size="50"
        :src="audioInfo['pic']"
      />
      <!--全屏图标-->
      <div class="full-screen" v-if="isShowFullScreenIcon" @click="handleFullScreen">
        <FullscreenOutlined style="color: #fff;font-size: 30px;"/>
      </div>
      <!--全屏图标-->
    </div>
    <!--歌曲封面图-->

    <div class="audioInfo">
      <span class="name">{{audioInfo['name']}}</span>
      <span class="singer">{{audioInfo['author']}}</span>
    </div>

  </div>
</template>

<script setup>
import {reactive, toRefs,nextTick,} from "vue"
import {useStore,} from "vuex";


defineProps({
  sideWidth: Number
})
const emit = defineEmits()
const {state,} = useStore()

const bottomSiderFullScreenState = reactive({
  src: 'https://p2.music.126.net/xSei1yJKuSJY3sMFUkiYZg==/109951166924151597.jpg?param=140y140',
  isShowFullScreenIcon: false,
  audioAvatar: null,
  handleFullScreen(){ ///显示全屏事件
    emit('update:width','100vw')
    emit('update:height','100vh')
  },
})

// 在下次dom更新后，执行
nextTick(()=>{

    if ( audioAvatar.value ){
      audioAvatar.value.addEventListener('mouseover',()=>{
        bottomSiderFullScreenState.isShowFullScreenIcon = true
      })
      audioAvatar.value.addEventListener('mouseleave',()=>{
        bottomSiderFullScreenState.isShowFullScreenIcon = false

      })
    }
})


const {
  src,
  isShowFullScreenIcon,
  audioAvatar,
  handleFullScreen,
} = toRefs(bottomSiderFullScreenState)

const {
	audioInfo,
} = toRefs(state)


</script>

<style lang="less" scoped>

.BottomSiderFullScreen{
  position: fixed;
  left: 0;
  bottom: 50px;
  z-index: 1000;
  overflow: hidden;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-top: 1px solid #ddd;
  background: #fff;

  display: flex;
  justify-content: space-between;
  font-size: 12px;
  user-select: none;

  .audioAvatar{
    position: relative;
    margin-right: 5px;

    .ant-avatar{
      width: 50px !important;
      height: 50px !important;
    }

    .full-screen{
      position: relative;
      bottom: 50px;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      overflow: hidden;

      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer ;
    }
  }

  .audioInfo{
    flex: 1;
    display: inherit;
    flex-direction: column;
    justify-content: space-around;

    .name{
      color: #333;
      opacity: 0.8;
      transition: 0.5s;
      &:hover{
        opacity: 1;
      }
    }
    .singer{
      color: #333;
      opacity: 0.8;
      transition: 0.5s;
      &:hover{
        opacity: 1;
      }
    }
  }


}
</style>