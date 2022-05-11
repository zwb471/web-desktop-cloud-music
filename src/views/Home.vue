<template>
    <div class="home">
        <a-layout class="basic-layout">
            <a-layout-header class="basic-layout-header" :style="{background: `linear-gradient(135deg,${themeColor},#722ED1,${themeColor})`,}">
                <!--头部导航栏-->
                <BasicHeaderIndex />
                <!--头部导航栏-->

            </a-layout-header>
            <a-layout>
                <a-layout-sider class="basic-layout-sider" :width="sideWidth">

                  <div class="split-handle" ref="dragLineEle"></div>

                    <BasicSiderIndex />
                    <!--左下方全屏窗口-->
                    <BottomSiderFullScreen :sideWidth="sideWidth"

                                           v-model:width="width"
                                           v-model:height="height" />

                </a-layout-sider>
                <a-layout-content class="basic-layout-content">
                    <router-view />
                </a-layout-content>
            </a-layout>
          <a-layout-footer class="basic-layout-footer bottom-play-bar">
           <BottomPlayBar v-model:width="width" v-model:height="height" />
              
            </a-layout-footer>
            <LoginWindow />

        </a-layout>

        <PlayerIndex v-model:width="width" v-model:height="height" />

       <Dance v-show="isShowDance" />
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import BasicHeaderIndex from "@/components/BasicHeader/BasicHeaderIndex";
import BasicSiderIndex from "@/components/BasicSlider/BasicSiderIndex";
import LoginWindow from "@/components/Global/LoginWindow";
import PlayerIndex from "@/components/Global/Play/PlayerIndex"
import BottomSiderFullScreen from "@/components/BasicSlider/BottomSiderFullScreen";
import BottomPlayBar from "@/components/Global/BottomPlayBar"
import { ref, toRefs } from "vue";
import Dance from "@/components/Global/Dance";

const { state } = useStore();

const width = ref('0vw');
const height = ref('0vh');
const { themeColor,isShowDance } = toRefs(state);
</script>

<script>
// import throttle from "lodash/throttle";
import throttle from "loadsh/throttle"
export default {
  data: ()=>({
    sideWidth: 200,
    dragLineEle: null,
    appEle: null,
    isDown: false,
    startX: 0,
    sideDefaultWidth: 200,
    sideMaxWidth: 450
  }),

  mounted() {
        this.handleDragSide();
    },

    methods: {
      handleDragSide(){
        this.appEle = document.getElementById('app')
        this.$refs.dragLineEle.onmousedown = (e)=>{
          this.isDown = true
          this.startX = e.pageX
        }
        this.appEle.onmousemove = throttle((e)=>{
          if ( !this.isDown ) return
          const diffX = e.pageX
          if ( diffX < this.sideDefaultWidth || diffX > this.sideMaxWidth ) return

          this.sideWidth = diffX
        },100)

        this.appEle.onmouseup = ()=>{
          this.isDown = false
        }

      }
     ,
      checkPhone(phone) {
        const reg = /^1[3456789]\d{9}$/;
        return reg.test(phone);
      },
    },
};
</script>


<style lang="less" scoped>
.basic-layout {
    height: 100vh;

    .basic-layout-header,
    .basic-layout-footer {
        height: 50px;
        line-height: 50px;
        padding: 0;
        z-index: 22;
        position: relative;
    }

    .basic-layout-header {
        box-sizing: content-box;
        background: #c62f2f;
        color: #eee;
    }

    .basic-layout-footer {
        box-shadow: 0px -2px 15px #bbb;
        // background: darkgreen;
    }

    .bottom-play-bar {
        z-index: 9999;
    }

    .basic-layout-sider {
        position: relative;
        background: #aaa;
        box-shadow: none;
        overflow-x: hidden;
        overflow-y: auto;

        .split-handle {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 999;
            height: 100%;
            width: 5px;
            border-right: 1px solid #ddd;
            cursor: col-resize;
        }
    }

    .basic-layout-content {
      height: 90vh;
      //overflow: auto;
        //background: #f5f5f7;
        //background: orangered;
      overflow-x: hidden;
      overflow-y: auto;
    }
}
</style>