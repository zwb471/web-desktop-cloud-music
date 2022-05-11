import api from "@/common/baseProxy"

// 歌单评论
export function getPlaylistComment(id, limit = 20, offset = 0) {
    return $axios.get(api +  "/comment/playlist", {
        params: {
            id,
            limit,
            offset,
        },
    });
}

// 发送/删除评论
/**
 *
 * @param t: 1 发送, 2 回复
 * @param type:  数字,资源类型,对应 0 歌曲,1 mv,2 歌单,3 专辑,4 电台,5 视频,6 动态
 * @param id: 对应资源 id
 * @param content: 要发送的内容
 */
export function sendComment(t=1,type= 2,id= 0,content='test') {
    return $axios.get( api + '/comment?t='+t+'&type='+type+'&id='+id+'&content='+content)
}

// 歌单收藏者
export function getSongSheetSubscribers(id=0) {
    return $axios.get(api + '/playlist/subscribers?id='+id+'&limit=30')
}


export function getAlbumComment(id, limit = 20, offset = 0) {
    return $axios.get(api + "/comment/album", {
        params: {
            id,
            limit,
            offset,
        },
    });
}

export function getMVComment(id, limit = 20, offset = 0) {
    return $axios.get(api + "/comment/mv", {
        params: {
            id,
            limit,
            offset,
        },
    });
}

export function getVideoComment(id, limit = 20, offset = 0) {
    return $axios.get(api + "/comment/video", {
        params: {
            id,
            limit,
            offset,
        },
    });
}

export function getSongComment(id, limit = 20, offset = 0, before = "") {
    return $axios.get(api + "/comment/music", {
        params: {
            id,
            limit,
            offset,
            before,
        },
    });
}

export function getDjComment(id, limit = 20, offset = 0, before = "") {
    return $axios.get(api + "/comment/dj", {
        params: {
            id,
            limit,
            offset,
            before,
        },
    });
}

