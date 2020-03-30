Component({
  properties: {
    commentInfo: {
      type: Object
    }
  },
  data: {
    time: 0
  },
  lifetimes: {
    ready() {
      this.setData({
        time: new Intl.DateTimeFormat('zh-Hans-CN').format(this.data.commentInfo.created * 1000)
      })
    }
  }
})