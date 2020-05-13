<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl1" 
      class="tab-control"
      v-show="isShowTabControl"></tab-control>
    <scroll 
    class="content" 
    ref="scroll" 
    :probe-type="3"
    :pull-up-load="true"
     @scroll="contentScroll"
     @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import BackTop from 'components/content/backtop/BackTop'

import { getHomeMultidata, getHomeGoods } from "network/home"
import { itemListenerMixin } from 'common/mixin'

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      isShowTabControl: false,
      tabControlOffsetTop: 0,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin],
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
    
  },

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 500)

    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存 y值
    this.saveY = this.$refs.scroll.scroll.y
    
    // 2.当页面跳转到其他页面时就取消全局事件监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },

  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /**
     * 事件监听相关的方法
     */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;         
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 内容滚动
    contentScroll(position) {
      // console.log(position.y);
      // 1.判断返回顶部按钮是否显示
      this.isShowBackTop = (-position.y) > 1000
      
      // 2.判断tabContorl 是否显示
      this.isShowTabControl = (-position.y) > this.tabControlOffsetTop
    },
    // 下拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    // TabControl吸顶效果
    swiperImgLoad() {
    // 获取吸顶元素的 offsetTop
      // 每一个组件都一个$el属性，用于获取组件内的元素
    this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关的方法
     */

    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res.data.list);
        // 将请求过来的数据 push 到对应 list 中
        this.goods[type].list.push(...res.data.list); // 数组解构

        // 由于已经请求过来了第一页的数据，所以要将 page 加1
        this.goods[type].page += 1;

        //pullingUp默认只能加载一次，finishPullUp是为了让商品能够继续的加载更多
        this.$refs.scroll.finishPullUp()
      });
    }
  }
};
</script>

<style scoped>
  #home {
    position: relative;
    /* padding-top: 44px; */
    height: 100vh;
  }
  .home-nav {
    /* 在使用浏览器原生滚动时，为了让导航栏不跟随一起滚动 */
    /* position: fixed;
    top: 0;
    right: 0;
    left: 0; 
    z-index: 9;*/

    background-color: var(--color-tint);
    color: #fff;
   
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>