"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _x = _interopRequireDefault(require('../vendor.js')(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _x.default.Store({
  state: {
    x_userInfo: [],
    x_defaultMenu: 0,
    x_openid: null,
    x_menuList: []
  },
  mutations: {
    upList: function upList(state) {// state.list = ['1', 2, 3]
      // state.default = 2
      // state.default = result.default
    }
  },
  actions: {
    upList: function upList(_ref) {
      var commit = _ref.commit;
      commit('upList');
    }
  }
});

exports.default = _default;