<template>
  <div class="goods">
    <goods-list-item 
    v-for="item in goods" 
    :key="item.acm" 
    :goods-item="item"/> 
  </div>
</template>

<script>

import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>