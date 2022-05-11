<template>
  <div class="btns">
    <a href="javascript:;" class="playBtn" @click="handlePlayAndPause">
      <i></i> {{ isPlayState ? '暂停' : '播放' }}
    </a>

    <a href="javascript:"
       class="download-song btn-size" data-title="下载"
       @click="downloadAudio(record.id,name)"
    >
      <i>下载</i>
    </a>
    <!--
            <a href="javascript:" class="add"></a>

            <a href="javascript:" class="collect-num btn-size" data-title="收藏数量">
                <i>({{123456789}})</i>
            </a>

            <a href="javascript:" class="forward-num btn-size" data-title="转发">
                <i>(未知)</i>
            </a>



            <a href="javascript:" class="comment-num btn-size" data-title="评论">
                <i>(未知}</i>
            </a>
    -->

  </div>
</template>

<script>
import {useStore} from "vuex"
import {toRefs} from "vue"

import downloadAudio from "@/utils/downloadMusic"


export default {
  name: 'FnBtns',
  alias: '功能按钮-播放-收藏-分享-下载-评论',
  setup(){
    const {state,commit} = useStore()

    // 暂停和 播放
    const handlePlayAndPause = () => {
      commit('playAndPause')
    }

    return {
      ...toRefs(state),
      handlePlayAndPause,
      downloadAudio,
    }
  }
}
</script>

<style lang="less" scoped>
.btns{
  margin: 10px 0 25px 0;
  //margin-bottom: 25px;
  //margin-right: -10px;
  display: flex;
  font-size: 12px;
  flex-wrap: wrap;

  .playBtn{
    display: flex;
    align-items: center;


    color: #fff;
    width: 66px;
    height: 31px;
    background: url("/static/button2.png") repeat 0 -387px;

    &:hover{
      opacity: 0.8;
      text-decoration: none;
    }

    i {
      display: block;
      width: 20px;
      height: 18px;
      margin: 0 3px 0 8px;

      background: url("/static/button2.png") no-repeat  0 -1622px;
      overflow: hidden;
    }
  }

  .btn-size{
    color: #333;
    height: 31px;
    line-height: 31px;
    margin:0 6px;


    i{
      min-width: 23px;
      cursor: pointer;
      padding: 0 7px 0 28px;
    }
  }

  .add{
    width: 31px;
    height: 31px;
    cursor: pointer;
    background: url("/static/button2.png") no-repeat 0 -1588px;
  }

  .collect-num{
    background:
        url("/static/button2.png") repeat right -1020px,
        url("/static/button2.png") no-repeat 0 -977px;
  }

  .forward-num{
    background:
        url("/static/button2.png") repeat right -1020px,
        url("/static/button2.png") no-repeat 0 -1225px;
  }

  .download-song{
    background:
        url("/static/button2.png") repeat right -1020px,
        url("/static/button2.png") no-repeat 0 -2761px;
  }

  .comment-num{
    background:
        url("/static/button2.png") repeat right -1020px,
        url("/static/button2.png") no-repeat 0 -1465px;
  }
}


</style>
