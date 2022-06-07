import PersonalizedRecommendPage from "@/views/right-content/PersonalizedRecommendPage";
import SongSheetPage from "@/views/right-content/SongSheetPage";
import RankPage from "@/views/right-content/RankPage";
import SingerPage from "@/views/right-content/SingerPage";
import NewMusicPage from "@/views/right-content/NewMusicPage";


const topMenuRoutes =[
    {
        path: '/',
        component: PersonalizedRecommendPage,
        meta: {
            title: '个性推荐'
        }
    },
    {
        path: '/songSheet',
        component: SongSheetPage,
        meta: {
            title: '歌单'
        }
    },
    {
        path: '/rank',
        component: RankPage,
        meta: {
            title: '排行榜'
        }
    },
    {
        path: '/singer',
        component: SingerPage,
        meta: {
            title: '歌手'
        }
    },
    {
        path: '/newMusic',
        component: NewMusicPage,
        meta: {
            title: '最新音乐'
        }
    },
]
export default topMenuRoutes