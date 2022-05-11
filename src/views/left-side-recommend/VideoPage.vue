<template>
  <div class="VideoPage page-video" ref="videoEle">
<!--    <h1>VideoPage</h1>-->

    <a-popover
        trigger="click"
        placement="bottomLeft"
        arrow-point-at-center >
      <template #content>
        <div class="cate-area">
         <span class="cates">
            <template
                v-for="(cate,index) in videoCate.slice(0,80)"
                :key="cate['id']"
            >

            <span
                class="cate"
                :class="{current: cate['id'] === groupId}"
                @click="selectCate(cate)"
            >{{cate.name}}</span>
          </template>
         </span>

        </div>
      </template>

      <a-button size="small" style="font-size: 12px;margin: 12px 0">
        {{currentCateName}}
        <DownOutlined />
      </a-button>
    </a-popover>

    <a-divider />

    <div class="videos">
      <VideoItem
          v-for="(video,index) in videoList"
          :video="video['data']"
          :key="`${video['id']}_${index}`"
          :show-creator="false"
      />

    </div>
    <a-button type="primary" :loading="loading" @click="loadMoreVideo">加载更多</a-button>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, watch} from "vue";
import VideoItem from "@/components/Global/VideoItem";

export default {
  name: "VideoPage",
  components: {VideoItem},
  setup(){
    const videoState = reactive({
      currentCateName:'音乐',
      loading: false,
      groupId: 5100,
      videoCate:['ddd','ddde'],
      hasMore:false,
      videoEle: null,
      async getVideoCate(){
        try {
          const res = await $axios.get('/api/video/group/list' )
          if ( res['data']['data'].length ){
            videoState.videoCate = res['data']['data']
          }
        }catch (e) {
          console.log(e.message)
        }
      },
      selectCate(cate){
        // console.log(cate)
        videoState.groupId = cate.id
        videoState.currentCateName = cate.name
        videoState.hasMore = false
      },
      videoList: [],
      offset: 1,
      // 获取视频列表
      async getVideoList(groupId){
        try {
          videoState.loading = true
          const res = await $axios.get( '/api/video/group?id='+groupId+'&offset='+(videoState.offset-1)*30+'&_='+new Date().getTime())
          const list = res['data']['datas']
          console.log(res)
          if ( res['data']['hasmore'] ){
            videoState.videoList.push(...list)
            videoState.hasMore = res['data']['hasmore']
          }else {
            videoState.videoList = list
          }
          videoState.loading = false
        }catch (e) {
          console.log(e.message)
        }
      },
      // 点击按钮 加载更多 视频列表项目
      async loadMoreVideo(){
        videoState.offset ++
        videoState.getVideoList(videoState.groupId)
      },


    })
    watch(()=>videoState.groupId,(newV)=>{
      // 点击分类，重置videoList，而不是追回
      // console.log(newV)
      videoState.videoList = []
      videoState.getVideoList(newV)
    },{
      immediate: true,
    })
    const handleScroll = (e)=>{
      // console.log(e)
      console.log(e.target.scrollTop)
      console.log(e.target.clientHeight)
      console.log(e.target.scrollHeight)
      if ( e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight ){
        // console.log('我到底了')
        videoState.loadMoreVideo()
      }
    }

    onMounted(()=>{
      videoState.videoEle.addEventListener('scroll',handleScroll)
      // videoState.videoEle.
    })
    videoState.loadMoreVideo()
    return{
      ...toRefs(videoState)
    }
  }
}
</script>

<style lang="less" scoped>

@primary-color: #c62f2f;
// 自行百度了解宫格布局
.grid-layout(@gridGap:20px,@min:220px,@max:1fr) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(@min, @max));
  grid-gap: @gridGap;
}

.page-video{
  padding: 0 20px;
  height: 100%;
  overflow: auto;
}

.videos {
  .grid-layout(15px, 220px);

  .video {
    .media-wrap {
      position: relative;

      overflow: hidden;
      .avatar {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background-size: contain;
        border: 1px solid #ddd;
      }
    }
    .title {
      font-size: 13px;
      color: #333;
    }
  }
}


.cates {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  .cate {
    display: inline-block;
    width: 20%;
    border: 1px solid #f3f5f7;
    line-height: 33px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    &.current {
      background: @primary-color;
      color: #fff;
      border-color: @primary-color;
    }
  }
}

</style>
<style >

.ant-popover-placement-bottomLeft{
  width: 540px !important;
}
/*.user-wrapper >>> .ant-popover-inner-content {*/
/*    max-height: 400px;*/
/*    overflow-y: auto;*/
/*}*/


/*.user-wrapper >>> .ant-popover-title {*/
/*    padding: 15px;*/
/*}*/
</style>