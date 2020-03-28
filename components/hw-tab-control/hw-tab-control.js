// component/h-tab-control/h-tab-control.js
Component({
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    handleChange({
      target
    }) {
      let index = target.dataset.index;
      //同一次点击 直接跳出
      if (index === this.data.currentIndex) return
      this.setData({
        currentIndex: this.data.currentIndex = index
      });
      this.triggerEvent('handleChange', {
        index
      })
    }
  },
  // externalClasses: ['active-class'],
  options: {
    //可以被外部样式改变
    addGlobalClass: true,
  }
})