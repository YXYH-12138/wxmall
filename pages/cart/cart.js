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
      //判断是否全选
      let isAllChecked = this.data.cartList.every(item => item.checked)
      this.setData({
        isSelectAll: isAllChecked
      })
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
  },
  onShow() {
    this.setData({
      isSelectAll: this.data.cartList.length ? this.data.cartList.every(item => item.checked) : false
    })
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    this.changeData()
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }
    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  },
})