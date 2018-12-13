const { request } = require('./fetchTool.js')
let configList = require('../TestDataJson/configList.json')
let containerList = require('../TestDataJson/container.json')

async function loadConfigList () {
  try {
    return await request('/api/config/list')
  } catch (err) {
    console.log('error')
    return configList
  }
}
async function loadContainerIndex () {
  try {
    return await request('/api/container/getIndex?containerid=102803&openApp=0')
  } catch (err) {
    return containerList
  }
}
export {
  loadConfigList,
  loadContainerIndex
}
