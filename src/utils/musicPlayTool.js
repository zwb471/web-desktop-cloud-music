import { notification } from 'ant-design-vue';
import store from "../store/index"
import getSingerName from "@/utils/getSingerName"
const musicPlayTool = async (playSongLost,index)=>{
//判断是不有歌曲
//     有歌曲可以播放
  if(store.state.playSongList.length){

      const  r = await store.dispatch('getMusicUrl',{
          id: playSongLost[index]['id'],
          name: playSongLost[index]['name'],
          author: playSongLost[index]['ar'] ? getSingerName(playSongLost[index]['ar']) : getSingerName(playSongLost[index]['artists']),
          pic: playSongLost[index]['ar'] ? playSongLost[index]['al']['picUrl'] : playSongLost[index]['album']['picUrl'],
      })
      // 判断歌曲 是否有版权
      if(!r){
          notification.open({
              message: '此歌曲无版权，无法播放',
              description: playSongLost[index]['name'],
              onClick: () => {
                  console.log('Notification Clicked!')
              },
          })
          return false
      }
  await  store.commit('playMusic')
      store.dispatch('getMusicLyric',playSongLost[index]['id'])
  }
    // return musicPlayTool
}

export default musicPlayTool