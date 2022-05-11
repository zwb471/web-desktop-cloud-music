<template>
  <div class='GlobalSlotHead'>
    <div class="left-cate">
      <slot name="title"/>
      <slot name="tab"/>
    </div>
    <slot name="more"/>
  </div>
</template>

<script>
export default {
  name: "GlobalSlotHead"
}
</script>

<style lang="less" scoped>
.GlobalSlotHead {
  padding: 0 10px 0 34px;
  background: url('/static/index.png') no-repeat -225px -158px;
  border-bottom: 2px solid #C10D0C;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-cate{
    display: inherit;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: normal;
      line-height: 28px;
    }

    .tab{
      margin: 0 0 0 20px;

      .line{
        margin: 0 10px;
        color: #ccc;
      }
    }

    .more {
      margin-top: 9px;
      _margin-top: 11px;

      a{
        &:hover{
          color: #666;
        }
      }
      i{
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-left: 4px;
        vertical-align: middle;
        background: url("/static/index.png") no-repeat 0 -240px;
      }
    }
  }
}
</style>
