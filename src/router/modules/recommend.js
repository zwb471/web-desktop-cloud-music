import myMusicRoutes from "@/router/modules/myMusic";
import topMenuRoutes from "@/router/modules/topMenu";

const DiscoverMusicPage  = ()=>import(
    "@/views/left-side-recommend/DiscoverMusicPage"
    )
const PrivateFmPage  = ()=>import(
    "@/views/left-side-recommend/PrivateFmPage"
    )
const VideoPage  = ()=>import(
    "@/views/left-side-recommend/VideoPage"
    )



// const recommend = [
//     {
//         name: "discover_music",
//         meta: { title: "发现音乐", icon: () => <WifiOutlined /> },
//     },
//     {
//         name: "private_fm",
//         meta: { title: "私人FM", icon: () => <RedditOutlined /> },
//     },
//     {
//         name: "mv",
//         meta: { title: "视频", icon: () => <VideoCameraAddOutlined /> },
//     },
// ];

const recommendRoutes =[
    {
        path: '/',
        component: DiscoverMusicPage,
        meta: {
            title: '最近播放',
            icon: ()=><WifiOutlined />
        },
        children:[
            // 推荐
            // topMenuRoutes
            ...topMenuRoutes

        ]
    },
    {
        path: '/privateFM',
        component: PrivateFmPage,
        meta: {
            title: '私人FM',
            icon: () => <RedditOutlined/>
        }
    },
    {
        path: '/video',
        component: VideoPage,
        meta: {
            title: '视频',
            icon: () => <VideoCameraAddOutlined/>,
            auth: true,
        }
    },

]
export default recommendRoutes