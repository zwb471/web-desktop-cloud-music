<template>
  <div class="MenuIcon">
    <h1>MenuIcon</h1>
  </div>
</template>

<script>
export default {
  name: "MenuIcon",
  // inheritAttrs: false,
  props:['icon'],
  setup(props,{attrs}){

    // return ()=>attrs.icon()
    return ()=>props.icon()

  }
}
</script>

<style scoped>

</style>