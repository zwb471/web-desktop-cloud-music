<template>
  <div class='SongListPage'>

    <a-list class="intro">
      <a-list-item>
        <a-list-item-meta>
          <template #title>
            <h1>{{playlist['name']}}</h1>
          </template>

          <template #description>
            <div class="creator">
              <img
                  :src="`${playlist?.creator?.avatarUrl}?param=32y32`"
                  width="32"
                  height="32"
                  class="creator-avatar"
                  alt=""
              >
              <a href="javascript:;" class="name">{{playlist['creator']?.nickname}}</a>
              <span class="time">{{toDate(playlist['createTime'])}}创建</span>
            </div>

            <ul class="actions">
              <li class="item">
                <a-button-group size="small">
                  <a-button type="primary" @click="playAll(0)">
                    <PlayCircleOutlined />播放全部
                  </a-button>
                </a-button-group>
              </li>
              <li class="item">
                <a-button size="small" v-if="isLiked" @click="subscribe(2)">
                  <CheckCircleOutlined />已收藏 {{playlist['subscribedCount']}}
                </a-button>

                <a-button size="small" v-else @click="subscribe(1)">
                  <FolderAddOutlined />收藏 {{playlist['subscribedCount']}}
                </a-button>
              </li>
              <li class="item">
                <a href="http://www.bshare.cn/share">
                  <a-button size="small">
                    <ShareAltOutlined />分享{{playlist['shareCount']}}
                  </a-button>
                </a>
              </li>
            </ul>

            <div class="tags">
              <span>标签：</span>
              <a-breadcrumb v-if="playlist['tags'] && playlist['tags'].length">
                <a-breadcrumb-item
                    v-for="(tag,index) in playlist['tags']"
                    :key="index"
                >
                  <a>{{tag}}</a>
                </a-breadcrumb-item>
              </a-breadcrumb>
              <span v-else>无</span>
            </div>

            <div class="desc">
              <span>简介:</span>
              <span v-if="playlist['description']" v-html="playlist['description']"></span>
              <span>无</span>
            </div>

          </template>

          <template #avatar>
            <img
                v-if="playlist['coverImgUrl']"
                :src="`${playlist['coverImgUrl']}?param=200y200`"
                alt=""
                width="200"
                height="200"
            />
            <img v-else src="/images/default_avatar.jpg" width="200" height="200" alt="">
          </template>
        </a-list-item-meta>


        <ul class="action">
          <li class="action-item">
            <div>歌曲数</div>
            <strong>{{ playlist['trackCount'] }}</strong>
          </li>
          <li class="action-item">
            <div>播放数</div>
            <strong>{{ playlist['playCount'] }}</strong>
          </li>
        </ul>
      </a-list-item>
    </a-list>

    <div class="tab-bar" v-if="tabs.length>0">
      <a-tabs v-model:activeKey="activeKey">

        <a-tab-pane v-for="(item,index) in tabs" :key="index"
                    :tab="item['label']">

<!--            //插槽显示插入内容-->
<!--          <template #tab>-->
<!--            <router-link :to="item['path']" :style="{color: $store.state.themeColor}">-->
<!--              {{item['label']}}-->
<!--            </router-link>-->
<!--          </template>-->

              <component :is="tabList[index]" :id="id"/>
<!--          <router-view />-->
     </a-tab-pane>
      </a-tabs>
    </div>

    <router-view />

  </div>
</template>

<script>
import {getCurrentInstance, reactive, toRefs, watchEffect} from "vue"
import {useRoute} from "vue-router"
import {toDate} from "@/utils/format"
import TracksPage from "@/views/right-content/songList/TracksPage"
import CommentPage from "@/views/right-content/songList/CommentPage"
import SubscriberPage from "@/views/right-content/songList/SubscriberPage"


export default {
  name: "SongListPage",
  setup(){
    const {
      appContext: { config: {globalProperties: {$success}} }
    } = getCurrentInstance() //获取当前组件实列方法
    // console.log(appContext)//上下文对象. . .
    const Route = useRoute()
    const id = Route.params?.id

    const tabList = [
      TracksPage,
      CommentPage,
      SubscriberPage,
    ]
    // console.log(id)
  const songListPageState = reactive({
    isLiked: false,
    playlist: {},
    activeKey: 0,
    // activeKey: '',
    tabs:[],
    async getPlayList(id){
      try {
          const  res = await $axios.get('/api/playlist/detail?id='+id)
        if ( res['data']['code'] === 200 ){
          this.playlist = res['data']['playlist']
          this.isLiked = res['data']['subscribed']
          // console.log(this.playlist)
        }
      }catch (e){
        console.log(e.message)
      }
    },
    async subscribe(t){
      // t : 类型,1:收藏,2:取消收藏 id : 歌单 id
      try {
        const res = await $axios.get('/api/playlist/subscribe?t='+t+'&id='+id)
        if ( res['data']['code'] === 200 ){
          console.log(t)
          if ( t === 1 ){
            $success({
              title: '收藏成功'
            })
            this.isLiked = true
          }
          else if ( t===2 ){
            $success({
              title: '取消收藏成功'
            })
            this.isLiked = false
          }

        }
      }catch (e) {
        console.log(e.message)
      }
    }
  })
    songListPageState.getPlayList(id) //检测剖没有id

    watchEffect(()=>{

      if(id){
        console.log(123)
        songListPageState.tabs = [
          {
            path: '/songList/'+id+'/tracks',
            label: '歌曲列表'
          },{
            path: '/songList/'+id+'/comment',
            label: '评论'
          },{
            path: '/songList/'+id+'/subscriber',
            label: '收藏者'
          },

        ]
        songListPageState.getPlayList(id)
      }
    })
    watchEffect(()=>{
      // console.log(songListPageState.activeKey)
      // console.log(Route['path'])
      if(Route['path']){
        // songListPageState.activeKey = Route['path'];
        // console.log(songListPageState.activeKey)
      }
      // switch (songListPageState.activeKey){
      //   case songListPageState.activeKey == 0;
      //
      // }
    })
    return {
      ...toRefs(songListPageState),
      toDate,
      tabList,
      id,
    }
  }
}
</script>

<style scoped>

.ant-btn-primary{
  background-color: #c62f2f;
  border-color: red !important;
}

.intro >>> .ant-list-item {
  align-items: initial;
}

.intro >>> .ant-avatar {
  border-radius: 0;
}

.intro >>> .ant-list-item-content {
  position: absolute;
  right: 0;
  top: 0;
}

.intro >>> .ant-list-item-meta-title {
  padding-right: 120px;
  line-height: 1.1;
}

.tab-bar{
  padding: 0 20px;
}
</style>

<style lang="less" scoped>


.intro {
  padding: 20px;
  .creator {
    display: flex;
    align-items: center;
    .creator-avatar {
      border-radius: 50%;
      margin-right: 5px;
    }
    .name {
      margin-right: 5px;
      color: #333;
    }
    .time {
      font-size: 13px;
    }
  }
  .actions {
    margin: 15px 0;
    .item {
      display: inline-block;
      margin-right: 10px;
    }
    .ant-btn {
      font-size: 12px;
    }
  }
  .tags {
    display: flex;
    margin-bottom: 10px;
    font-size: 13px;
    a {
      font-size: 13px;
      color: #006fe3;
    }
  }
  .action {
    display: flex;
    text-align: right;
    font-size: 12px;
    height: fit-content;
    color: rgba(0, 0, 0, 0.65);
    font-weight: normal;

    .action-item {
      padding: 0 10px;
      margin-top: 12px;
      &:not(:last-child) {
        border-right: 1px solid #ddd;
      }
    }
  }
}

.desc {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.intro .actions .ant-btn{
  font-size: 13px;
}

</style>