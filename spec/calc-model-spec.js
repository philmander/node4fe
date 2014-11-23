var calcModel = require('../lib/calc-model');

beforeEach(function() {

    //initialize a new calc model
    this.calc = calcModel();
});

describe("The calculator model", function() {

    it("initializes the display with \'0\'", function () {

        expect(this.calc.result()).toBe('0');
    });

    it("performs basic calculations", function () {

        this.calc.sendKey(5);
        this.calc.sendKey('*');
        this.calc.sendKey(6);
        expect(this.calc.result()).toBe('5×6');

        this.calc.evaluate();
        expect(this.calc.result()).toBe('30');

        this.calc.sendKey('+');
        this.calc.sendKey(10);
        this.calc.evaluate();
        expect(this.calc.result()).toBe('40');
    });
});