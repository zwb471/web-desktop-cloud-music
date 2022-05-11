<template>
  <div class="SongSheet">
    <ul class="list">
      <li class="list-item">
        <div class="date">
          <div class="info">
            <div class="week">{{getWeek()}}</div>
            <div class="day">{{getDay()}}</div>
          </div>
        </div>
        <p class="name">每日歌曲推荐</p>
      </li>
      <ListItem
          class="list-item"
          v-for="item in songSheetList"
          :item="item"
          :key="item['key']"
      >
        <template #copywriter>
          <div class="copywriter" v-if="item['copywriter']">
            {{item['copywriter']}}
          </div>
        </template>
      </ListItem>


    </ul>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import ListItem from "@/components/BaseContent/Personalized/ListItem";
export default {
  name: "SongSheet",
  components:{
    ListItem
  },
  setup(){
    const songSheetState = reactive({
      getWeek(){
        return "星期" + "日一二三四五六".charAt(new Date().getDay())
      },
      getDay(){
        return new Date().getDate()
      },
      songSheetList: [],
      async getSongSheetList(){
        try {
          const res = await $axios.get('/api/personalized?limit=9')
          this.songSheetList = res['data']['result']
        }catch (e) {
          console.log(e.message)
        }
      }
    })
    songSheetState.getSongSheetList()

    return{
      ...toRefs(songSheetState)
    }
  }
}
</script>

<style lang="less" scoped>
@gutter: 1%;
.list{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0 -@gutter;
  .list-item{
    width: 18%;
    margin-left: @gutter;
    margin-right: @gutter;
    margin-bottom: 5px;
    cursor: pointer;
    .date {
      position: relative;
      padding-top: 100%;
      border: 1px solid #eee;
      .info {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 1;
        background: #fff;
        color: #333;
        font-size: 20px;
        font-weight: bold;

        .week {
          //font-size: 0.15em;
        }
        .day {
          //font-size: 0.56em;
          color: #c62f2f;
        }
      }
    }

  }

}


</style>