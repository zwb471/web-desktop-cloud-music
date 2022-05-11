<template>
  <div class="PersonalizedRecommendPage">
<!--    <h1>PersonalizedRecommendPage</h1>-->
      <Banner
          :list="bannerList"
          :data-w="width"
          :height="width * 0.7 * 0.372"
          @sliderClick="onSliderClick"
          :autoPlay="true"
      />


    <!--推荐MV-->
    <a-card title="推荐MV">
      <template #extra>
        <a href="javascript:">更多 <ArrowRightOutlined /></a>
      </template>

      <MV />

    </a-card>
    <!--推荐MV-->

    <a-card title="推荐歌单">
      <template #extra>
<!--        <a href="javascript:">更多 <ArrowRightOutlined /></a>-->
      </template>

      <song-sheet />

    </a-card>

    <!--主播电台-->
    <a-card title="主播电台">
      <template #extra>
        <!--          <a href="javascript:">更多 <ArrowRightOutlined /></a>-->
      </template>
      <Dj />
    </a-card>
    <!--主播电台-->
  </div>
</template>

<script>
import Banner from "@/components/Global/Banner";
import {reactive,toRefs} from "vue";
import MV from "@/components/BaseContent/Personalized/MV";
import Dj from "@/components/BaseContent/Personalized/Dj";
import SongSheet from "@/components/BaseContent/Personalized/SongSheet";
export default {
  name: "PersonalizedRecommendPage",
  components:{
    SongSheet,
    Banner,
    MV,
    Dj,
  },
  setup(){
    const personalizedState = reactive({
      bannerList:[],
      width: 1000,
      slider: null,

      async getBannerList(){
        try {
            const res = await $axios.get('api/banner?type=0')


          this.bannerList = res.data.banners
          // console.log(this.bannerList)
        }catch (e){
          console.log(e.message)
        }
      },
      onSliderClick(i,item){
        if (item.url){
          window.open(item.url)
        }
      }
    })
    personalizedState.getBannerList()

    return{

      ...toRefs(personalizedState)
    }
  }
}
</script>

<style lang="less" scoped>

</style>