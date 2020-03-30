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
      console.log(e.detail.index);
    }
  }
})