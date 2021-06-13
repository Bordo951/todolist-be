function deepCopy(data) {
    const copyData = {};

    for(const i in data) {
        if (data[i] instanceof Object) {
            copyData[i] = deepCopy(data[i]);
            continue;
        }

        copyData[i] = data[i];
    }

    return copyData;
}
module.exports = deepCopy;
