import {
  getMultidata,
  getHomeGoods
} from "../../network/home"

// const TOP_DISTANCE = 500

Page({
  data: {
    //轮播图数据
    bannerList: [],
    //推荐数据
    recommendList: [],
    //tab-control的文本
    titles: ['流行', '新款', '精选'],
    //商品展示数据 对应tab-control
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    //当前商品数据类型
    currentType: 'pop',
    //是否显示回到顶部按钮
    isShow: false,
    //是否d定位tab-control
    isFixed: false,
    //tab-control 距离顶部的距离
    offsetTop: 0,
    // toPosition: 0,
    // screenHeight: 0
  },
  onLoad() {
    //轮播图和推荐信息的请求
    getMultidata().then(res => {
      this.setData({
        //保存信息
        bannerList: res.data.banner.list,
        recommendList: res.data.recommend.list
      })
    }).catch(err => {
      console.log(err);
    })
    //请求商品数据
    this._getHomeGoods('pop');
    this._getHomeGoods('new');
    this._getHomeGoods('sell');
  },
  onReady() {
    wx.createSelectorQuery().select('#tab-control-occupy').boundingClientRect(rect => {
      this.data.offsetTop = rect.top
    }).exec()
  },
  _getHomeGoods(type = this.data.currentType) {
    //请求一次让当前页数+1
    const page = this.data.goods[type].page + 1;
    getHomeGoods(type, page).then(res => {
      const listKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      //将商品数据加入到goods.list中
      this.setData({
        [listKey]: this.data.goods[type].list.concat(res.data.list),
        [pageKey]: this.data.goods[type].page + 1,
      })
    });
  },
  handleTabChange({
    detail
  }) {
    let index = detail.index
    //切换响应的数据
    this.setData({
      currentType: ["pop", "new", "sell"][index]
    })
  },
  //上拉加载更多
  onReachBottom() {
    this._getHomeGoods()
  },
  //回到顶部
  handleBackTop() {
    // this.setData({
    //   toPosition: 0
    // })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //监听滚动
  onPageScroll({
    scrollTop
  }) {
    // let flagTop = scrollTop >= TOP_DISTANCE
    let flagTabCtr = scrollTop >= this.data.offsetTop
    // if (flagTop != this.data.isShow) {
    //   this.setData({
    //     isShow: flagTop
    //   })
    // }
    if (flagTabCtr != this.data.isFixed) {
      this.setData({
        isFixed: flagTabCtr,
        isShow: flagTabCtr
      })
    }
  },
  // scrollPosition({
  //   detail
  // }) {
  //   let top = detail.scrollTop
  //   let flagTop = top >= TOP_DISTANCE
  //   let flagTabCtr = top >= this.data.offsetTop
  //   if (flagTop != this.data.isShow) {
  //     this.setData({
  //       isShow: flagTop
  //     })
  //   }
  //   if (flagTabCtr != this.data.ctrVisibility) {
  //     this.setData({
  //       ctrVisibility: flagTabCtr
  //     })
  //   }
  // }
})