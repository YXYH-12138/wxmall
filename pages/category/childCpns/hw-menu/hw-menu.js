Component({
  data: {
    currentIndex: 0
  },
  properties: {
    categories: {
      type: Array
    }
  },
  methods: {
    onItemClick(e) {
      // 1.改变当前的currentIndex
      const currentIndex = e.currentTarget.dataset.index;
      this.setData({
        currentIndex
      })

      // 2.将最新的currentIndex传递到分类页面
      this.triggerEvent('menuclick', {
        currentIndex
      }, {})
    }
  }
})