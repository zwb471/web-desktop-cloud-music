<template>
  <div class='RankPage ToplistPage'>


    <!--左边榜单-->
    <div class="rank-list">
      <h2>云音乐特色全球榜</h2>
      <ul class="characteristic">
        <li v-for="(item,index) in topList" :key="index" @click="handleGetSongList(item.id,index)">
          <div class="pic">
            <img
                width="100%"
                height="100%"
                class="img"
                v-lazy="item['coverImgUrl']"
                alt=""
            />
          </div>
          <div class="info">
            <p class="title">{{ item.name }}</p>
            <p class="update-time">{{ item['updateFrequency'] }}</p>
          </div>

        </li>
      </ul>

    </div>
    <!--左边榜单-->

    <!--右边榜单详情-->
    <div class="rank-list-details">

      <!--头部信息-->
      <div class="rank-list-head-wrap">
        <div class="pic">
          <img
              width="100%"
              height="100%"
              v-lazy="coverImgUrl"
              :src="coverImgUrl"
              alt=""
          />
        </div>

        <div class="song-des">
          <h2 class="title">{{ name }}</h2>

          <div class="update-date">
            <i class="icon"></i>
            <span class="date">最近更新：{{ formatRecentUpdateTime(trackNumberUpdateTime) }}</span>
            <span class="exact">（{{ updateFrequency }}）</span>
          </div>

          <div class="btns">
            <a href="javascript: void(0);" class="playBtn">
              <i></i>播放
            </a>

            <a href="javascript: void(0);" class="add"></a>

            <a href="javascript:void(0);" class="collect-num btn-size" data-title="收藏数量">
              <i>({{ subscribedCount }})</i>
            </a>

            <a href="javascript:void(0);" class="forward-num btn-size" data-title="转发">
              <i>(未知)</i>
            </a>

            <a href="javascript:void(0);" class="download-song btn-size" data-title="下载">
              <i>下载</i>
            </a>

            <a href="javascript:void(0);" class="comment-num btn-size" data-title="评论">
              <i>(未知}</i>
            </a>

          </div>
        </div>
      </div>

      <!--歌曲列表-->
      <div class="song-list-wrap">
        <!--头部-->
        <div class="song-list-head">

          <div class="hd">
            <h3 class="title">歌曲列表</h3>
            <span class="count">{{ songList.length }}首歌</span>
          </div>

          <span class="play-num">播放：<b class="num">{{ playCount }}</b>次</span>

        </div>

        <!--歌曲列表。。。-->

        <div class="song-list-pre-cache">
          <GlobalSongListTable :songList="songList"/>
          <!--          <a-table
                        :columns="columns"
                        :data-source="songList"
                        bordered
                        :loading="loading"
                        rowKey="id"
                        :rowSelection="{
                            type: 'radio',
                            selectedRowKeys: selectedRowKeys,
                            onChange: onSelectChange
                        }"
                        :customRow="customRow"
                    >
                      &lt;!&ndash;  <template #name="{ text }"> &ndash;&gt;
                      &lt;!&ndash;  <a>{{ text }}</a> &ndash;&gt;
                      &lt;!&ndash;  </template> &ndash;&gt;
                      &lt;!&ndash;  <template v-slot:id>  &ndash;&gt;
                      &lt;!&ndash;  <span>{{indexMethod()}}</span>  &ndash;&gt;
                      &lt;!&ndash;  </template> &ndash;&gt;

                    </a-table>-->
        </div>
      </div>
    </div>
    <!--右边榜单详情-->


  </div>
</template>

<script>
import secondFormat from "second-format"
import api from "@/common/baseProxy"
import GlobalSongListTable from "@/components/Global/GlobalSongListTable"

export default {
  name: "RankPage",
  components: {GlobalSongListTable},
  alias: '排行榜',
  data() {
    return {
      songList:[],
      topList: [],

      // 当前榜单播放总次数
      playCount: 0,
      // 收藏(订阅)人数
      subscribedCount: 0,
      // 最近更新时间
      trackNumberUpdateTime: '',
      // 更新频率
      updateFrequency: '',
      // 榜单封面
      coverImgUrl: '',
      // 榜单名称
      name: '',
      loading: false,
      index: 0,
      columns: [
        {
          title: '序号',
          dataIndex: 'id',

          customRender: ({text, record, index}) =>{
            return index+1
          }
        },
        {
          title: '标题',
          dataIndex: 'name',
        },
        {
          title: '时长',
          dataIndex: 'dt',
          customRender: ({text, record, index}) =>{
            return secondFormat(text/1000)
          }
        },
        {
          title: '歌手',
          dataIndex: 'ar',
          customRender: ({text, record, index}) =>{
            return this.getSinger(text)
          }
        },
      ],
      selectedRowKeys: []
    }
  },
  filters:{},
  async created() {
    await this.getTopListData()
    // await this.getSongList()
    // 因为默认要获取 div.song-des 的数据
    await this.handleGetSongList()
  },


  methods: {
    // 单选 选中
    onSelectChange(selectedRowKeys){
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 双击
    customRow(record, index){
      return {
        onDblclick: (event) => {
          console.log(record, index)
          this.selectedRowKeys = [record.id]
        },
      }
    },

    // 处理歌手数组
    getSinger(val){
      const nameArr = val.map((item)=>{
        return item.name
      })
      return nameArr.join(',')
    },
    //  格式化歌曲时间
    secondFormat,
    // 格式化 最近更新时间
    formatRecentUpdateTime(t){
      return new Date(t).toLocaleDateString()
    },
    // 榜单
    async getTopListData(){
      const response = await $axios.get(api + '/toplist/detail')
      const result =  response.data
      // console.log(result)
      this.topList = result.list
    },
    // 歌曲列表
    async getSongList(id=19723756){
      const response = await $axios.get(api + '/playlist/detail?id='+id)
      const result =  response.data
      // console.log(result)
      // console.log(result.playlist.tracks)
      this.songList = result['playlist']['tracks']
    },
    // 点击榜单 获取歌曲列表
    handleGetSongList(id=19723756,index=0){
      // 当前榜单播放总次数
      this.playCount = this.topList[index]['playCount']
      // 收藏(订阅)人数
      this.subscribedCount = this.topList[index]['subscribedCount']
      // 最近更新时间
      this.trackNumberUpdateTime = this.topList[index]['trackNumberUpdateTime']
      // 更新频率
      this.updateFrequency = this.topList[index]['updateFrequency']
      // 榜单封面
      this.coverImgUrl = this.topList[index]['coverImgUrl']
      // 榜单名称
      this.name = this.topList[index]['name']
      this.getSongList(id)
    },
    indexMethod() {
      let index = this.index +1
      this.index = index
      return index;
    },
    // 双击某一行时
    rowDblclick(row, column, event){
      console.log(row.id)
    }
  },

}
</script>

<style lang="less" scoped>




.ToplistPage{
  max-width: 980px;
  min-height: 700px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;

  background:#fff url("/static/wrap3.png") repeat-y center 0;

  display: flex;

  .rank-list{
    width: 240px;
    //margin-top: 40px;

    h2{
      padding: 12px 10px 12px 15px;
      font-size: 14px;
      color: #000;
    }

    ul.characteristic{

      li{
        padding: 10px 0 10px 20px;
        height: 56px;

        cursor: pointer;
        display: flex;
        overflow: hidden;

        &:hover{
          background-color: #f4f2f2;
        }

        .pic{
          width: 40px;
          height: 40px;

          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .info{
          padding-left: 10px;
          height: 100%;

          .title{
            color: #000;
            margin-bottom: 8px;
          }
          .update-time{
            color: #999;
          }
          p{
            font-size: 11px !important;
            margin: 0;
          }
        }

      }

    }
  }

  .rank-list-details{
    flex: 1;


    /*头部信息*/
    .rank-list-head-wrap{
      padding: 40px;

      display: flex;

      .pic{
        padding: 3px;
        border: 1px solid #ccc;
        width: 150px;
        height: 150px;

        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      .song-des{
        width: 473px;
        margin-left: 28px;

        .title{
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
          margin: 16px 0 4px;
        }

        .update-date{
          line-height: 35px;
          margin: 0 0 20px;
          display: flex;

          .icon{
            width: 13px;
            height: 13px;
            margin: 9px 0 0 3px;
            background: url("/static/icon.png") no-repeat -18px -682px;
          }

          .date{
            margin-left: 5px;
            color: #666;
          }

          .exact{
            color: #999;
          }

        }

        .btns{
          margin-bottom: 25px;
          margin-right: -10px;
          display: flex;

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
      }

    }

    /*歌曲列表*/
    .song-list-wrap{
      padding: 0 30px 40px 40px;

      /*头部*/
      .song-list-head{
        height: 33px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #c20c0c;

        .hd{
          display: inherit;
          justify-content: inherit;
          align-items: inherit;
        }

        .title{
          font-size: 20px;
          line-height: 28px;
          font-weight: normal;
        }

        .count{
          margin: 0 0 0 20px;
          color: #666;
        }

        .play-num{
          color: #666;

          .num{
            color: #c20c0c;
          }
        }
      }

      /*歌曲列表...*/
      .song-list-pre-cache{

        /deep/  .has-gutter th {
          padding: 7px 0;
          background: url("/static/table.png") repeat 0 0;

          div{
            background: url("/static/table.png") no-repeat 0 -56px;
          }

        }
      }
    }

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

</style>