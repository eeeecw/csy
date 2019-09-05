"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

var _mixin = _interopRequireDefault(require('mixin.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../iview/base/index.js'),
    $Toast = _require.$Toast;

_core.default.page({
  store: _store.default,
  mixins: [_mixin.default],
  config: {
    navigationBarTitleText: 'tsest'
  },
  hooks: {},
  data: {
    currentTab: 'home',
    chooseList: [],
    // 等待选择列表
    drawList: [],
    // 循环显示背景列表
    drawIng: false,
    // 抽奖状态
    screen: {
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    },
    btnName: '',
    interval: null,
    modalAble: false,
    // 显示弹出区域
    userInfo: null,
    // 用户信息
    modalListAble: false // 展示切换菜单列表

  },
  computed: {},
  methods: {
    handleChangeTab: function handleChangeTab(data) {
      var key = data.$wx.detail.key;

      if (key === 'me') {
        wx.redirectTo({
          url: 'me'
        });
      }
    },
    // 切换菜单
    handleChangeList: function handleChangeList() {
      if (!this.checkoutMenuList()) {
        return false;
      }

      this.modalListAble = true;
    },
    handleModalOk: function handleModalOk() {
      this.modalAble = false;
    },
    // 初始化背景显示列表
    initDrawList: function initDrawList() {
      this.chooseList = this.menuList[this.defaultMenu].list;
      var len = this.chooseList.length - 1;
      var drawList = [];
      var i = 0;

      for (var n = 0; n < 20; n++) {
        var font = 14 + Math.random() * 4;
        var width = this.chooseList[i].length * font;
        drawList.push({
          name: this.chooseList[i],
          // opacity: Math.random().toFixed(2) * 2 - 1,
          font: font,
          left: Math.random() * (this.screen.width - width),
          top: Math.random() * (this.screen.height - font),
          direction: true // 加

        });

        if (i === len) {
          i = 0;
        } else {
          i++;
        }
      }

      var opacity = -1.11;
      var direction = false;
      drawList.forEach(function (item) {
        item.opacity = opacity += 0.11;
        item.direction = direction = !direction;
      });
      this.drawList = drawList;
    },
    checkoutMenuList: function checkoutMenuList() {
      if (!this.menuList || this.menuList.length === 0) {
        $Toast({
          content: '请先创建一个菜单'
        });
        wx.redirectTo({
          url: 'me'
        });
        return false;
      } else {
        return true;
      }
    },
    // 开始抽奖
    handleStart: function handleStart() {
      var _this = this;

      if (!this.checkoutMenuList()) {
        return false;
      }

      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        this.modalAble = true;
      } else {
        this.initDrawList();
        var time = 0;
        this.interval = setInterval(function () {
          _this.drawList.forEach(function (item) {
            if (item.opacity > 1 || item.opacity < -1) {
              item.direction = false;

              if (item.opacity < -1) {
                item.direction = true;
                var font = 14 + Math.random() * 4;
                var width = item.name.length * font;
                item.left = Math.random() * (_this.screen.width - width);
                item.top = Math.random() * (_this.screen.height - font);
              }
            }

            item.opacity += item.direction ? 0.03 : -0.03;
          });

          time++;

          if (time % 5 === 0) {
            time = 0;
            var index = Math.floor(Math.random() * 20);
            _this.btnName = _this.drawList[index].name.slice(0, 6);
          }
        }, 15);
      }
    },
    getUserInfo: function getUserInfo() {
      var _this2 = this;

      wx.getUserInfo({
        success: function success(res) {
          _this2.userInfo = res.userInfo;
        }
      });
    },
    // 切换菜单
    handleChangeMenu: function handleChangeMenu(index) {
      this.modalListAble = false;
      this.defaultMenu = index;
      $Toast({
        content: this.menuList[index].name,
        type: 'success'
      });
    }
  }
}, {info: {"components":{"i-tab-bar":{"path":"../iview/tab-bar/index"},"i-tab-bar-item":{"path":"../iview/tab-bar-item/index"},"i-modal":{"path":"../iview/modal/index"},"i-toast":{"path":"../iview/toast/index"},"modal-list":{"path":"../components/modal-list"}},"on":{"4-2":["ok"],"4-3":["change"],"4-4":["close","changeMenu"]}}, handlers: {'4-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleStart($event)
      })();
    
  }},'4-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleChangeList($event)
      })();
    
  }},'4-2': {"ok": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleModalOk($event)
      })();
    
  }},'4-3': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleChangeTab($event)
      })();
    
  }},'4-4': {"close": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.modalListAble = false
      })();
    
  }, "changeMenu": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleChangeMenu($event)
      })();
    
  }}}, models: {} });