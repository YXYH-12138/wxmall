Component({
  data: {},
  properties: {},
  methods: {
    onAddCart() {
      this.triggerEvent('addcart', {}, {})
    }
  }
})