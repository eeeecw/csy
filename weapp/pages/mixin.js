"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _x = require('../vendor.js')(2);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../iview/base/index.js'),
    $Toast = _require.$Toast;

var buDate = {
  userInfo: [],
  defaultMenu: 0
};
var _default = {
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
    getUserInfoFromI: function getUserInfoFromI() {
      var _this = this;

      wx.cloud.callFunction({
        // 调用的函数名字
        name: 'login',
        success: function success(res) {
          if (res.result.menuList && res.result.menuList.length) {
            _this.menuList = res.result.menuList;
            _this.defaultMenu = res.result.defaultMenu;
          }
        },
        fail: function fail() {
          // TODO 未验证
          $Toast({
            content: '网络超时\n使用本地数据替代'
          });
          _this.userInfo = buDate.userInfo;
          _this.defaultMenu = buDate.defaultMenu;
        }
      });
    }
  },
  computed: _objectSpread({}, (0, _x.mapState)(['x_userInfo', 'x_defaultMenu', 'x_openid', 'x_menuList'])),
  created: function created() {
    this.getUserInfoFromI();
  }
};
exports.default = _default;