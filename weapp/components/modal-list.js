"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_core.default.component({
  props: ['list', 'defaultMenu'],
  methods: {
    //  关闭事件
    handleClose: function handleClose() {
      this.$emit('close');
    },
    // 切换菜单
    handleChangeMenu: function handleChangeMenu(index) {
      this.$emit('changeMenu', index);
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'14-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleClose($event)
      })();
    
  }},'14-1': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        
      })();
    
  }},'14-2': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.handleChangeMenu(index)
      })();
    
  }}}, models: {} });