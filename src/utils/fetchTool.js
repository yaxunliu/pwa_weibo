
// let proxyUrl = 'http://localhost:1000'
/// 请求数据方法
let request = function (url) {
  // let urlStr = proxyUrl + `?url=${url}`
  return new Promise((resolve, reject) => {
    fetch(url).then(function (res) {
      try {
        if (res.status === 200) {
          return res.json()
        }
        reject(Error(`${res.status}`))
      } catch (e) {
        reject(e)
      }
    }).then(function (json) {
      resolve(json)
    }).catch((err) => {
      console.log(`${url} 请求数据失败, ${err}`)
      reject(err)
    })
  })
}

export {
  request
}
