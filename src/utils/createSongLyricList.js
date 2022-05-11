const createSongLyricList = (songLyric='[00:00.000] 作词 : 戏子\\n[00:01.000] 作曲 : 珞寻Lance\\n[00:06.460]策划：惊弦 识怜\\n[00:07.954]作词：戏子\\n[00:09.712]作编曲：珞寻\\n[00:11.464]歌手：旧是旧人\\n[00:13.212]demo演唱：小吃狼\\n')=>{
    const list = []
    const lycArr = songLyric.split('[')
    for (let i = 0; i < lycArr.length; i++) {
        const arr = lycArr[i].split(']')
        // 歌词
        const text = arr[1]
        // 时间
        const time = arr[0].split('.')
        const timer = time[0].split(':')
        const ms = timer[0]*60 + timer[1] * 1
        if ( text && !isNaN(ms) ){
            list.push({
                ms,text
            })
        }
    }

    return list
}


export default createSongLyricList