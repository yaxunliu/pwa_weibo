const { get } = require('./fetchTool.js')
let configList = require('../TestDataJson/configList.json')
let containerList = require('../TestDataJson/container.json')

function loadConfigList () {
  try {
    return get('/api/config/list')
  } catch (err) {
    return configList
  }
}
function loadContainerIndex (uid, page) {
  try {
    let pagenum = page || 0
    let url = `/api/container/getIndex?containerid=${uid}&openApp=0&page=${pagenum}`
    return get(url)
  } catch (err) {
    return containerList
  }
}
export {
  loadConfigList,
  loadContainerIndex
}
