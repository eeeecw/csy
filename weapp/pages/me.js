"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _x = require('../vendor.js')(2);

var _store = _interopRequireDefault(require('../store/index.js'));

var _mixin = _interopRequireDefault(require('mixin.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const { $Toast } = require('@/iview/base/index')
_core.default.page({
  store: _store.default,
  mixins: [_mixin.default],
  data: {
    currentTab: 'me',
    // 当前选中底部菜单
    userInfo: null,
    // 用户信息
    editIndex: 0,
    // 被编辑项索引 -1 代表新建
    editAble: false,
    // 打开编辑框
    detail: {},
    deleteModal: false // 删除的确认框

  },
  created: function created() {
    this.getUserInfo();
  },
  methods: _objectSpread({}, (0, _x.mapActions)(['upList']), {
    onGotUserInfo: function onGotUserInfo(e) {
      if (e.$wx.detail.userInfo) {
        this.userInfo = e.$wx.detail.userInfo;
      }
    },
    handleChangeTab: function handleChangeTab(data) {
      var key = data.$wx.detail.key;

      if (key === 'home') {
        wx.redirectTo({
          url: 'index'
        });
      }
    },
    // 新增一项
    handleAdd: function handleAdd() {
      this.detail = {
        name: '',
        list: []
      };
      this.editIndex = -1;
      this.editAble = true;
    },
    handleEdit: function handleEdit(index) {
      this.editIndex = index;
      this.detail = JSON.parse(JSON.stringify(this.menuList[index]));
      this.editAble = true;
    },
    // 保存新项
    handleSave: function handleSave(item) {
      this.editAble = false;

      if (this.editIndex === -1) {
        this.menuList.push(item);
      } else {
        this.menuList[this.editIndex] = item;
      }

      this.menuList = JSON.parse(JSON.stringify(this.menuList));
      console.log(this.menuList);
      this.upDataMenu();
    },
    handleSetDefault: function handleSetDefault(index) {
      this.defaultMenu = index;
      this.upDataMenu();
    },
    // 更新菜单
    upDataMenu: function upDataMenu() {
      wx.cloud.callFunction({
        // 调用的函数名字
        name: 'upMenu',
        data: {
          menuList: this.menuList,
          defaultMenu: this.defaultMenu
        },
        success: function success(res) {// if (res.result.menuList.length) {
          //   this.menuList = res.result.menuList
          //   this.defaultMenu = res.result.defaultMenu
          // }
        },
        fail: function fail() {// TODO 未验证
        }
      });
    },
    // 删除一个菜单
    handleDelete: function handleDelete(index) {
      this.editIndex = index;
      this.deleteModal = true;
    },
    // 确认删除
    handleSureDelete: function handleSureDelete() {
      var menuList = JSON.parse(JSON.stringify(this.menuList)); // console.log(this.menuList, this.editIndex)

      menuList.splice(this.editIndex, 1); // console.log(menuList)

      this.menuList = menuList;
      this.upDataMenu();
      this.deleteModal = false;
    },
    // 取消删除
    handleCancelDelete: function handleCancelDelete() {
      this.deleteModal = false;
    },
    // 获取用户信息
    getUserInfo: function getUserInfo() {
      var _this = this;

      wx.getUserInfo({
        withCredentials: true,
        success: function success(res) {
          _this.userInfo = res.userInfo;
        }
      });
    }
  })
}, {info: {"components":{"i-tab-bar":{"path":"../iview/tab-bar/index"},"i-tab-bar-item":{"path":"../iview/tab-bar-item/index"},"i-modal":{"path":"../iview/modal/index"},"i-toast":{"path":"../iview/toast/index"},"i-icon":{"path":"../iview/icon/index"},"menu-edit":{"path":"../components/menu-edit"}},"on":{"5-35":["save","cancel"],"5-37":["change"],"5-38":["ok","cancel"]}}, handlers: {'5-30': {"getuserinfo": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onGotUserInfo($event)
      })();
    
  }},'5-31': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleAdd($event)
      })();
    
  }},'5-32': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.handleSetDefault(index)
      })();
    
  }},'5-33': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.handleEdit(index)
      })();
    
  }},'5-34': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.handleDelete(index)
      })();
    
  }},'5-35': {"save": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleSave($event)
      })();
    
  }, "cancel": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.editAble = false
      })();
    
  }},'5-37': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleChangeTab($event)
      })();
    
  }},'5-38': {"ok": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleSureDelete($event)
      })();
    
  }, "cancel": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.handleCancelDelete = false
      })();
    
  }}}, models: {} });