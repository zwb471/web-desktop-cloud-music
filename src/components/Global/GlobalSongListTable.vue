<template>
  <div class="GlobalSongListTable">
<!--    <h1>GlobalSongListTable</h1>-->
    <div class="box">
      <a-table
          :columns="columns"
          :data-source="songList"
          bordered
          rowKey="id"
          :row-selection="{
        type: 'radio',
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :custom-row="customRow"
      >

      </a-table>

    </div>
  </div>
</template>

<script>
import {reactive, toRefs, watchEffect} from "vue";
import getSingerName from "@/utils/getSingerName";
import downloadMusic from "@/utils/downloadMusic";
import {useRouter} from "vue-router"
// import
import {timeFormat} from "@/utils/format";
import {useStore} from "vuex";
import musicPlayTool from "@/utils/musicPlayTool";
export default {
  name: "GlobalSongListTable",
  props:['songList'],
  setup(props){
    const { dispatch,commit, } = useStore()
    const Router = useRouter()
    const songListTableState =reactive({
       columns : [
         {
           title: '序号',
           dataIndex: 'id',
           width: 80,
           customRender({index}){
             return index+1
           }
         },
        {
          title: '歌曲名称',
          dataIndex: 'name',
          // dataIndex: 'money',
          customRender({index,text,record,}){
            // console.log(text)//John Brown
            // console.log(record)//{
            //   // 整个之
            // // }

            return (
              <a
                  href="javascript:;"
                  title={record.name}
                  onClick={()=>{
                    Router.push('/song?id='+record.id)
                  }}
              >
                <img src={(record['album'] ? record['album']['picUrl'] : record['al']['picUrl'] )+ '?param=50y50'} alt=""/>
                &nbsp;
                &nbsp;
                {text}
              </a>
          )
          }

        },
         {
           title: '歌手',
           dataIndex: 'ar',
           // width: 80,
           customRender({index,text,record,}){
             return  text ? getSingerName(text) : getSingerName(record['artists'])
           }
         },
         {
           title: '专辑',
           dataIndex: 'al',
           customRender({index,text,record,}){
             return  text ?(text.name) : (record['album']['name'])
           }
         },
         {
           title: '时长',
           width: 80,
           dataIndex: 'dt',
           customRender({index,text,record,}){
             return text ? timeFormat(text/1000) : timeFormat(record['duration']/1000)
           }
         },
         {
           title: '下载',
           customRender({index,text,record,}){
             const name = record.name
             return (
                 <u
                     style="cursor: pointer;"
                     title="下载"
                     onClick={()=>{
                       console.log(record.id)
                       console.log(record.name)
                       downloadMusic(record.id,record.name)
                     }}
                 >
                   {name}
                 </u>
             )
           }
         }
      ],
       data : [
        {
          key: '1',
          name: 'John Brown',
          money: '￥300,000.00',
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          money: '￥1,256,000.00',
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          money: '￥120,000.00',
          address: 'Sidney No. 1 Lake Park',
        },
      ],

      selectedRowKeys: [],

      onSelectChange(selectedRowKeys){
        songListTableState.selectedRowKeys = selectedRowKeys;
      },
      customRow(record,index){
        return{
          onDblclick: async (event) => {
            songListTableState.selectedRowKeys = [record.key];
          // const r = await dispatch('getMusicUrl',{id:33894312})
          //   console.log(r)

            // 把当前的歌曲列表 挂载到store中，方便实现播放模式
            commit('setCurrentPlayIndex',index)
            commit('setPlaySongList',props.songList)

            await musicPlayTool(props.songList,index)
            commit('setIsPlayState',true)
        }
       }
    }

    })


    // watchEffect(()=>{
    //   console.log(props.songList)
    // })
    return{
      // songList
      ...toRefs(songListTableState)
      // data,
      // columns,
    }
  }
}
</script>

<style lang="less" scoped>

</style>