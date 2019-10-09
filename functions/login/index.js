// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database().collection('list')
let defaultList = [{
  name: '午餐 or 晚餐',
  list: ['汉堡', '麻辣烫', '铁板烧', '石锅饭', '盖饭', '麻辣小龙虾', '寿司', '火锅', '烧烤']
}]

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  let result = {}
  let source = await db.where({
    openid
  }).get()
  if (source.data.length) {
    result.menuList = source.data[0].menuList
    result.defaultMenu = source.data[0].defaultMenu
  } else {
    result.menuList = defaultList
    result.defaultMenu = 0
  }
  return result
}
