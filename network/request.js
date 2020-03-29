//  const baseURL = "http://152.136.185.210:8000/api/h3"
const baseURL = "http://123.207.32.32:8000/api/h3"
//const baseURL = "http://106.54.54.237:8000/api/h3" 

export default function (options) {
  return new Promise((resolve, reject) => {
    options.url = baseURL + options.url
    wx.request({
      ...options,
      success(res) {
        resolve(res.data)
      },
      fail: reject
    });
  })
}