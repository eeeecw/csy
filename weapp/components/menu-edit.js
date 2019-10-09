"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

_core.default.component({
  props: ['detail'],
  data: {
    list: [''],
    name: '',
    toastShow: false,
    toastText: '显示文字'
  },
  methods: {
    init: function init() {
      this.list = this.detail.list;
      this.name = this.detail.name;
    },
    handleAdd: function handleAdd() {
      console.log('handleAdd');

      var list = _toConsumableArray(this.list);

      this.list = list.concat('');
    },
    // 输入了名称
    handleChangeName: function handleChangeName(e) {
      this.name = e.$wx.detail.value;
    },
    // 输入了选项名称
    handleInputItem: function handleInputItem(e, index) {
      console.log('handleInputItem');
      this.list[index] = e.$wx.detail.value.trim();
    },
    // 弹出错误信息
    showToast: function showToast(text) {
      var _this = this;

      this.toastText = text;
      this.toastShow = true;
      setTimeout(function () {
        _this.toastShow = false;
      }, 1000);
    },
    // 保存
    handleSave: function handleSave() {
      this.checkoutInput();

      if (!this.name) {
        this.showToast('请输入菜单名称');
        return false;
      }

      if (this.list.length === 0) {
        this.showToast('至少拥有一个选项');
        return false;
      }

      this.$emit('save', {
        name: this.name,
        list: this.list
      });
    },
    // 检验输入，过滤空项目
    checkoutInput: function checkoutInput() {
      var list = new Set(this.list);
      list = Array.from(list).filter(function (item) {
        return item !== '';
      });
      this.list = list;
    },
    // 删除一项
    handleDelete: function handleDelete(index) {
      var list = JSON.parse(JSON.stringify(this.list));
      list.splice(index, 1);
      this.list = list;
    },
    // 取消
    handleCancel: function handleCancel() {
      this.$emit('cancel');
    }
  },
  watch: {
    detail: function detail(curVal, oldVal) {
      this.init();
    }
  }
}, {info: {"components":{"i-icon":{"path":"../iview/icon/index"}},"on":{"15-2":["tap"]}}, handlers: {'15-0': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleChangeName($event)
      })();
    
  }},'15-1': {"input": function proxy (index) {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleInputItem($event, index)
      })();
    
  }},'15-2': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.handleDelete(index)
      })();
    
  }},'15-3': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleAdd($event)
      })();
    
  }},'15-4': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleSave($event)
      })();
    
  }},'15-5': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleCancel($event)
      })();
    
  }}}, models: {} });