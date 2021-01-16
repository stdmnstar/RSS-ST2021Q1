function curry(func) {
    const countArgs = func.length;

    function innerCurry(countArgs, args) {
        return (a) => {
            if (countArgs <= 1) {
                return func(...args, a);
            }
            return innerCurry(countArgs - 1, [...args, a]);
        };
    }
    return innerCurry(countArgs, []);
}

const sum2 = (a, b) => a + b;
const sum3 = (a, b, c) => a + b + c;
const sum4 = (a, b, c, d) => a + b + c + d;
const sum5 = (a, b, c, d, e) => a + b + c + d + e;
const sum6 = (a, b, c, d, e, f) => a + b + c + d + e + f;

const сsum2 = curry(sum2);
const сsum3 = curry(sum3);
const сsum4 = curry(sum4);
const сsum5 = curry(sum5);
const сsum6 = curry(sum6);

console.log(сsum2(1)(3));
console.log(сsum3(1)(3)(2));
console.log(сsum4(1)(3)(2)(4));
console.log(сsum5(1)(3)(2)(4)(6));
console.log(сsum6(1)(3)(2)(4)(5)(6));