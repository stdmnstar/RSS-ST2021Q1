const createAutoComplete = function (data) {
    return (query) => {

        if (!query) {
            return [];
        }

        const regString = `^${query}`;
        const regExp = new RegExp(regString, "i");

        let outputArr = [];
        let queryLowCase = query.toLowerCase();
        let queryLowCaseLength = queryLowCase.length;

        for (let i = 0, dataLength = data.length, element; i != dataLength; i++) {
            element = data[i];

            if (regExp.test(element)) {
                outputArr.push(element);
            } else if (outputArr.length === 0) {
                continue;
            } else if (element.toLowerCase().substring(0, queryLowCaseLength) > queryLowCase) {
                break;
            }
        }
        return outputArr;
    };
};

module.exports.createAutoComplete = createAutoComplete;