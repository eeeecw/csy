"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  config: {
    navigationBarTitleText: 'tsest'
  },
  hooks: {},
  mixins: [],
  data: {
    current: 'homepage'
  },
  computed: {},
  methods: {
    handleChangeTab: function handleChangeTab() {}
  },
  created: function created() {}
}, {info: {"components":{"i-tab-bar":{"path":"../iview/tab-bar/index"},"i-tab-bar-item":{"path":"../iview/tab-bar-item/index"}},"on":{"7-6":["change"]}}, handlers: {'7-6': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleChangeTab($event)
      })();
    
  }}}, models: {} });