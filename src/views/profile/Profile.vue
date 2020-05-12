<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的档案</div></nav-bar>
    <user-info/>
    <account-info/>
    <list-view :list-data="orderList"/>
    <list-view :list-data="serviceList"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import UserInfo from './childComps/UserInfo'
  import AccountInfo from './childComps/AccountInfo'
  import ListView from './childComps/ListView'
  export default {
    name: "Profile",
    components: {
    	NavBar,
      UserInfo,
      AccountInfo,
      ListView
    },
    data() {
    	return {
		    orderList: [
			    {icon: 'message.png', info: '我的消息'},
			    {icon: 'pointer.png', info: '积分商城'},
			    {icon: 'vip.png', info: '会员卡'},
		    ],
		    serviceList: [
			    {icon: 'cart.png', info: '我的购物车'},
			    {icon: 'shopping.png', info: '下载购物APP'},
		    ]
      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>