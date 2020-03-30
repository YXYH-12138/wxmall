import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../network/category'

Page({
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0,
    screenHeight: 0
  },
  onLoad: function () {
    wx.getSystemInfo({
      success: (result) => {
        //获取设备的可使用宽度
        this.setData({
          screenHeight: result.windowHeight
        })
      },
    });
    this._getData()
  },
  _getData() {
    // 1.请求分类数据
    getCategory().then(res => {
      // 1.获取categories
      const categories = res.data.category.list;
      // 2.初始化每个类别的子数据
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        categories: categories,
        categoryData: categoryData
      })
      // 请求第一个类别的数据
      this._getSubcategory(0)
      // 请求第一个类别的详情数据
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex) {
    // 1.获取对应的maitkey
    const maitkey = this.data.categories[currentIndex].maitKey;
    // 2.请求的数据
    getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    // 获取对应的miniWallKey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;
    // 请求数据类别的数据
    getCategoryDetail(miniWallKey, 'pop').then(res => {
      // 1.获取categoryData
      const categoryData = this.data.categoryData;
      // 2.修改数据
      categoryData[currentIndex].categoryDetail = res;
      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },
  menuClick(e) {
    let currentIndex = e.detail.currentIndex
    this.setData({
      currentIndex
    })
    // 请求对应currentIndex的数据
    this._getSubcategory(currentIndex)
    // 请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  }
})