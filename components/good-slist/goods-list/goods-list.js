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
      this.triggerEvent('handleSelectGoods', {
        id
      })
    }
  },
})