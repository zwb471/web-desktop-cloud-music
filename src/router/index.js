import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import myMusicRoutes from "@/router/modules/myMusic"
import recommendRoutes from "@/router/modules/recommend"
import SongListPage from "@/views/right-content/SongListPage";
import TracksPage from "@/views/right-content/songList/TracksPage";
import Comment from "@/views/right-content/songList/CommentPage";
import SubscriberPage from "@/views/right-content/songList/SubscriberPage";
import SongPage from "@/views/right-content/SongPage";
import Cookies from "js-cookie";
import store from "../store/index"
import {next} from "loadsh/seq";
// console.log(...recommendRoutes)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

  //  子路由
     children:[
         // 推荐
         ...recommendRoutes,
         ...myMusicRoutes,

         {
             path:'/songList',
             component:SongListPage
         },
         {
             path:'/songList/:id',
             component: SongListPage,
             children:[
                 {
                     path: '/songList/:id/tracks',
                     component:TracksPage
                 },{
                     path: '/songList/:id/comment',
                     component:Comment
                 },{
                     path: '/songList/:id/subscriber',
                     component:SubscriberPage
                 },
             ]

         },
         {
             path: '/song',
             component: SongPage
         },
     ]
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]


//上线哈希漏油
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  // history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
    if(to.meta && to.meta['auth']){

        const userId = Cookies.get('userId');
        if(userId){
            next()
        }else {
            //    没有登录直接挑转到登录页面
            store.commit('setIsShowLoginWindow',true)
        }
    }else {
        //不需要验证
        next()
    }

})

router.afterEach((to)=>{
    if ( to.meta && to.meta['title'] ){
        document.title = to.meta['title']
    }
})

export default router
