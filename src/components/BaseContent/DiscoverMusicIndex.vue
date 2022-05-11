<template>
  <div class="DiscoverMusicIndex">
<!--    <h1>DiscoverMusicIndex</h1>-->
<!--    <div>{{msg}}</div>-->
    <a-tabs v-model:activeKey="activeKey"
      @tabClick="tabClick"
            :tabBarGutter="30"
    >
      <a-tab-pane
          style="height: 200px"
          v-for="item in topMenuRoutes" :key="item['path']"
      >
        <template #tab>
          <router-link :to="item['path']"
                       :style="{color: $store.state.themeColor}"
          >
            {{item['meta']['title']}}
          </router-link>
        </template>
      </a-tab-pane>
<!--      <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>-->
<!--      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>-->
<!--      <template #renderTabBar="{ DefaultTabBar, ...props }">-->
<!--        <component-->
<!--            :is="DefaultTabBar"-->
<!--            v-bind="props"-->
<!--            :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"-->
<!--        />-->
<!--      </template>-->
    </a-tabs>
    <router-view />
  </div>
</template>

<script>
import {reactive, toRefs,watchEffect} from "vue"
import topMenuRoutes from "@/router/modules/topMenu";
import {useRouter,useRoute,} from "vue-router"
export default {
  name: "DiscoverMusicIndex",
  setup(){
    const Router = useRouter()
    const Route = useRoute()
    // return new Promise((resolve,reject)=>{
    //   setTimeout(()=>{
    //     resolve({
    //       msg:'异步'
    //     })
    //   },2000)
    // })
        const discoverState = reactive({
          activeKey: '/',
          tabClick(e){
            console.log(e)
          },
          // topMenuRoutes:[
          //   {
          //     path: '/',
          //     meta: {
          //       title: '个性推荐'
          //     }
          //   },
          //   {
          //     path: '/songSheet',
          //     meta: {
          //       title: '歌单'
          //     }
          //   },
          //   {
          //     path: '/rank',
          //     meta: {
          //       title: '排行榜'
          //     }
          //   },
          //   {
          //     path: '/singer',
          //     meta: {
          //       title: '歌手'
          //     }
          //   },
          //   {
          //     path: '/newMusic',
          //     meta: {
          //       title: '最新音乐'
          //     }
          //   },
          // ]
        })
    Router.push(discoverState.activeKey) //跳转对应ye
    // console.log(topMenuRoutes)
    watchEffect(()=>{
      if ( Route['path'] ){
        const isTrue = topMenuRoutes.some((item,index)=>{
          return item['path'] === Route['path']
        })

        if (isTrue){
          discoverState.activeKey = Route['path']
        }

      }

    })
    return{
      // activeKey
      ...toRefs(discoverState ),
      topMenuRoutes
    }
  }

}
</script>

<style lang="less" scoped>

</style>