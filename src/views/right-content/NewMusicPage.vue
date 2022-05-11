<template>
  <div class="NewMusicPage">
<!--    <h1>NewMusicPage</h1>-->
    
<!--    分类-->
    
    
    <div class="cates">
      <a  href="javascript:;"
          v-for="(item,index) in cateMap"
          :key="index"
          class="item"
          :class="{current: index === songType}"
          @click="changeType(index)">
        {{item}}
      </a>
    </div>


    <div class="tracks">
      <div class="tracks-body">
        <GlobalSongListTable :songList="songList"/>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs, watchEffect} from "vue";
import GlobalSongListTable from "@/components/Global/GlobalSongListTable";
export default {
  name: "NewMusicPage",
  components:{
    GlobalSongListTable
  },
  setup(){

    const newMusicState = reactive({
      cateMap:{
        0: "全部",
        7: "华语",
        96: "欧美",
        8: "日本",
        16: "韩国",
      },
      songType:0,

      changeType(index){
        this.songType= index
      },
      songList: [],
      // 获取歌曲列表
      async getSongList(type){
        try {
          const res = await $axios({
            url:  '/api/top/song?type='+type
          })
          // console.log(res['data']['data'])
          this.songList = res['data']['data']
          // console.log(this.songList)
        }catch (e) {
          console.log(e.message)
        }
      }
    })
    watchEffect(()=>{
      newMusicState.getSongList(newMusicState.songType)
    })

    return{
      ...toRefs(newMusicState)
    }
  }

}
</script>

<style lang="less" scoped>

@primary-color: #c62f2f;

.ant-btn-primary{
  background-color: @primary-color !important;
  border-color: @primary-color !important;
  margin-right: 1.5px !important;
}

.NewMusicPage {
  padding: 0 20px;
  .tracks {
    border: 1px solid #eee;

    &-top {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }

    &-body {
      position: relative;

      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 4px;
      }

      /deep/ .song-item {
        padding: 5px 0;
      }

      /deep/ .ant-spin-spinning {
        position: absolute;
        left: 50%;
        top: 100px;
        transform: translateX(-50%);
        z-index: 88;
        opacity: 1;

        .ant-spin-dot-item{
          background-color: @primary-color !important;
        }
      }
    }
  }

  .cates {
    margin: 10px 0;

    .item {
      margin-right: 12px;
      color: #333;

      &.current {
        color: @primary-color;
        font-weight: bold;
      }
    }
  }
}

</style>