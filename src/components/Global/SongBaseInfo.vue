<template>
  <div class='SongBaseInfo'>
    <div class="hd">
      <i class="icon"></i>
      <span class="title">{{ title }}</span>
    </div>

    <p class="singer des">
      歌手：
      <a href="javascript:"> {{ author }}  </a>
      <!--            <a href="javascript:"> Alice Berg </a>-->
    </p>

    <p class="album des" v-if="tags.length>0">
      标签：
      <a href="javascript:;"> {{ tags.join(',') }} </a>
    </p>

    <FnBtns />

  </div>
</template>

<script>
import FnBtns from "@/components/Global/FnBtns"
  export default {
  name: "SongBaseInfo",
  components: {FnBtns},
  props: ['title','author','tags']
}
</script>

<style lang="less" scoped>
.SongBaseInfo{

  .hd{
    display: flex;
    align-items: center;
    .icon{
      width: 54px;
      height: 24px;
      background: url("/static/icon.png") no-repeat 0 -463px;
    }

    .title{
      margin-left: 14px;
      font-size: 24px;
    }
  }

  .des{
    color: #999;
    margin: 10px 0;

    a{
      color: #0c73c2;
    }
  }
}
</style>
