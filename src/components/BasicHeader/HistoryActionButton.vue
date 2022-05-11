<template>
  <div class='HistoryActionButton'>
      <a-button-group size="small">
        <a-button @click="Router.back()">
          <LeftOutlined twoToneColor="#d45955"/>
        </a-button>
        <a-button @click="Router.forward()">
          <RightOutlined twoToneColor="#d45955"/>
        </a-button>
        <a-button @click="Router.go(0)">
          <ReloadOutlined twoToneColor="#d45955"/>
        </a-button>
      </a-button-group>
  </div>
</template>

<script setup>
import {useRouter,} from "vue-router"
const Router = useRouter()

</script>

<style lang="less" scoped>
.ant-btn{
  background: #c62f2f;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(0,0,0,0.1);
}

.ant-btn-primary{
  background-color: #d45955;
  border-color: #d45955;
}
.ant-btn-group .ant-btn-primary:first-child:not(:last-child) {
  border-right-color: #d45955;
}

.ant-btn:hover, .ant-btn:focus, .ant-btn:active, .ant-btn.active{
  color: #40a9ff;
  background: none !important;
  border-color: #40a9ff;
}
</style>