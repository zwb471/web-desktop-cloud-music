<template>
  <div class="MV" mv>
<!--    <h1>MV</h1>-->
       <ul class="list">
         <ListItem
             class="list-item"
             v-for="item in mvList"
             :item="item"
             item-type="mv"
             :ratio="0.56"
             :key="item['id']"
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
import ListItem from "@/components/BaseContent/Personalized/ListItem";
import {reactive, toRefs} from "vue";
import {getLogout} from "@/common/api";
export default {
  name: "MV",
  components:{
    ListItem
  },
  setup(){
      const  myState = reactive({
        mvList: [],
        async getMvList(){
          try {
            const res = await $axios.get('/api/personalized/mv')
            this.mvList = res['data']['result']
            console.log(this.mvList)
          }catch (e){
            console.log(e.message)
          }
        }


      })
    myState.getMvList()
    return{
      ...toRefs(myState)
    }
  }
}
</script>

<style lang="less" scoped>
@gutter: 1%;

.mv{
  width: 100%;
  //height: 240px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0 -@gutter;
  .list-item {
    cursor: pointer;
    width: 23%;
    margin-left: @gutter;
    margin-right: @gutter;
    &:hover {
      /deep/ .top {
        display: none;
      }
      .copywriter {
        transform: translateY(0);
      }
    }
    .copywriter {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      padding: 6px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      transform: translateY(-100%);
      transition: all 0.3s;
    }
  }
}
</style>