<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendInfo" class="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top v-show="showBackTop" @click.native="backTop"></back-top>
    
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import { getDetailData, Goods, Shop, GoodsParam, getRecommendData } from 'network/detail'
import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { BACKTOP_DISTANCE } from 'common/const'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      infoTopYs: [],
      getInfoTopY: null,
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop
  },
  created() {
    // 1.保存传入的 iid
    this.iid = this.$route.params.iid

    // 2.根据传入的 iid 请求数据
    getDetailData(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      // 2.1 顶部轮播图的数据
      this.topImages = data.itemInfo.topImages

      // 2.2 获取商品数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 2.3 获取店铺数据
      this.shop = new Shop(data.shopInfo)

      // 2.4 获取商品详细数据
      this.detailInfo = data.detailInfo

      // 2.5 获取参数数据
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 2.6 获取评论数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0]
      }

      // 3.请求推荐数据
      getRecommendData().then(res => {
        res.data.list ? this.recommendInfo = res.data.list : ''
      })

      // 4.给 getInfoTopY 赋值
      this.getInfoTopY = debounce(() => {
        this.infoTopYs = []
        this.infoTopYs.push(0)
        this.infoTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.infoTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.infoTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.infoTopYs.push(Number.MAX_VALUE)
        // console.log(this.infoTopYs);
      }, 1000)

      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM是已经渲染出来了
      //   // 但是图片依然没有加载完(目前获得的offsetTop 不包括图片)
      //   this.infoTopYs = []
      //   this.infoTopYs.push(0)
      //   this.infoTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.infoTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.infoTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.infoTopYs);
      // })

    })
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
      this.getInfoTopY()      
    },
    titleClick(index) {      
      this.$refs.scroll.scrollTo(0, -this.infoTopYs[index], 200)
    },
    contentScroll(position) {
      const positionY = -position.y - 44
      // 监听回到顶部按钮是否显示
      this.showBackTop = position.y < -BACKTOP_DISTANCE
      
      let length = this.infoTopYs.length

       for(let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.infoTopYs[i] && positionY < this.infoTopYs[i+1] 
        )) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // for(let i = 0; i < length; i++) {
      //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.infoTopYs[i]) && positionY < this.infoTopYs[i+1] 
      //   || (i === length -1 && positionY >= this.infoTopYs[i]))) {
      //     this.currentIndex = i
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
    },
    // 添加到购物车
    addCart() {
      // 获取购物车需要的数据
      const obj = {}
      obj.iid = this.iid
      obj.imgUrl = this.topImages[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc
      obj.newPrice = this.goods.realPrice

      // 调用 vuex 里面的 mutations
      // this.$store.commit('addCart', obj)

      // 调用 vuex 里面的 actions
      this.$store.dispatch('addCart', obj).then(res => {
        console.log(res);
        
      })

    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }

</style>