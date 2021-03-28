function indexOfObjById(arr, id) {
    let index = -1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
            index = i;
            break;
        }
    }

    return index;
}

module.exports.indexOfObjById = indexOfObjById;
