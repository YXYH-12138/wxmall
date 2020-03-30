const app = getApp()

Component({
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },
  methods: {
    onCheckClick(e) {
      const index = e.currentTarget.dataset.index;
      app.changeGoodsState(index)
    }
  }
})