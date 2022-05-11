<template>
  <div class="SingerPage">
    <!--歌手类型-->
    <div class="singer-cate">
      <div class="cate-wrap">
        <!--
            <div class="cate" >
                <h2 class="title">推荐</h2>
                <ul class="item">
                    <li>
                        <a href="javascript:;" class="name">华语男歌手</a>
                        <a href="javascript:;" class="name">华语女歌手</a>
                        <a href="javascript:;" class="name">华语组合/乐队</a>
                    </li>
                </ul>
            </div>
        -->
        <div class="cate" v-for="(item,index) in artistCateList" :key="item.area">
          <h2 class="title">{{item.cate}}</h2>
          <ul class="item">
            <li>
              <a
                  class="name"
                  v-for="sub in item.types"
                  :key="sub.type"
                  @click="getSingerListData(item.area,sub.type,sub.name)"
              >
                {{sub.name}}
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <!--歌手类型-->

    <!--歌手列表-->
    <div class="singer-list-wrapper">
      <h3 class="cate-type">{{cateType}}</h3>

      <!--字母表-->
      <ul class="initial" ref="initial">
        <li @click="handleLetter(-1,$event)">
          <a href="javascript:;" class="hot" code="-1">热门</a>
        </li>
        <li v-for="(item,index) in az" :key="index" @click="handleLetter(item,$event)">
          <a href="javascript:;" :code="item">{{item}}</a>
        </li>

        <li @click="handleLetter(0,$event)">
          <a href="javascript:;" class="hot" code="0" >其他</a>
        </li>
      </ul>
      <!--字母表-->

      <!--歌手列表-->
      <ul class="singer-list">

        <!--带封面图-->
        <template v-for="(item,index) in singerList.slice(0,10)" :key="item.id">
          <li v-if="index<10" :key="item.id">
            <div class="pic" :title="item.name" >
              <img
                  :src="item['img1v1Url']+'?param=160y160'"
                  v-lazy="item['img1v1Url']+'?param=160y160'"
                  alt=""
              />
              <p class="bgImg"></p>
            </div>

            <a href="javascript:;" class="name" title="">{{item.name}} <i v-if="item.alias.length<2"> </i></a>
          </li>
        </template>

        <a-divider type="horizontal" />

        <!--不带封面图-->
        <template v-for="(item,index) in singerList" :key="item.id">
          <li class="small" :key="item.id" v-if="index>=10">
            <a href="javascript:;" class="name" title="">{{item.name}} <i v-if="item.alias.length<2"></i></a>
          </li>
        </template>
      </ul>
      <!--歌手列表-->
    </div>
    <!--歌手列表-->
  </div>
</template>

<script>
// import {Image,Divider} from 'element-ui'
import api from "@/common/baseProxy"

export default {
  name: "SingerPage",
  alias: '歌手页面',
  components: {
    // [Image.name]: Image,
    // [Divider.name]: Divider,
  },
  data(){
    return {
      artistCateList:[
        {
          cate: '华语',
          area: 7,
          types: [
            {
              name: '华语男歌手',
              type: 1
            },
            {
              name: '华语女歌手',
              type: 2
            },
            {
              name: '华语组合/乐队',
              type: 3
            },
          ]
        },
        {
          cate: '欧美',
          area: 96,
          types: [
            {
              name: '欧美男歌手',
              type: 1
            },
            {
              name: '欧美女歌手',
              type: 2
            },
            {
              name: '欧美组合/乐队',
              type: 3
            },
          ]
        },
        {
          cate: '日本',
          area: 8,
          types: [
            {
              name: '日本男歌手',
              type: 1
            },
            {
              name: '日本女歌手',
              type: 2
            },
            {
              name: '日本组合/乐队',
              type: 3
            },
          ]
        },
        {
          cate: '韩国',
          area: 16,
          types: [
            {
              name: '韩国男歌手',
              type: 1
            },
            {
              name: '韩国女歌手',
              type: 2
            },
            {
              name: '韩国组合/乐队',
              type: 3
            },
          ]
        },
        {
          cate: '其他',
          area: 0,
          types: [
            {
              name: '其他男歌手',
              type: 1
            },
            {
              name: '其他女歌手',
              type: 2
            },
            {
              name: '其他组合/乐队',
              type: 3
            },
          ]
        },
      ],
      singerList: [],
      az: [],
      area: 7,
      type: 2,
      initial: -1,
      cateType: '华语女歌手'
    }
  },
  created() {
    this.getSingerListData()
    this.createAZ()
  },
  methods: {
    async getSingerListData(area=7,type=2,cateType='华语女歌手',initial=-1){
      this.area = area
      this.type = type
      this.initial = initial
      this.cateType = cateType

      const response = await $axios.get( '/api/artist/list?type='+type+'&area='+area+'&initial='+initial+'&limit=100')
      const result = await response.data

      this.singerList = result['artists']
    },
    // 生成 a-z
    createAZ(){
      const arr = [];
      for(let i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i));
      }
      // console.log(arr)
      this.az = arr
    },
    // 处理字母
    handleLetter(initial,e){
      const ul = this.$refs.initial
      const aLi = ul.children
      // 类数组 转换为真数组
      Array.from(aLi).forEach((item,index)=>{
        item.querySelector('a').classList.remove('active')
      })

      e.target.classList.toggle('active')
      const {area,type,cateType} = this
      this.getSingerListData(area,type,cateType,initial)
    }
  }
}
</script>

<style lang="less" scoped>
.SingerPage{
  width: 980px;
  min-height: 700px;
  //_height: 700px;
  margin: 0 auto;
  background:#fff url("/static/wrap2.png") repeat-y center 0;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;

  display: flex;
  justify-content: space-between;

  /*歌手类型*/
  .singer-cate{
    width: 180px;

    .cate-wrap{
      margin-top: 0;
      padding: 0 10px 40px;
      //border: 1px fuchsia solid;

      .cate{
        //margin: 5px 0 0;
        padding-top: 16px;
        border-top: 1px solid #d3d3d3;

        .title{
          height: 25px;
          padding-left: 14px;
          font-size: 16px;
        }

        ul.item{
          li{
            width: 160px;
            margin-bottom: 2px;

            a.name{
              display: block;
              width: 133px;
              height: 29px;
              line-height: 29px;
              padding-left: 27px;
              background: url("/static/singer.png") no-repeat 0 -30px;
              color: #333;
            }
            a.active{
              background-position: 0 0;
              text-decoration: none;
              color: #c20c0c;
            }
          }

        }

      }
    }
  }

  /*歌手列表*/
  .singer-list-wrapper{
    flex: 1;
    padding: 20px;

    .cate-type{
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      font-size: 24px;
      font-weight: normal;
    }

    .initial{
      margin-top: 20px;
      margin-left: -3px;
      display: flex;

      li{
        margin-left: 3px;
        font-size: 14px;

        .active{
          background: #c20c0c;
          color: #fff !important;
        }

        a{
          display: block;

          width: 21px;
          line-height: 24px;
          text-align: center;
          color: #333;

          &:hover{
            color: #c20c0c;
            font-weight: bold;
          }
        }
        .hot{
          display: block;
          width: 45px;
          height: 24px;
          background: #c20c0c;
          border-radius: 2px;
          color: #fff;

          &:hover{
            color: #fff;
            font-weight: bold;
          }
        }
      }
    }

    .singer-list{
      margin: 20px 0 0 -17px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      li{
        padding-left: 17px;
        padding-bottom: 20px;
        width: 130px;
        height: 154px;
        overflow: hidden;
        line-height: 1.4;
        box-sizing: unset;




        .pic{
          width: 130px;
          height: 130px;
          overflow: hidden;

          position: relative;
          overflow: hidden;

          img{
            width: 100%;
            height: 100%;
            display: block;
          }

          .bgImg{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background: url("/static/coverall.png") no-repeat 0 -680px;

          }
        }
        .name{
          margin-top: 8px;
          color: #000;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        i{
          display: inline-block;
          width: 17px;
          height: 18px;
          background: url("/static/icon.png") no-repeat 0 -740px;
          margin: 0 0 0 5px;
        }
      }
      .small{
        height: 30px;
        width: 130px;
        padding-bottom: 0;
        line-height: 23px;

        .name{
          justify-content: flex-start;
        }
      }
    }
  }

}
</style>
