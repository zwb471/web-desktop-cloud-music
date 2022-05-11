<template>
  <div class="Dance">
<!--    <h1>Dance</h1>-->
    <CloseCircleOutlined
        spin
        style="position: absolute;right: 15px;top: 15px;font-size: 30px;color: #fff;"
        @click="closeDance"
    />
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import {onMounted, reactive, ref, toRefs} from "vue";
import {useStore} from "vuex";
  import {cryptoDanceAudio} from "@/utils/cryptoDanceAudio";
export default {
  name: "Dance",
  setup(){
    const canvas = ref(null)
    const {state,commit} = useStore()
      const closeDanceState =reactive({


        closeDance(){
          commit('setIsDance')
        }

      })
     onMounted(()=>{
       setTimeout(()=>{
       //   cryptoDanceAudio(
       //       state.audioEle,
       //       state.audioContext,
       //       canvas.value,
       //       state.audioInfo.src
       //   )
       })
     })

    return{
      ...toRefs(closeDanceState)
    }
  }
}
</script>

<style lang="less" scoped>
.Dance{
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  //background: #1d6ebe;
  z-index: 2999;
  width: 100vw;
}
</style>