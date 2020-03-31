const app = getApp();

Page({
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },
  onLoad() {
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })
    //添加购物车的回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    //商品选中状态改变回调
    app.changeGoodsState = (index) => {
      let checked = !this.data.cartList[index].checked
      // 修改某一项的选中状态
      this.setData({
        [`cartList[${index}].checked`]: checked
      })
      app.globalData.cartList[index].checked = checked
      this.changeData()
    }
    //全选的回调
    app.selectAll = () => {
      let all = !this.data.isSelectAll
      app.globalData.cartList.forEach(item => {
        if (item.checked !== all) {
          item.checked = all
        }
      })
      this.setData({
        isSelectAll: all,
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    //删除操作
    app.deleteCartItem = () => {
      let cartList = this.data.cartList
      //判断是否选择了商品
      let isDelete = cartList.some(item => item.checked)
      if (!isDelete) {
        wx.showToast({
          title: '您未选择商品',
          duration: 1000,
          icon: 'none'
        })
        return
      }
      wx.showModal({
        title: '提示',
        content: '您确定删除嘛？',
        success: res => {
          if (res.confirm) {
            //获得所有未选择的商品 也就是不需要删除的商品
            let arrKeep = cartList.filter(item => !item.checked)
            this.setData({
              cartList: arrKeep
            })
            app.globalData.cartList = arrKeep
            wx.setNavigationBarTitle({
              title: `购物车(${this.data.cartList.length})`,
            })
            this.changeData()
          }
        }
      })
    }
  },
  onShow() {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    this.changeData()
  },
  changeData() {
    //判断是否全选
    this.setData({
      isSelectAll: this.data.cartList.length ? this.data.cartList.every(item => item.checked) : false
    })
    // 获取所有选中数据
    let totalPrice = 0;
    let counter = 0;
    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }
    // 修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice.toFixed(2)
    })
  },
})