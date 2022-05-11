<template>
  <div class="CommentPage">
<!--    <h1>CommentPage</h1>-->
    <CommentIndex  v-model:commentData="commentData" :id="id" />
  </div>
</template>

<script>
import CommentIndex from "@/components/Global/Comment/CommentIndex";
import {reactive, toRefs,watchEffect} from "vue";
import {getPlaylistComment} from "@/common/commentApi"
export default {
  name: "CommentPage",
  components: {CommentIndex},
  props:['id'],
  setup(props){
    const commentState = reactive({
      commentData: {},
      limit: 30,
      offset: 0,
      dataTime: 0,
      async getCommentData(id){
        const res = await getPlaylistComment(id,this.limit,this.offset)
        const result = res['data']
        // console.log(result)
        if ( result.comments.length > 0 ){
          this.commentData = result
        }
      }
    })

    watchEffect(()=>{
      commentState.getCommentData(props.id)
    })

    return{
      ...toRefs(commentState)
    }
  }


}
</script>

<style lang="less" scoped>

</style>