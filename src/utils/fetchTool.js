
import axios from 'axios'
function apiAxios (method, url, params) {
  return new Promise((resolve, reject) => {
    let promise = null
    if (method === 'POST') {
      promise = axios.post(url, params)
    } else {
      promise = axios.get(url)
    }
    promise
      .then((result) => {
        if (result.status !== 200) {
          reject(Error('数据请求失败'))
        }
        return result.data
      })
      .then((json) => {
        resolve(json)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function get (url, params) {
  return apiAxios('GET', url)
}

function post (url, params) {
  return apiAxios('POST', url, params)
}

export { get, post }
