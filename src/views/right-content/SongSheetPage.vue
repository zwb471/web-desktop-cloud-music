<template>
  <div class="SongSheetPage page-playlist">
<!--    <h1>SongSheetPage</h1>-->
    <Tags
        :tags="{'热门标签': tags}" @change="onTagChange"
    >
<!--      ddd-->
    </Tags>

    <ul class="playlists">
      <li class="list-item">
        <img class="avatar" src="@/assets/images/playlist-top.png" alt="">
        <div>精品歌单推荐，给最懂音乐的你</div>
      </li>

      <ListItem
          class="list-item"
          v-for="(item,index) in songSheetList"
          :item="item"
          :key="index"
      />
    </ul>

    <div class="page">
      <a-pagination @change="onPaginationChange" :total="total" showQuickJumper/>
    </div>
  </div>
</template>

<script>
import Tags from "@/components/BaseContent/SongSheet/Tags";
import {reactive, toRefs,watchEffect} from "vue";
import ListItem from "@/components/BaseContent/Personalized/ListItem";
export default {
  name: "SongSheetPage",
  components:{Tags
  ,ListItem
  },

  setup(){
    const songSheetPageState = reactive({
      tags: ['Unremovable', 'Tag 2', 'Tag 33Tag 3'],
      cat: '华语',
      offset: 0,
      songSheetList: [],
      total: 0,
      onTagChange(tag){
        songSheetPageState.cat = tag.name;
        console.log(songSheetPageState.cat)
      },
      async getTags(){
        try {
          const res = await $axios.get('/api/playlist/hot')
          this.tags = res['data']['tags']
        }catch (e) {
          console.log(e.message)
        }
      },

      async getSongSheetList(){
        try {
          const res = await $axios({
            url:  '/api/top/playlist?limit=50&order=hot&offset='+this.offset+'&cat='+this.cat
          })
          this.songSheetList = res['data']['playlists']
          this.total = res['data']['total']

          // console.log(this.songSheetList)
        }catch (e) {
          console.log(e.message)
        }
      },
      onPaginationChange(page,){
        songSheetPageState.offset = page
      }

    })
    songSheetPageState.getTags()


    watchEffect(()=>{

      songSheetPageState.getSongSheetList(songSheetPageState.cat)
    })
    return{
   ...toRefs(songSheetPageState)
    }
  }

}
</script>

<style lang="less" scoped>


.grid-layout(@gridGap:20px,@min:220px,@max:1fr) {
  // 网格布局文档 http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(@min, @max));
  grid-gap: @gridGap;
}

.ant-tag-checkable-checked{
  background: #c62f2f;
}

.page-playlist {
  padding: 15px 20px;
  .playlists {

    .grid-layout(20px, 160px);
    //  display: flex;
    //fle-width: wrap;
    .list-item:first-child{
      color: rgba(0,0,0,0.85);
    }
  }
}

.cate-area {
  display: flex;
  margin: 12px 0;
  .cate-label {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 100px;
    width: 100px;
    height: 33px;
    color: #c62f2f;
    font-size: 16px;
    .anticon {
      font-size: 24px;
      margin-right: 5px;
    }
  }
  .cates {
    flex: 1;
    .cate {
      display: inline-block;
      width: 98px;
      border: 1px solid #f3f5f7;
      line-height: 33px;
      text-align: center;
      font-size: 12px;
      &.current {
        background: #c62f2f;
        color: #fff;
        border-color: #c62f2f;
      }
    }
  }
}

.list-item {
  cursor: pointer;
  //width: 18%;
  .avatar {
    display: block;
    width: 100%;
  }
}

.page {
  margin: 15px auto;
  text-align: center;
}


.cate-wrapper .ant-popover-inner-content {
  max-height: 400px;
  overflow-y: auto;
}

.cate-wrapper .ant-popover-title {
  padding: 15px;
}

</style>