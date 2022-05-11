<template>
  <section>
    <dl class="tags" v-for="(val, key, index) in tags" :key="index">
      <dt>{{ key }}:</dt>
      <dd
          v-for="(tag, i) in val"
          :key="tag.id"
          @click="selectTag(tag, index, i)"
          :class="{ current: currentIndex === `${index}_${i}` }"
      >{{ tag.name }}</dd>
    </dl>
  </section>
</template>

<script>
import {ref,} from "vue"

export default {
  name: "Tags",
  props: {
    tags: {
      type: Object,
      default() {
        return [];
      },
    },
  },
  setup(props,context){
    const currentIndex = ref('0_0')
    const {emit} = context

    const selectTag = (tag, index, i) => {
      currentIndex.value = `${index}_${i}`
      emit("change", tag)
    }

    return {
      currentIndex,
      selectTag,
    }
  }
}
</script>

<style lang="less" scoped>
.tags {
  margin: 15px 0;
  dd,
  dt {
    display: inline-block;
    font-size: 13px;
  }
  dd {
    padding: 0 10px;
    cursor: pointer;
    line-height: 22px;
    &.current {
      background: #c62f2f;
      color: #fff;
      border-radius: 4px;
    }
  }
  dt {
    margin-right: 4px;
    font-weight: 600;
  }
  dd:not(:last-child) {
    border-right: 1px solid #ddd;
  }
}
</style>
