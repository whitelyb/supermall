
<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <cart-list class="cart-list"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar'

  import { mapGetters } from 'vuex'

	export default {
		name: "Cart",
    components: {
		  NavBar,
      CartList,
      BottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
  
    }
	}
</script>

<style scoped>
  #cart {
    position: relative;
    height: 100vh;
    margin-bottom: 44px;
  }
  .nav-bar {
    position: absolute;
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 93px;
    width: 100%;
  }
</style>
