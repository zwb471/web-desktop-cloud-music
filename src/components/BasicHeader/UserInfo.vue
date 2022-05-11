<template>
  <div class='UserInfo'>
    <!--未登录-->
    <div v-if="!isLogin" @click="$store.commit('setIsShowLoginWindow',true)">
      <a-avatar size="30">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      未登录 
    </div>
    <!--未登录-->

    <div v-if="isLogin">
      <a-popover style="width: 500px;" trigger="click" placement="topLeft" arrow-point-at-center>
        <!--气泡内容-->
        <template #content>
          <a-spin :spinning="loading">
            <div class="user-box">
              <a-row
                type="flex"
                justify="space-between"
                align="middle"
              >
                <a-col>
                  <a class="username">
                    <img
                        :src="`${userInfo['avatarUrl']}?param=50y50`" alt=""
                        class="user-avatar"
                    />
                    <span class="user-info-name">
                      <a-button type="text">{{userInfo['nickname']}}ssss</a-button>
                    </span>
                    <img
                      src="../../assets/images/vip.jpg"
                      class="img-vip"
                    />
                  </a>
                </a-col>
              </a-row>

              <a-row
                class="list2"
                type="flex"
                justify="space-between"
                align="middle"
              >
                <a-col :span="6"><strong>{{eventCount}}</strong><div>动态</div></a-col>
                <a-col :span="12"><strong>{{newFollows}}</strong><div>关注</div></a-col>
                <a-col :span="6"><strong>{{followeds}}</strong><div>粉丝</div></a-col>
              </a-row>
            </div>
          </a-spin>
        </template>
        <!--气泡内容-->

        <!--登录后  显示头像和昵称-->
        <div>
          <a-avatar
            size="30"
            shape="circle"
            :src="userInfo['avatarUrl']"
          />
          <a-button type="text" style="color: #fff;padding: 4px 8px;">{{userInfo['nickname']}}</a-button>
        </div>
        <!--登录后 显示头像和昵称-->
      </a-popover>
    </div>
  </div>
</template>

<script setup>

import {reactive, toRefs, watchEffect} from "vue"
import {useStore} from "vuex"
import api from "@/common/baseProxy"


const {state,commit} = useStore()

const userInfoState = reactive({
  // isLogin: false,
  // avatarUrl: 'http://p4.music.126.net/aG5zqxkBRfLiV7A8W0iwgA==/109951166702962263.jpg?param=50y50',
  // nickname: '追梦',
  loading: false,
  // 动态
  // eventCount: 1234,
  // // 关注量
  // newFollows: 4321,
  // // 粉丝量
  // followeds: 6789,

  async getUserDetail(userId){
    try {
      userInfoState.loading = true
      const res = await $axios.get('/api/user/detail?uid='+userId)
      // console.log(res.data);
      if ( res.status === 200 && res.data.code === 200 ){
        userInfoState.loading = false

        const {level,profile:{eventCount,newFollows, followeds,privateCount}} = res.data

        commit('setUserInfo',{
          ...state.userInfo,
          level,
          eventCount,
          newFollows,
          followeds,
        })
      }
    }catch (e) {
      console.log(e.message)
    }
  }

})
const {
  // isLogin,
  // avatarUrl,nickname,
  loading,
  // eventCount,newFollows,followeds,
} = toRefs(userInfoState)


const {
  isLogin,
  userInfo,
  userId,
} = toRefs(state)

const { level,eventCount,newFollows,followeds, } = toRefs(userInfo.value)
// console.log(state.userInfo.eventCount);

watchEffect(()=>{
  // console.log(userId)

  if ( userId && level === undefined ){
    userInfoState.getUserDetail(userId.value)
  }
})
</script>

<style lang="less" scoped>

.UserInfo {
  // 奇怪 无法设置
  :deep(.popover-width){
    width: 240px !important;
    border: 1px solid blue;
  }
}

.user-box {
  width: 240px !important;
  margin: -12px -16px;
  padding: 12px 16px;
  background: #fafafa;
  .user-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
  .username {
    color: #333;
  }
  .list2 {
    margin: 10px 0;
    .list2-item {
      text-align: center;
      display: block;
      color: #333;
      &:not(:last-child) {
        border-right: 1px solid #ddd;
      }
    }
  }
  .sign-point {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    line-height: 27px;
    text-align: center;
    color: #c62f2f;
    opacity: 0;
  }
  .sign-btn {
    height: 27px;
    padding: 0 8px;
  }
}
</style>