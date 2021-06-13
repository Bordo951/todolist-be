const deepCopy = require('./index.js');

let originObj, originArr, copyObj, copyArr;

beforeEach(() => {
    originObj = {
        a: 4,
        b: {
            c: 5,
        },
    };
    originArr = [1, [1, [1], 2], 2];

    copyObj = deepCopy(originObj);
    copyArr = deepCopy(originArr);
});

test('Object links are not equal', () => {
    expect(originObj === copyObj).toBeFalsy();
});

test('Object values are equal', () => {
    expect(originObj.a === copyObj.a).toBeTruthy();
    originObj.a = 8;
    expect(originObj.a === copyObj.a).toBeFalsy();
});

test('Object methods are not equal', () => {
    expect(originObj.b === copyObj.b).toBeFalsy();
});

test('Array links are not equal', () => {
    expect(originArr === copyArr).toBeFalsy();
});

test('Array values are equal', () => {
    expect(originArr[0] === copyArr[0]).toBeTruthy();
});

test('Nested arrays are not equal', () => {
    expect(originArr[1] === copyArr[1]).toBeFalsy();
});
