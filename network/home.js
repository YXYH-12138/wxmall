import request from "./request"

//首页数据请求 包含轮播图和推荐数据
export function getMultidata() {
  return request({
    url: '/home/multidata'
  })
}
//首页商品数据 
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}