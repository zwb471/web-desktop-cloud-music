const MusicPlayHistoryPage  = ()=>import(
    "@/views/left-side-my-music/MusicPlayHistoryPage"
    )
const MusicDownloadPage  = ()=>import(
    "@/views/left-side-my-music/MusicDownload"
    )
const MusicCollectPage  = ()=>import(
    "@/views/left-side-my-music/MusicCollectPage"
    )



const myMusicRoutes =[
    {
        path: '/musicPlayHistory',
        component: MusicPlayHistoryPage,
        meta: {
            title: '最近播放',
            icon: ()=><HistoryOutlined />
        }
    },
    {
        path: '/musicDownload',
        component: MusicDownloadPage,
        meta: {
            title: '上传云盘',
            icon: ()=><CloudDownloadOutlined />,
            auth:true
        }
    },
    {
        path: '/musicCollect',
        component: MusicCollectPage,
        meta: {
            title: '我的音乐云盘',
            icon: ()=><UserAddOutlined />,
            auth:true
        }
    },

]
export default myMusicRoutes