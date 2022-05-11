<template>
  <div class='ThemeSet'>
    <a-popover style="width: 500px;" trigger="click"      placement="bottomRight" arrow-point-at-center>
      <template #content>
        <ul class="colorBlock">
          <li
              class="color-item"
              v-for="(item,index) in themeColorList"
              :key="index"
              :style="'background-color: ' + item.color"
              @click="selectColor(item.color)"
          >
            <div class="name">{{item['key']}}</div>
            <CheckCircleOutlined
              v-if="primaryColor === item.color"
              class="a-icon"
              :style="`background-color: ${item.color}`"
            />
          </li>

        </ul>
      </template>

      <SkinOutlined style="font-size: 16px;" title="皮肤图标"/>
    </a-popover>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {useStore} from "vuex"

import themeColorList from "@/common/themeColorList"

const {commit} = useStore()

const primaryColor = ref('#c62f2f')
const selectColor = (color)=>{
  primaryColor.value = color
  commit('setThemeColor',color)
}
</script>

<style lang="less" scoped>

.colorBlock {
  width: 210px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: space-between;
  flex-wrap: wrap;
  margin: 0;

.color-item {
  position: relative;
  width: 60px;
  height: 60px;
  cursor: pointer;
  color: #fff;
  margin-bottom: 10px;

.name {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 4px;
  line-height: 20px;
  background: rgba(0, 0, 0, 0.2);
  font-size: 11px;
}
.a-icon {
  position: absolute;
  right: -6px;
  bottom: -6px;
  font-size: 22px;
  border-radius: 50%;
  color: #fff;
}
.z-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  opacity: 0.9;
}
}
}
</style>