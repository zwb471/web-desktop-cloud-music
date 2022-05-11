<template>
  <router-view/>
  <audio ref="audioEle"/>
</template>

<script>

import {nextTick, onMounted, ref} from "vue";
import {useStore} from "vuex";
import musicPlayTool from "@/utils/musicPlayTool";

export default {
  name:'App',
  setup(){
    const audioEle = ref(null);
    let timer = null
    const {state,commit} = useStore()
    const  getCurrentTime= ()=>{
      audioEle.value.ontimeupdate = ()=>{
        // console.log(audioEle.value.currentTime)
          commit('setCurrentTime',audioEle.value.currentTime)
          commit('setLine',audioEle.value.currentTime)
          commit('setTop',state.line)

      }

    }
    const getDurration= ()=>{
    timer = setTimeout(()=>{
        clearTimeout(timer);

        const duration = audioEle.value.duration;
        if(isNaN(duration)){
          getDurration()
        }else{
          commit('setDuration',duration)
        clearTimeout(timer)
        }
    },200)

    }
    const listenerAudioEnd = ()=>{
      audioEle.value.addEventListener('ended',async ()=>{
        console.log('结束了')
        const modeNum = state.modeNum;
        const playSongList = state.playSongList
        const currentPlayIndex= state.currentPlayIndex
        switch (modeNum){
          case 0:
        //    单曲循环
                await musicPlayTool('playSongList',currentPlayIndex)
                break
          case 1:
            await musicPlayTool(playSongList,playSongList.length * Math.random() | 0)
                break
          case 2:
            // 循环播放
            const index = (currentPlayIndex + 1 ) % playSongList.length
            await musicPlayTool(playSongList,index)
            commit('setCurrentPlayIndex',index)
            break
        }
      })

    }
    onMounted(()=>{
      // const ctx = new (window.AudioContext || window.webkitAudioContext)()
      // ctx && commit('setAudioContext',ctx)
      //
      // // 使用原则，进到页面，先点击一下，拿到 AudioContext，之后才能绘制音频图特效
      // document.documentElement.addEventListener('mousedown',()=>{
      //   if ( ctx.state !== 'running' ){
      //     ctx.resume()
      //     commit('setAudioContext',ctx)
      //   }
      // })

    })
    nextTick(()=>{
      // console.log(audioEle.value);
      commit('setAudioEle',audioEle.value)
      audioEle.value.addEventListener('play',()=>{
        // console.log('播放了')  监听事件
        getCurrentTime()
        getDurration()
        listenerAudioEnd()
      })

    })

    return{
      audioEle
    }
  }
}
</script>
<style lang="less">
@import "./assets/css/cssreset.css";
@import "./assets/css/common.less";
</style>
