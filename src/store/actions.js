export default {
  addCart(context, payload) {
   return new Promise((resolve, reject) => {
      // 查看是否添加的是同一商品
    const oldInfo = context.state.cartList.find(item => item.iid === payload.iid)   
    
    // +1 或者新添加一件商品
    if(oldInfo) {
      // payload.count +=1
      context.commit('addCounter', oldInfo)
      resolve('当前商品数量+1')
    }else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit('addToCart', payload)
      resolve('添加了新的商品')
    }
   })
  }
}