
let proxyUrl = 'http://192.168.1.4:1000'
/// 请求数据方法
let request = function (url) {
  let urlStr = proxyUrl + `?url=${url}`
  return new Promise((resolve, reject) => {
    fetch(urlStr).then(function (res) {
      return res.json()
    }).then(function (json) {
      resolve(json)
    }).catch((err) => {
      console.log(`${url} 请求数据失败, ${err}`)
    })
  })
}

module.exports = {
  request
}
