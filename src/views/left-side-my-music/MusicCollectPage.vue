<template>
  <div class="MusicCollectPage">
<!--    <h1>MusicCollectPage</h1>-->
    <TableDataComp :song-list="cloudList"/>
  </div>
</template>

<script>
import TableDataComp from "@/components/Global/TableDataComp";
import {reactive, toRefs} from "vue";
export default {
  name: "MusicCollectPage",
  components: {TableDataComp},
  setup(){
    const myCloudMusicState = reactive({
      cloudList: [],
      async getCloudList(){
        try {
          const res = await $axios.get('/api/user/cloud')
          // console.log(res['data']['data'])
          this.cloudList = res['data']['data']
          console.log(this.cloudList)
        }catch (e) {
          console.log(e.message)
        }
      }
    })
    myCloudMusicState.getCloudList()
    return{
      ...toRefs(myCloudMusicState)
    }
  }
}
</script>

<style lang="less" scoped>

</style>