<!--  -->
<template>
    <div class='BottomPlayBar player'>
        <div class="bar1">
            <!--上一曲-->
            <StepBackwardOutlined class="opacity"  @click="prevAndNext(-1)" />
            <!--上一曲-->

            <!--点击播放暂停-->
            <div class="playAndPause" @click="handlePlayAndPause">
                <CaretRightOutlined v-show="!isPlayState" class="opacity" />
                <PauseOutlined v-show="isPlayState" class="opacity" />
            </div>
            <!--点击播放暂停-->

            <!--下一曲-->
            <StepForwardOutlined class="opacity" @click="prevAndNext(1)"/>
            <!--下一曲-->
        </div>

        <div class="bar2">
            <time class="time" v-if="currentTime">{{timeFormat(currentTime)}}</time>
            <time class="time" v-else>00:00</time>

            <a-slider class="audioSlider" :min="0" :max="duration" :step="1" v-model:value="currentTime" @change="handleprogress" />
            <!-- <a-slider id="test" v-model:value="value1" :disabled="disabled" /> -->

            <time class="time" v-if="duration">{{timeFormat(duration)}}</time>
            <time class="time" v-else>00:00</time>
        </div>

        <div class="bar3">
            <AudioOutlined v-if="volume" />
            <AudioMutedOutlined v-else />

            <a-slider class="audioSlider" :min="0" :max="1" :step="0.1" v-model:value="volume" @afterChange="handleVolume" />

        </div>

        <div class="bar4">
            <!--动感光波-->
            <a-tooltip class="option" title="动感光波">
                <redditOutlined @click="showDance" />
            </a-tooltip>
            <!--动感光波-->

            <!-- 播放模式 -->
            <!-- <a-tooltip>
        
        </a-tooltip> -->
            <a-tooltip class="option" :title="modeIcon[modeNum]['title']">
                <span class="modeIcon" @click="changeMode">
                    <i :class="['iconfont',modeIcon[modeNum]['icon']]"></i>
                </span>
            </a-tooltip>
            <!-- 播放模式 -->

            <!--显示歌词-->
            <a-tooltip class="opacity" title="显示歌词">
                <span class="lycText" @click="showPlayerWindow">词</span>
            </a-tooltip>
            <!--显示歌词-->

              <!--  抽屉式 显示当前播放歌曲列表 -->
      <a-tooltip class="opacity" title="播放列表" @click="visible=true">
        <OrderedListOutlined />
      </a-tooltip>
      <!--  抽屉式 显示当前播放歌曲列表 -->




            <!-- 抽屉 -->

            <a-drawer title="当前播放列表" 
            placement="right" 
            :closable="true" 
            width="556"
            v-model:visible="visible" 
           
            >
                <p>Some contents...</p>
                <!-- 表格组件 -->
                <TableDataComp />
                <!-- <Table-data-comp></Table-data-comp> -->
            </a-drawer>
            <!-- 抽屉 -->
        </div>

    </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, toRefs, ref } from "vue";
import { timeFormat } from "@/utils/format";
import TableDataComp from "../Global/TableDataComp.vue"
import musicPlayTool from "@/utils/musicPlayTool";
export default {
    components: {TableDataComp},
    setup(props, { emit }) {
        // const value1 = ref(0);
        //     const value2 = ref([20, 50]);
        //     const disabled = ref(false);
        const { state, commit } = useStore();
        const bottomPlayBarState = reactive({
            // isPlayState: false,
            visible: false,

            handlePlayAndPause() {
                // this.isPlayState = !this.isPlayState;
                // commit("setIsPlayState", this.isPlayState);
                commit("playAndpause", );
                //  console.log(state.isPlayState);
            },
            handleprogress(v) {
                //  console.log(v);
                // commit("setCurrentTime", v); //真实托转
              state.audioEle.currentTime = v
            },
            handleVolume(v) {
                // commit("setVolume", v);//真实托转
              state.audioEle.volume = v
            },
            changeMode() {
                let num = state.modeNum;
                num++;
                num %= 3;
                commit("setModeNum", num);
                // console.log(state.modeNum);
            },
            showPlayerWindow() {
                //改变宽度和高度,双向绑定
                // console.log(emit);
                emit("update:width", "100vw");
                emit("update:height", "100vh");
            },
          async  prevAndNext(v){
             const currentPlayIndex = state.currentPlayIndex;
             const playSongList = state.playSongList;
             const  index = (currentPlayIndex + v) < 0 ? playSongList.length - 1 :
                 (currentPlayIndex+v) % playSongList.length
            commit('setCurrentPlayIndex',index)

            await musicPlayTool(playSongList,index)
            commit('setIsPlayState',true)
          },
          showDance(){
              commit('setIsDance')
          }
        });
      console.log(state.duration)
        return {
            timeFormat,
            ...toRefs(state),
            ...toRefs(bottomPlayBarState),
        };
    },
};
</script>

<style lang="less" scoped>
.play-history {
    /deep/ .ant-drawer-header {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        background: #f3f5f7;
        z-index: 10;
    }
    .play-history-title {
        display: flex;
        justify-content: center;
        /deep/ .ant-radio-button-wrapper {
            height: 28px;
            line-height: 26px;
        }
    }
    .ant-drawer-body {
        padding: 0;
    }
}
</style>

<style lang="less" scoped>
@primary-color: #c62f2f;

.lycText {
    font-weight: bold;
    color: orangered;
    cursor: pointer;
    &:hover {
        color: #000;
    }
}
.player {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    .resize {
        position: absolute;
        right: 2px;
        bottom: 2px;
        display: inline-block;
        width: 12px;
        height: 12px;
        opacity: 0.75;
        background: linear-gradient(
            to left top,
            #333,
            #333 1px,
            transparent 1px,
            transparent 3px,
            #333 3px,
            #333 4px,
            transparent 4px,
            transparent 6px,
            #333 6px,
            #333 7px,
            transparent 7px
        );
    }
    .bar1 {
        flex: 0 0 200px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        font-size: 26px;
        color: @primary-color;

        &.disable {
            .play-icon,
            .step-icon {
                opacity: 0.5;
            }
        }
        .play-icon {
            color: @primary-color;
            cursor: pointer;
        }
        .anticon {
            padding: 7px;
            border-radius: 50%;
            background: @primary-color;
            color: #fff;
            font-size: 17px;
            cursor: pointer;

            &:nth-child(even) {
                font-size: 24px;
            }
        }
        .playAndPause {
            .anticon {
                font-size: 24px;
            }
        }
    }
    .bar2 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .time {
            width: 80px;
            flex: 0 0 80px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: center;
        }
    }
    .bar3 {
        display: flex;
        align-items: center;
        flex: 0 0 150px;
    }
    .bar4 {
        flex: 0 0 180px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .count-wrapper {
            line-height: 1;
            cursor: pointer;
            .count {
                font-size: 11px;
            }
        }
    }
}
.audioSlider {
    flex: 1;
    margin-left: 20px;

    /deep/ .ant-slider-track {
        background-color: @primary-color;
    }
    /deep/ .ant-slider-step {
        background-color: rgba(123, 123, 123, 0.5);
    }
    /deep/ .ant-slider:hover .ant-slider-track {
        background-color: #c62f2f;
    }
}

.bar-volume {
    margin-left: 4px;
    /deep/ .progress {
        background: @primary-color;
    }
    /deep/ .progress-btn-wrapper {
        display: none;
    }
    &:hover {
        /deep/ .progress-btn-wrapper {
            display: block;
        }
    }
}
</style>