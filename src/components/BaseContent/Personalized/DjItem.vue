<template>
  <a tag="li" :to="`/dj/${dj.id}`" :class="itemCls">
    <figure class="info">
      <img class="avatar" v-lazy="dj.picUrl" />
      <div class="top">
        {{ dj.category }}
      </div>
      <div class="bottom" v-if="dj.copywriter">
        <span>{{ dj.copywriter }}</span>
      </div>
    </figure>
    <div class="intro">
      <div class="name">{{ dj.name }}</div>
      <div class="desc" v-if="dj.description">{{ dj.description }}</div>
      <slot name="price"></slot>
    </div>
  </a>
</template>

<script>
export default {
  name: "DjItem",
  props: {
    layout: { type: String, default: "" },
    dj: { type: Object, default: null },
  },
  created() {
    console.log(this.layout)
  },
  computed: {
    itemCls() {
      console.log(this.layout)
      return this.layout === "horizon" ? "item horizon" : "item";
    },
  },
}
</script>

<style lang="less" scoped>

.item {
  display: flex;
  flex-direction: column;
  _margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;

  color: rgba(0, 0, 0, 0.85) !important;

  &.horizon {
    flex-direction: row;
    .info {
      flex: 1;
    }

    .intro {
      flex: 2;
      .name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;


      }
    }
  }
  .info {
    position: relative;
    padding-top: 100%;
    width: 100%;
    margin: 0;
    color: #fff;
    font-size: 13px;
    .avatar {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 100%;
      height: 100%;
    }
    .top,
    .bottom {
      position: absolute;
      left: 0;
      padding: 0 10px;
    }
    .top {
      top: 0;
      padding: 0 10px;
      line-height: 24px;
      background: #c62f2f;
      color: #fff;
      border-radius: 0 0 21px 0;
    }
    .bottom {
      width: 100%;
      bottom: 0;
      padding-right: 30px;
      line-height: 30px;
      background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.5),
          transparent
      );
    }
    .bottom {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .intro {
    overflow: hidden;
    .name {
      padding: 4px;

      &:hover{
        color: rgba(0, 0, 0, 0.95) !important;
        font-weight: bold;
      }
    }
  }
}

</style>
