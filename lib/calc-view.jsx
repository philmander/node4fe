var React = require('react');


var CalcView = function(opts) {
};

module.exports = function(opts) {
    return new CalcView(opts);
};

CalcView.prototype.render = function(mountNode, model) {

    var Calc = React.createClass({
        getInitialState: function() {
            return {
                display: model.result()
            };
        },
        sendKey: function(e) {
            model.sendKey(e.target.value);
            this.update();
        },
        evaluate: function(e) {
            model.evaluate(e.target.value);
            this.update();
        },
        clear: function(e) {
            model.reset();
            this.update();
        },
        update: function() {
            this.setState({
                display: model.result()
            });
        },
        render: function() {
            return (
                <div className="calc">
                    <div className="display">{this.state.display}</div>
                    <div className="clearfix">
                        <button className="clearkey" onClick={this.clear}>C</button>
                    </div>
                    <div className="clearfix keys">
                        <button onClick={this.sendKey} value={7}>7</button>
                        <button onClick={this.sendKey} value={8}>8</button>
                        <button onClick={this.sendKey} value={9}>9</button>
                        <button onClick={this.sendKey} value={'/'} className="opkey">{'÷'}</button>
                        <button onClick={this.sendKey} value={4}>4</button>
                        <button onClick={this.sendKey} value={5}>5</button>
                        <button onClick={this.sendKey} value={6}>6</button>
                        <button onClick={this.sendKey} value={'*'} className="opkey">{'×'}</button>
                        <button onClick={this.sendKey} value={1}>1</button>
                        <button onClick={this.sendKey} value={2}>2</button>
                        <button onClick={this.sendKey} value={3}>3</button>
                        <button onClick={this.sendKey} value={'-'} className="opkey">{'-'}</button>
                        <button onClick={this.sendKey} value={0}>0</button>
                        <button onClick={this.sendKey} value={'.'}>{'.'}</button>
                        <button onClick={this.evaluate} className="opkey">{'='}</button>
                        <button onClick={this.sendKey} value={'+'}  className="opkey">{'+'}</button>
                    </div>
                </div>
            )
        }
    });

    React.render(<Calc  />, mountNode);
};