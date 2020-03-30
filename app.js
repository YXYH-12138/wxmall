App({
  //添加到购物车
  addToCart(obj) {
    let cartList = this.globalData.cartList
    //查找购物车看是否有相同商品
    let cartItem = cartList.find(item => item.iid === obj.iid)
    cartItem ? cartItem.count++ : cartList.push(obj)
    // 购物车回调
    this.addCartCallback && this.addCartCallback()
  },
  globalData: {
    cartList: []
  }
})