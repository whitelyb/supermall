import { debounce } from 'common/utils'

import {POP, NEW, SELL} from "./const";

export const backTopMixin = {
  data() {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      //保存防抖过得刷新函数，可以在其他地方调用
      mixinRefresh: null
    }
  },
  mounted() {
    this.mixinRefresh = debounce(this.$refs.scroll.refresh, 100)

    this.itemImgListener = () => this.mixinRefresh()
    
     // 监听item 中图片加载完成
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}