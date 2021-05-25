const createAutoComplete = function(data) {
    return function(string) {
        let result = [];

        if (string && typeof string === 'string') {
            let strLength = string.length,
                maxIndex = strLength - 1,
                stringLowerCase = string.toLowerCase();

            for (let i = 0; i < data.length; i++) {
                let element = data[i];

                if (element.length >= strLength) {
                    for (let j = maxIndex; j >= 0; j--) {
                        if (element[j].toLowerCase() !== stringLowerCase[j]) {
                            break;
                        }
                        if (j === 0) result.push(element)
                    }
                }
            }
        }
        return result;
    }
}

exports.createAutoComplete = createAutoComplete;
