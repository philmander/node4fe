'use strict';

var calcModel = require('./calc-model');
var calcView = require('./calc-view.jsx');

var calc = {};
calc.init = function(mountNode) {
    var model = calcModel();
    var view = calcView();
    view.render(mountNode, model);
};

module.exports = calc;