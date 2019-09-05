"use strict";

var _core = _interopRequireDefault(require('vendor.js')(0));

var _x = _interopRequireDefault(require('vendor.js')(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_core.default.use(_x.default); // import store from './store'


wx.cloud.init(); // const store = new vuex.Store({
//   state: {
//     list: [],
//     default: 0
//   }
// })

_core.default.app({
  // store,
  hooks: {// App 级别 hook，对整个 App 生效
    // 同时存在 Page hook 和 App hook 时，优先执行 Page hook，返回值再交由 App hook 处
    // 'before-setData': function (dirty) {
    //   console.log('setData dirty: ', dirty);
    //   return dirty;
    // }
  },
  globalData: {
    userInfo: null
  },
  onLaunch: function onLaunch() {
    this.getList(); // this.upList()
  },
  methods: {
    // ...vuex.mapActions([ 'upList' ]),
    getList: function getList() {
      wx.cloud.callFunction({
        // 调用的函数名字
        name: 'login',
        success: function success(res) {// let result = res.result
          // console.log(_this.upList)
          // console.log('result:', res.result)
        },
        fail: console.error
      });
    }
  }
}, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} });