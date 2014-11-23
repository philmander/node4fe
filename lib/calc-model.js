'use strict';

var CalcModel = function() {
    this.reset();

};

module.exports = function() {
    return new CalcModel();
};

CalcModel.prototype.reset = function() {
    this.clearBeforeAny = true;
    this._result = '0';
};

CalcModel.prototype.doClear = function(force) {
    if(this.clearBeforeAny || force) {
        this._result = '';
        this.clearBeforeAny = false;
    }
};

CalcModel.prototype.sendKey = function(val) {
    this.doClear();
    if(/[\*\/\+\-]/.test(val)) {
        this.sendOp(val);
    } else if(val === '.') {
        this.sendDec();
    } else {
        if(this.clearBeforeNum) {
            this._result = '';
        }
        this.sendNum(val);
    }
    this.clearBeforeNum = false;
};

CalcModel.prototype.sendNum = function(val) {

    this._result += val;
};

CalcModel.prototype.sendOp = function(val) {

    // Only add operator if input is not empty and there is no operator at the last
    // or allow minus if the string is empty
    if((this._result && !/[\*\/\+\-]$/.test(this._result)) || (!this._result && val === '-')) {
        this._result += val;
    } else {
        // Replace the last operator (if exists) with the newly pressed operator
        this._result = this._result.replace(/(.+)([\*\/\+\-])$/, function(match, p1) {
            return p1 + val;
        });
    }
    if(!this._result) {
        this.clearBeforeAny = true;
        this._result = '0';
    }
};

CalcModel.prototype.sendDec = function() {

    if(!/\d+\.\d*$/.test(this._result)) {
        if(!/\d$/.test(this._result)) {
            this._result += '0';
        }
        this._result += '.';
    }
};

CalcModel.prototype.evaluate = function() {
    this._result = this._result.replace(/([\*\/\+\-])$/, '');
    this._result = eval(this._result); // jshint ignore:line
    this.clearBeforeNum = true;
};

CalcModel.prototype.result = function() {
    return this._result.toString().replace(/\*/g, '×').replace(/\//g, '÷');
};