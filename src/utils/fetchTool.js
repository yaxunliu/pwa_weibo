
let proxyUrl = 'http://localhost:1000'
/// 请求数据方法
let request = function (url) {
  let urlStr = proxyUrl + `?url=${url}`
  return new Promise((resolve, reject) => {
    fetch(urlStr).then(function (res) {
      console.log(res.json())
      resolve({ 'hello': 'world' })
    }).catch((err) => {
      console.log(`${url} 请求数据失败, ${err}`)
    })
  })
}

module.exports({
  request
})