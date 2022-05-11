<template>
  <div class="SideHotSongSheet">
    <GlobalSlotHead>
      <template #title>
        <h3 slot="title">相关歌单推荐</h3>
      </template>

    </GlobalSlotHead>

    <ul class="song-list">
      <li v-for="item in playlists" :key="item.id">
        <div class="pic">
          <!--http://p3.music.126.net/wjFSDbo67AwzUzd-F5Zc2A==/109951164870573415.jpg?param=50y50-->
          <img v-lazy="item['coverImgUrl']+'?param=50y50'" width="100%" height="100%" alt="">
        </div>
        <div class="des">
          <p class="title">
            <a href="javascript:">{{ item.name }}</a>
          </p>
          <p class="author">
            by <a href="javascript:">{{ item.creator.nickname }}</a>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import GlobalSlotHead from "@/components/Global/GlobalSlotHead"
import api from "@/common/baseProxy"
export default {
  name: 'SideHotSongSheet',
  components: {GlobalSlotHead},
  alias: '侧边的热门歌单',
  data(){
    return {
      playlists: []
    }
  },
  created() {
    this.getSideHotSongSheetData()
  },
  methods: {
    async getSideHotSongSheetData(){
      try {
        const response = await $axios.get( '/api/top/playlist?limit=8&order=hot')
        const result = response['data']
        // console.log(result)
        this.playlists = result.playlists
      }catch (e) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.SideHotSongSheet{
  .song-list{
    margin-top: 15px;

    li{
      display: flex;
      margin-bottom: 15px;
      .pic{
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .des{
        width: calc( 100% - 60px );
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        p{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          margin: 0 ;
        }

        .title{
          a{
            color: #000;

          }
        }
        .author{
          color: #999;
          a{
            color: #666;
          }
        }

      }
    }
  }
}
</style>
