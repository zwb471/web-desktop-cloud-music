<template>
  <div class='SubscriberPage'>

    <a-list :data-source="subscribers" bordered >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta
              :description="`收藏时间: ${moment(item['subscribeTime']).format('YYYY年MM月DD日 HH:mm:ss')}`"
          >
            <template #title>
              <a href="javascript:;">{{ item.nickname }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item['avatarUrl']" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>

  </div>
</template>

<script>
import {reactive, toRefs} from "vue"
import moment from "moment"
import {getSongSheetSubscribers} from "@/common/commentApi"

export default {
  name: "SubscriberPage",
  props: ['id'],
  setup(props){
    const subscriberState = reactive({
      subscribers: [],
      async getSubscribers(id){
        try {
          const res = await getSongSheetSubscribers(id)
          console.log(res)
          this.subscribers = res['data']['subscribers']
        }catch (e) {
          console.log(e.message)
        }
      },
    })
    subscriberState.getSubscribers(props['id'])

    return {
      ...toRefs(subscriberState),
      moment,
    }
  }
}
</script>

<style lang="less" scoped>
.SubscriberPage{
  :deep(.ant-list-items){
    display: flex !important;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    .ant-list-item{
      width: 400px;
    }
  }
}
</style>