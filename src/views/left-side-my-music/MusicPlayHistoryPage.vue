<template>
  <div class="MusicPlayHistoryPage">
<!--    <h1>MusicPlayHistoryPage</h1>-->
    <GlobalSongListTable :song-list="$store.state.playSongList"/>
  </div>
</template>

<script>
import GlobalSongListTable from "@/components/Global/GlobalSongListTable";
export default {
  name: "MusicPlayHistoryPage",
  components: {GlobalSongListTable}
}
</script>

<style lang="less" scoped>

</style>