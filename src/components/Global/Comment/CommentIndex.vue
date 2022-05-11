<template>
  <div class='CommentIndex' >

    <!--评论及发表评论-->
    <!--发表评论-->
    <a-comment>
      <template #avatar>
        <a-spin spin :spinning="!userInfo.avatarUrl">
          <a-avatar
              :src="userInfo.avatarUrl"
              alt="Han Solo"
          />
        </a-spin>
      </template>
      <template #content>
        <a-form-item>
          <a-textarea :rows="4" v-model:value="value" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit()">
            发表评论
          </a-button>
        </a-form-item>
      </template>
    </a-comment>
    <!--发表评论-->
    <a-list
        class="comment-list"
        :data-source="commentData.comments"
        item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment
              :author="item.user.nickname"
              :avatar="item.user.avatarUrl"
              :content="item.content"
              :datetime="moment(item.time).format('YYYY年MM月DD日 HH:mm:ss')"
          />
        </a-list-item>
      </template>
    </a-list>
    <!--评论及发表评论-->

  </div>
</template>

<script>
import {markRaw, reactive, toRefs} from "vue"
import moment from "moment"
import {sendComment} from "@/common/commentApi"
import {useStore} from "vuex"

export default {
  name: "CommentIndex",
  props: ['commentData','datetime','id'],
  setup(props,{emit}){
    console.log(props.commentData)
    const {state,} = useStore()

    const commentState = reactive({
      // comments: [],
      submitting: false,
      value: '',
      handleSubmit() {
        if (!this.value)return

        this.submitting = true;
        setTimeout(async () => {
          this.submitting = false;

          const res = await sendComment(1,2,props['id'],this.value)
          // console.log(res)
          if ( res['status'] === 200 && res['data']['code'] === 200 ){
            // emit('update:datetime',Date.now())
            emit('update:commentData',{
              comments: [
                res['data']['comment'],
                ...props.commentData.comments,
              ],

              // 测试
              // comments: [
              //   {
              //     user: {
              //       avatarUrl: 'https://p2.music.126.net/ZaPDp86Fdc_hjuU588avkA==/2885118511986598.jpg?param=140y140',
              //       nickname: '追梦人'
              //     },
              //     content: this.value,
              //     time: Date.now(),
              //   },
              //   ...props.commentData.comments,
              // ]
            })
          }

          this.value = '';
        }, 1000);
      },
    })

    return {
      ...toRefs(commentState),
      moment,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="less" scoped>

</style>