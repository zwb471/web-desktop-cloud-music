<template>
  <div class='BasicHeaderIndex top-bar'>
    <!--Logo-->
    <div class="top-bar-logo">
      <img src="../../assets/images/logo.svg" alt="LOGO">
    </div>
    <!--Logo-->

    <div class="top-bar-main">
      <!--前进后退功能按钮-->
      <div class="top-bar-control">
        <HistoryActionButton />
      </div>
      <!--前进后退功能按钮-->

      <!-- 搜索框-->
      <div class="top-bar-search">
        <SearchBox />
      </div>
      <!-- 搜索框-->

      <!--右边菜单栏-->
      <div class="top-bar-menu">
        <!--功能按钮左侧-->
        <div class="top-bar-menu-user">
          <!--用户信息-->
          <div class="item">
            <UserInfo />
          </div>

          <!--主题设置-->
          <div class="item">
            <ThemeSet />
          </div>
          <!--主题设置-->

          <div class="item">
            <SettingOutlined />
          </div>
           
          <div class="item" v-if="isLogin"  @click="handleLogout">
            退出 
          </div>

          <div class="frame-actions">
               <BorderOutlined title="最大化" v-if="!isMax"
               @click="setFrame()"
                />
               <SwitcherOutlined title='还原' v-else  @click="setFrame()" />
          </div>
        
        </div>
        <!--功能按钮左侧-->
      </div>
      <!--右边菜单栏-->
    </div>

  </div>
</template>

<script>
  import {useStore} from "vuex"
  import {reactive, ref, toRefs} from "vue"
  import Cookies from "js-cookie"

import HistoryActionButton from "@/components/BasicHeader/HistoryActionButton"
import SearchBox from "@/components/BasicHeader/SearchBox"
import UserInfo from "@/components/BasicHeader/UserInfo"
import ThemeSet from "@/components/BasicHeader/ThemeSet"
export default {
  name: "BasicHeaderIndex",
  components: {ThemeSet, UserInfo, SearchBox, HistoryActionButton},
   setup(){
    const {state,commit}  = useStore();

    // const isMax = ref(true);
   const frameActionsState = reactive({
     isMax:true,
     setFrame(){

       this.isMax = !this.isMax;
       this.isMax ? document.documentElement.requestFullscreen() : document.exitFullscreen()
     },

     async handleLogout(){
       try{
        // const res = await $axios.get( '/api' + '/logout')
        const res = await $axios.get(  '/api/logout')
          // console.log(res.status);
          if ( res.status === 200 ){
            Cookies.remove('cookie')
            Cookies.remove('token')
            Cookies.remove('userId')

            commit('setUserId','')
            commit('setIsLogin',false)
            commit('setUserInfo',{})
          }

       }catch (e) {
          console.log(e.message)
        }
     }
   })
    
    return {
      ...toRefs(state),
      ...toRefs(frameActionsState)
    }
   }
}
</script>

<style lang="less" scoped>
.ant-popover-arrow {
  border-top-color: #fafafa !important;
  border-left-color: #fafafa !important;
}
.search-wrapper {
  dl,dd {
    margin-bottom: 0;
  }

  .search-content {
    display: flex;
    margin: -12px -16px;

    dl {
      width: 50%;
      font-size: 13px;

      &:not(:last-child) {
        border-right: 1px solid #eee;
      }
    }

    dt {
      padding: 7px 15px;
      border-bottom: 1px solid #eee;
      color: #999;
    }

    dd {
      padding: 0 15px;
      line-height: 28px;
      color: #111;

      &:hover {
        background: #eee;
      }
    }
  }

  .search-result {
    margin: -12px -16px;

    dt {
      padding: 7px 15px;
      background: #f3f5f9;
    }

    dd {
      padding: 0 5px 0 30px;
      line-height: 28px;
      color: #111;

      &:hover {
        background: #eee;
      }
    }
  }
}

.top-bar {
  display: flex;
  height: 100%;
  //overflow: hidden;

  .top-bar-logo {
    display: flex;
    align-items: center;
    width: 200px;
    flex: 0 0 200px;
    padding-left: 15px;

    img {
      width: 140px;
    }
  }

  .top-bar-main {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top-bar-search {
      width: 240px;
      flex: 0 0 240px;
      -webkit-app-region: no-drag;
    }

    .top-bar-control  {
      margin-right: 5px;
      -webkit-app-region: no-drag;

      :deep(.ant-btn) {
        height: 24px;
        line-height: 22px;
      }
    }
  }
}

.top-bar-menu {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  height: 100%;

  .top-bar-menu-user {
    display: flex;
    -webkit-app-region: no-drag;

    .item {
      display: inline-flex;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: rgba(255, 255, 255, 1);
      }

      .ant-badge-count {
        height: 16px;
        line-height: 16px;
        min-width: 16px;
        padding: 0 5px;
        background: #fff;
        color: #c62f2f;
        box-shadow: none;
        border-radius: 8px;
      }

      .avatar {
        margin-right: 8px;
        border-radius: 50%;
      }

      .icon {
        font-size: 16px;
      }
    }
  }
}

.header-user {
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 0.3s;

  .header-user-info {
    display: flex;
    align-items: center;
  }

  span {
    font-size: 13px;
    letter-spacing: 2px;
  }
}

.user-info-name {
  display: inline-block;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.frame-actions {
  display: flex;
  align-items: center;
  margin-right: 10px;
  -webkit-app-region: no-drag;

  &::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 20px;
    margin-right: 8px;
    background: #ddd;
  }

  .item {
    padding: 0 4px;
    line-height: 54px;
    height: 50px;
    vertical-align: unset;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
