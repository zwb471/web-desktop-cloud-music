<template>
  <div class='SearchBox header-search'>
    <input v-model="keyword" type="text" placeholder="搜索音乐、歌手、视频..."/>
    <SearchOutlined />
    <CloseCircleOutlined @click.native="clearKeyword()" v-if="keyword"/>

    <div class="search-list" v-if="keyword">
      <a-menu>
        <a-menu-item key="0">01.Samsara</a-menu-item>
        <a-menu-divider />
        <a-menu-item key="1">02.Seve (Radio Edit)</a-menu-item>
        <a-menu-divider />
        <a-menu-item key="2">03.Time</a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">04.Despacito</a-menu-item>
        <a-menu-divider />
        <a-menu-item key="4">05.HandClap</a-menu-item>
        <a-menu-divider />
        <a-menu-item key="5">06.Panama</a-menu-item>
        <a-menu-divider />
      </a-menu>
    </div>
  </div>
</template>

<script setup>
import {reactive, toRefs} from "vue"

const searchState = reactive({
  keyword: '',
  clearKeyword(){
    this.keyword = ''
  }
})
const {keyword,clearKeyword} = toRefs(searchState)

const x = () => {
  console.log(123)
}
</script>

<style lang="less" scoped>

.header-search{
  height: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .anticon-search{
    position: absolute;
    right: 10px;
    opacity: 0.7;
    cursor: pointer;

  }
  .anticon-close-circle{
    position: absolute;
    right: 30px;
    color: rgba(0,0,0,.5);
    cursor: pointer;
  }
  input{
    width: 240px;
    height: 26px;
    border: 0;
    outline: none;
    border-radius: 30px;
    background: rgba(0,0,0,0.2);
    display: block;
    color: #eee;
    text-indent: 1em;
    font-size: 12px;
  }
  input::-webkit-input-placeholder {
    color: #ccc;
    font-size: 12px;
  }

  .search-list{
    position: absolute;
    top: 40px;
    left: 0;
    width: 300px;
    min-height: 350px;
    background-color: #fff;
    box-shadow: 0 0 20px 0px rgba(0,0,0,0.2);
  }
}
</style>