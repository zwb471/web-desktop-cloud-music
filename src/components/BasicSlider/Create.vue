<template>
  <div class='Create'>
    <div class="input-item">
      <a-input
        placeholder="请输入新歌单名称"
        :value="songSheetName"
        @change="onNameChange"
      />
    </div>
    <div class="input-item">
      <a-checkbox @change="onPrivacyChange" v-model:checked="songSheetPrivacy">{{songSheetPrivacy}}设置为隐私歌单</a-checkbox>
    </div>

  </div>
</template>

<script setup>
//组件传值父组件传子组件
defineProps({
  songSheetName: String,
  songSheetPrivacy: Boolean
})
const emit = defineEmits()

const onNameChange = (e)=>{
 
  emit('update:songSheetName',e.target.value)
}
const onPrivacyChange = (e) => {
  //  console.log(e.target.value);
  emit('songSheetPrivacy',e.target.value)
}
</script>

<style scoped>
.input-item {
  margin-bottom: 8px;
  font-size: 12px;
}
</style>