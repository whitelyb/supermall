<template>
  <div class="">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div 
        class="title-item"
        v-for="(item, index) in title" 
        :key="index"
        :class="{active: currentIndex === index}"
        @click="itemClick(index)">
        {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "DetailNavBar",
  data() {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', this.currentIndex)
    },
    backClick() {
      this.$router.back()
    }
  },
}
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .back {
    margin-top: 7px;
  }

  .active {
    color: var(--color-high-text);
  }

</style>