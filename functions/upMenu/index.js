// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database().collection('list')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const up = await db.where({
    openid: wxContext.OPENID
  }).update({
    data: event
  })
  if (up.stats.updated === 0) {
    await db.add({
      data: {
        defaultMenu: 0,
        menuList: event.menuList,
        openid: wxContext.OPENID
      }
    })
  }
  return true
}
