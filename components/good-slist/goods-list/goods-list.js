Component({
  data: {},
  properties: {
    goods: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleTap({
      target
    }) {
      let id = target.dataset.iid
      if (!id) return
      wx.navigateTo({
        url: `../detail/detail?iid=${id}`
      });
    }
  },
})