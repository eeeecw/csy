"use strict";

Component({
  externalClasses: ['i-class', 'i-class-alone'],
  properties: {
    count: {
      type: Number,
      value: 0,
      observer: 'finalCount'
    },
    overflowCount: {
      type: Number,
      value: 99
    },
    dot: {
      type: Boolean,
      value: false
    }
  },
  data: {
    finalCount: 0
  },
  methods: {
    finalCount: function finalCount() {
      this.setData({
        finalCount: parseInt(this.data.count) >= parseInt(this.data.overflowCount) ? "".concat(this.data.overflowCount, "+") : this.data.count
      });
    }
  }
});