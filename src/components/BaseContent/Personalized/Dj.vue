<template>
  <div class="Dj">
<!--    <h1>Dj</h1>-->
    <ul class="list">
<!--      <DjItem-->
<!--          class="list-item"-->
<!--          v-for="item in dj.slice(0,6)"-->
<!--          :dj="item"-->
<!--          :key="item['id']"-->
<!--      />-->
<!--    </ul>-->


      <li class="list-item "
        v-for="(item,index) in dj.slice(0,6)"
          :key="item.id"
      >
        <a tag="li" :to="`/dj/${item.id}`" class="item">
          <figure class="info">
                      <img class="avatar" v-lazy="item.picUrl" />
            <div class="top">
              {{ item.category }}
            </div>
            <div class="bottom" v-if="item.copywriter">
              <span>{{ item.copywriter }}</span>
            </div>
          </figure>
          <div class="intro">
            <div class="name">{{ item.name }}</div>
            <div class="desc" v-if="dj.description">{{ item.description }}</div>
            <slot name="price"></slot>
          </div>
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
import DjItem from "@/components/BaseContent/Personalized/DjItem";
import {reactive, toRefs,} from "vue"
export default {
  name: "Dj",
  components:{
    DjItem
  },
  setup(){
    const djState = reactive({
      dj: [],
      async getDjList(){
        try {
          const res= await $axios.get('/api/dj/hot')
          this.dj = res['data']['djRadios']
          console.log(this.dj)
        }catch (e) {
          console.log(e.message)
        }
      }
    })

    djState.getDjList()

    return {
      ...toRefs(djState)
    }
  }
}
</script>

<!--<script>-->
<!--export default {-->
<!--  name: "DjItem",-->
<!--  data(){-->
<!--    return{-->
<!--      layout:'',-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    itemCls() {-->
<!--      return this.layout === "horizon" ? "item horizon" : "item";-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-between;
  .list-item {
    width: 15%;
    width: 218px;
    height: 218px;
    .item {
      display: flex;
      flex-direction: column;
      _margin-bottom: 20px;
      overflow: hidden;
      cursor: pointer;

      color: rgba(0, 0, 0, 0.85) !important;

      &.horizon {
        flex-direction: row;
        .info {
          flex: 1;
        }

        .intro {
          flex: 2;
          .name {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;


          }
        }
      }
      .info {
        position: relative;
        padding-top: 100%;
        width: 100%;
        margin: 0;
        color: #fff;
        font-size: 13px;
        .avatar {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: block;
          width: 100%;
          height: 100%;
          //width: 218px;
          //height: 218px;
        }

        .top,
        .bottom {
          position: absolute;
          left: 0;
          padding: 0 10px;
        }
        .top {
          top: 0;
          padding: 0 10px;
          line-height: 24px;
          background: #c62f2f;
          color: #fff;
          border-radius: 0 0 21px 0;
        }
        .bottom {
          width: 100%;
          bottom: 0;
          padding-right: 30px;
          line-height: 30px;
          background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.5),
              transparent
          );
        }
        .bottom {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .intro {
        overflow: hidden;
        .name {
          padding: 4px;

          &:hover{
            color: rgba(0, 0, 0, 0.95) !important;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>