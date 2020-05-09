<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a href="item.link">
        <img :src="item.image" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad() {
      // 因为只要第一张图片加载完毕后我们就能得到轮播图区域的高度了，所以为了性能优化需要加个判断
      if(!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
    }
  },
};
</script>

<style>
</style>