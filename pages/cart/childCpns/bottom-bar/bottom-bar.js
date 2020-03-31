const app = getApp()

Component({
  properties: {
    selected: {
      type: Boolean,
      value: true
    },
    price: {
      type: Number
    },
    counter: {
      type: Number
    }
  },
  methods: {
    onSelectAll() {
      if (!app.globalData.cartList.length) return
      app.selectAll()
    },
    handleDelete() {
      app.deleteCartItem()
    }
  }
})