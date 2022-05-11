<template>
  <div class="item">
    <div class="info" @click="play(video.id)">
      <img
          width="100%"
          height="100%"
          class="avatar"
          :src="video.coverUrl"
          v-lazy="video.coverUrl"
          alt=""
      />
      <div class="top">
        <VideoCameraAddOutlined />
        {{ numFormat(video.playTime) }}
      </div>
      <div class="bottom">
        <span>{{ timeFormat(video.durationms/1000) }}</span>
      </div>
      <PlayCircleOutlined />

    </div>

    <div class="name" @click="play(video.id)">{{ video.name }}</div>

    <template v-if="showCreator">
      <router-link to="/" v-if="video.creator.nickname" class="creator">
        by {{ video.creator.nickname }}
      </router-link>
      <div class="creator" v-else>
        by
        <router-link
            v-for="item in video.creator"
            :key="item.userId"
            to="/"
        >{{ item.userName }}</router-link>
      </div>
    </template>
  </div>
</template>

<script>
import {numFormat} from "@/utils/format"
import {timeFormat} from "@/utils/format"

export default {
  name: "VideoItem",
  props: {
    video: {
      type: Object,
    },
    showCreator: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    //console.log(this.video)
  },
  setup(){

    const play = (vid)=>{

    }

    return {
      play,
      numFormat,
      timeFormat,
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  flex-direction: column;
  _margin-bottom: 20px;
  .info {
    position: relative;
    padding-top: 56.15%;
    overflow: hidden;
    width: 100%;
    margin: 0;
    color: #fff;
    font-size: 13px;
    &:hover {
      .play-icon {
        display: block;
      }
    }
    .avatar {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    .top,
    .bottom {
      position: absolute;
      left: 0;
      width: 100%;
      padding: 0 10px;
    }
    .top {
      top: 0;
      line-height: 22px;
      background: linear-gradient(
          to left,
          rgba(0, 0, 0, 0.25),
          transparent
      );
      text-align: right;
    }
    .bottom {
      bottom: 0;
      line-height: 27px;
      background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.5),
          transparent
      );
      color: rgba(255, 255, 255, 0.8);
    }
    .play-icon {
      display: none;
      position: absolute;
      right: 5px;
      bottom: 5px;
      font-size: 30px;
      color: rgba(255, 255, 255, 0.5);
    }
    .bottom {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .name {
    padding: 4px;
    font-size: 13px;
    color: #333;
  }
  .creator {
    color: #999;
    a {
      color: #999;
    }
  }
}
</style>
