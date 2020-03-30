import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo,
} from '../../network/detail.js'

const app = getApp();

Page({
  data: {
    iid: '', // 1m7c6iu
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {},
    screenHeight: 0
  },
  onLoad(query) {
    // 1.获取传入的iid
    this.setData({
      iid: query.iid
    })
    //获取设备信息
    wx.getSystemInfo({
      success: (result) => {
        //获取设备的可使用宽度
        this.setData({
          screenHeight: result.windowHeight
        })
      },
    });
    // 2.请求商品详情数据
    this._getDetailData()
    // 3.请求推荐的数据
    this._getRecommends()
  },
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      const data = res.result;
      // 1.取出顶部的图片
      const topImages = data.itemInfo.topImages;

      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      // console.log(res);
      this.setData({
        recommends: res.data.list
      })
    })
  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;
    //是否选中
    obj.checked = true
    //商品数量
    obj.count = 1
    // 2.加入到购物车列表
    app.addToCart(obj)
    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})