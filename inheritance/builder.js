function BaseBuilder(accum) {
    this.accum = accum;
}

BaseBuilder.prototype.get = function () {
    return this.accum;
};

BaseBuilder.intError = function () {
    var value = [].slice.call(arguments);
    if (!value.every(function (currentValue) {
            return Number.isInteger(currentValue);
        })) {
        throw new Error("Value is not integer");
    }
};

BaseBuilder.strError = function () {
    var value = [].slice.call(arguments);
    if (!value.every(function (currentValue) {
            return (typeof currentValue === "string" || currentValue instanceof String);
        })) {
        throw new Error("Value is not string");
    }
};

class IntBuilder extends BaseBuilder {
    constructor(int = 0) {
        BaseBuilder.intError(int);
        super(int);
    }

    static random(from, to) {
        BaseBuilder.intError(from, to);
        return Math.floor(from + Math.random() * (to + 1 - from));
    }

    plus(...n) {
        BaseBuilder.intError(...n);
        this.accum = n.reduce((sum, current) => sum + current, this.accum);
        return this;
    }

    minus(...n) {
        BaseBuilder.intError(...n);
        this.accum = n.reduce((sum, current) => sum - current, this.accum);
        return this;
    }

    multiply(n) {
        BaseBuilder.intError(n);
        this.accum *= n;
        return this;
    }

    divide(n) {
        BaseBuilder.intError(n);
        this.accum = Math.trunc(this.accum / n);
        return this;
    }

    mod(n) {
        BaseBuilder.intError(n);
        this.accum %= n;
        return this;
    }
}

function StringBuilder(str) {
    if (typeof str == "undefined") {
        str = '';
    }
    BaseBuilder.strError(str);
    BaseBuilder.call(this, str);
}

StringBuilder.prototype = Object.create(BaseBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.plus = function () {
    var str = [].slice.call(arguments);
    this.accum = str.reduce(function (sum, current) {
        return sum + current;
    }, this.accum);
    return this;
};

StringBuilder.prototype.minus = function (n) {
    BaseBuilder.intError(n);
    this.accum = this.accum.slice(0, this.accum.length - n);
    return this;
};

StringBuilder.prototype.multiply = function (int) {
    BaseBuilder.intError(int);
    var summa = '';
    for (var i = 0; i < int; i++) {
        summa += this.accum;
    }
    this.accum = summa;
    return this;
};

StringBuilder.prototype.divide = function (n) {
    BaseBuilder.intError(n);
    this.accum = this.accum.slice(0, Math.floor(this.accum.length / n));
    return this;
};

StringBuilder.prototype.remove = function (str) {
    BaseBuilder.strError(str);
    this.accum = this.accum.split(str).join('');
    return this;
};

StringBuilder.prototype.sub = function (from, n) {
    BaseBuilder.intError(from, n);
    this.accum = this.accum.slice(from, from + n);
    return this;
};

module.exports = {
    IntBuilder,
    StringBuilder
};
