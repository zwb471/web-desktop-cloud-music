<template>
  <div class="TracksPage">
<!--    <h1>TracksPage</h1>-->
    <global-song-list-table :song-list="SongList"/>
<!--    <GlobalSongListTable :song-list="SongList" :id="id" />-->
  </div>
</template>

<script>
import GlobalSongListTable from "@/components/Global/GlobalSongListTable";
import { ref, watchEffect} from "vue";
export default {
  name: "TracksPage",
  components: {GlobalSongListTable},
  props: ['id'],
  setup(props){
    const SongList = ref([])

    const getSongList = async (id)=>{
      try {
        const res = await $axios.get( '/api/playlist/detail?id='+id)
        SongList.value.push(...res['data']['playlist']['tracks'])
      }catch (e){
        console.log(e.message)
      }
    }
    watchEffect(()=>{
      getSongList(props.id)
    })

    return{
      // ...toRefs(SongListState)
      SongList,
    }
  }
}
</script>

<style lang="less" scoped>

</style>