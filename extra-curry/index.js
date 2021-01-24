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
