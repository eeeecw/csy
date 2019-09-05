import { mapState } from '@wepy/x'
const { $Toast } = require('@/iview/base/index')
const buDate = {
  userInfo: [],
  defaultMenu: 0
}
export default {
  data: {
    userInfo: null,
    menuList: [],
    defaultMenu: 0
  },

  methods: {
    // 从 vuex 获取用户信息
    // getUserInfo() {
    //   if (this.x_userInfo.length) {
    //     this.userInfo = this.x_userInfo
    //     this.defaultMenu = this.x_defaultMenu
    //     this.openid = this.x_openid
    //   } else {
    //     this.getUserInfoFromI()
    //   }
    // },

    // 从 云端 获取用户信息
    getUserInfoFromI() {
      wx.cloud.callFunction({
        // 调用的函数名字
        name: 'login',
        success: (res) => {
          if (res.result.menuList && res.result.menuList.length) {
            this.menuList = res.result.menuList
            this.defaultMenu = res.result.defaultMenu
          }
        },
        fail: () => {
          // TODO 未验证
          $Toast({
            content: '网络超时\n使用本地数据替代'
          })
          this.userInfo = buDate.userInfo
          this.defaultMenu = buDate.defaultMenu
        }
      })
    }
  },

  computed: {
    ...mapState(['x_userInfo', 'x_defaultMenu', 'x_openid', 'x_menuList'])
  },

  created() {
    this.getUserInfoFromI()
  }
}
