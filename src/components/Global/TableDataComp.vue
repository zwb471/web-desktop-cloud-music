<!--  -->
<template>
    <div class='TableDataComp'>
        <a-table
            :columns="columns"
            :data-source="songList"
            bordered
            rowKey="songId"
         :row-selection="{ 
            type:'radio',
            selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :customRow="customRow"
            >
            <template #name="{ text }">
                <a>{{ text }}</a>
            </template>
            <!-- <template #title>Header</template> -->
            <template #footer>
        <span style="font-weight: bold;color: orangered;">tip: 双击播放</span>
      </template>
        </a-table>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import musicPlayTool from "@/utils/musicPlayTool"
import {useRouter} from "vue-router"
import downloadAudio from "@/utils/downloadMusic"
export default {
  props:['songList'],
    setup(props) {
      console.log(props.cloudList)
      const tableState = reactive({
        columns: [
          {
            title: '序号',
            width: 80,
            dataIndex: 'songId',
            customRender: ({index}) => {
              return index + 1
            },
          },
          {
            title: '音乐标题',
            dataIndex: 'songName',
            customRender: ({text,record,index}) => {
              return (
                  <a title={record.name} href="javascript:" onClick=
                      {async ()=>{
                        commit('setPlaySongList',props.songList)
                        commit('setCurrentPlayIndex',index)
                        await musicPlayTool(props.songList,index)
                        await Router.push('/song?id=' + record.id)
                      }}>
                    {text}
                  </a>
              )
            }
          },
          {
            title: '文件名称',
            dataIndex: 'fileName',
          },
          {
            title: "下载",
            dataIndex: "songName",
            customRender: ({index,text,record}) => {

              return (
                  <u style="cursor: pointer;" title="下载" onClick={()=>{downloadAudio(record.id,text)}}>
                    {text}
                  </u>
              )
            }
          }
        ],

        selectedRowKeys: [],
        onSelectChange : selectedRowKeys => {
          tableState.selectedRowKeys = selectedRowKeys;
        },
        customRow(record) {
          return {
            onDblclick: (event) => {
              console.log(record.key)
              tableState.selectedRowKeys = [record.key]
            },
          }
        }
      })
        return {
            // data,
            // columns,
          ...toRefs(tableState),
        };
    },
};
</script>
<style lang='less' scoped>
</style>