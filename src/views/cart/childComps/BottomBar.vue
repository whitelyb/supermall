<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @click.native="checkBtnClick" v-model="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{ totalPrice }}</span>
    <span class="buy-product" @click="calcClick">去计算({{ cartCount }})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

  import { mapGetters } from 'vuex'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
		  totalPrice() {
        const cartList = this.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.newPrice
        }, 0).toFixed(2)
      },
      cartCount() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // 性能不好
        // return !(this.$store.getters.cartList.filter(item => !item.checked).length)
        if(this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      // 全选按钮
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.cartList.find(item => !item.checked);
        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.cartList.forEach(item => {
            item.checked = true;
          })
        } else {
          this.cartList.forEach(item => {
            item.checked = false;
          });
        }
      },

      calcClick() {
        this.$toast.show('请选择购买的商品', 1000)
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .08);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>