const app = getApp()

Component({
  properties: {
    subcategories: {
      type: Array
    },
    categoryDetail: {
      type: Array
    }
  },
  methods: {
    tabClick(e) {
      app.categoryCrlChange(e.detail.index)
    }
  }
})