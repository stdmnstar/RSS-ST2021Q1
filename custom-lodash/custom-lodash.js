function arrayAdd(array, elem) {
    array[array.length] = elem;
    return array;
}

function arraySlice(array, start, end) {
    const length = array.length;
    if (end > length) {
        end = length;
    }

    if (start < 0) {
        start = 0;
    }

    const resultArray = [];
    for (let i = start; i < end; i++) {
        arrayAdd(resultArray, array[i]);
    }

    return resultArray;
}

function chunk(array, size = 1) {
    if (size < 1) {
        return [];
    }

    const resultArray = [];
    for (let i = 0; i < array.length; i += size) {
        arrayAdd(resultArray, arraySlice(array, i, (i + size)));
    }

    return resultArray;
}

function compact(array) {
    const resultArray = [];
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        if (value) {
            arrayAdd(resultArray, value);
        }
    }

    return resultArray;
}

function drop(array, n = 1) {
    if (n < 0) {
        n = 0;
    }

    return arraySlice(array, n, array.length);
}

function arrayWhile(array, predicate) {
    const length = array.length;
    let stopIndex = -1;

    for (let i = 0; i < length; i++) {
        if (!predicate(array[i], i, array)) {
            stopIndex = i;
            break;
        }
    }

    return arraySlice(array, stopIndex, length);
}

function identity(value) {
    return value;
}

function property(value) {
    return (object) => {
        return object[value];
    };
}

function matches(source) {
    return (object) => {
        for (let key in source) {
            if (object[key] !== source[key]) {
                return false;
            }
        }

        return true;
    };
}

function matchesProperty(path, value) {
    return (object) => {
        if (object[path] !== value) {
            return false;
        }

        return true;
    };
}

function iteratee(value = identity) {
    if (typeof value == 'function') {
        return value;
    }

    if (value == null) {
        return identity;
    }

    if (typeof value == 'object') {
        return Array.isArray(value) ?
            matchesProperty(value[0], value[1]) :
            matches(value);
    }

    return property(value);
}

function dropWhile(array, predicate = identity) {
    return arrayWhile(array, iteratee(predicate));
}

function take(array, n = 1) {
    if (n < 0) {
        n = 0;
    }

    return arraySlice(array, 0, n);
}

function arrayFilter(array, predicate) {
    const resultArray = [];

    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            arrayAdd(resultArray, array[i]);
        }
    }

    return resultArray;
}

function filter(collection, predicate = identity) {
    return arrayFilter(collection, iteratee(predicate));
}

function arrayFind(array, predicate, from) {
    for (let i = from; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            return array[i];
        }
    }

    return undefined;
}

function find(collection, predicate = identity, fromIndex = 0) {
    return arrayFind(collection, iteratee(predicate), fromIndex);
}

function arayIndexOf(array, value, fromIndex) {
    for (let i = fromIndex; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }

    return -1;
}

function includes(collection, value, fromIndex = 0) {
    if (fromIndex < 0) {
        fromIndex = Math.max(length + fromIndex, 0);
    }

    return arayIndexOf(collection, value, fromIndex) > -1;
}

function arrayMap(array, predicate) {
    const resultArray = [];
    for (let i = 0; i < array.length; i++) {
        resultArray[i] = iteratee(predicate)(array[i], i, array);
    }

    return resultArray;
}

function map(collection, predicate = identity) {
    return arrayMap(collection, iteratee(predicate));
}

function zip(...arrays) {
    let maxLength = arrays[0].length;
    for (let i = 1; i < arrays.length; i++) {
        maxLength = Math.max(maxLength, arrays[i].length);
    }

    let resultArray = [];
    for (let i = 0; i < maxLength; i++) {
        resultArray[i] = [];
        for (let j = 0; j < arrays.length; j++) {
            arrayAdd(resultArray[i], arrays[j][i]);
        }
    }

    return resultArray;
}

function merge(object, ...sources) {
    for (let i = 0; i < sources.length; i++) {
        for (let key in sources[i]) {
            if (key in object) {
                if (typeof object[key] === "object") {
                    merge(object[key], sources[i][key]);
                } else {
                    object[key] = sources[i][key];
                }
            } else {
                object[key] = sources[i][key];
            }
        }
    }

    return object;
}

function pick(object, paths) {
    const resultObject = {};
    if (Array.isArray(paths)) {
        for (let i = 0; i < paths.length; i++) {
            resultObject[paths[i]] = object[paths[i]];
        }
    }

    if (typeof parts === "string") {
        resultObject[paths] = object[paths];
    }

    return resultObject;
}

function pickBy(object, predicate = identity) {
    let resultObject = {};
    for (let key in object) {
        if (predicate(object[key], key)) {
            resultObject[key] = object[key];
        }
    }

    return resultObject;
}

function omit(object, paths) {
    if (object == null) {
        return {};
    }

    let array = [];
    if (typeof parts === "string") {
        paths = [...paths];
    }

    for (let key in object) {
        if (!includes(paths, key)) {
            arrayAdd(array, key);
        }
    }

    return pick(object, array);
}

function omitBy(object, predicate = identity) {
    let resultObject = {};
    for (let key in object) {
        if (!predicate(object[key], key)) {
            resultObject[key] = object[key];
        }
    }

    return resultObject;
}

function toPairs(object) {
    if (object instanceof Map || object instanceof Set) {
        const iterator = object.entries();
        const entries = [];
        for (let entry of iterator) {
            arrayAdd(entries, entry);
        }

        return entries;
    }

    return Object.entries(object);
}

module.exports = {
    chunk,
    compact,
    drop,
    take,
    includes,
    dropWhile,
    filter,
    find,
    map,
    zip,
    merge,
    pick,
    pickBy,
    omit,
    omitBy,
    toPairs
};
