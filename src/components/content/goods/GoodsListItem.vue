<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collection">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('itemImgLoad')           
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)      
    }
  },
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5%;
  }

  .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
  }
  
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collection {
    position: relative;
  }

  .goods-info .collection::before {
    content: '';
    position: absolute;
    top: 0;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg")0 0/14px 14px;
  }

</style>