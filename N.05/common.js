let arr = [5, 7,
    [4, [2], 8, [1, 3], 2],
    [9, []],
    1, 8
];

let sum = 0;

alert(treeSum(arr));

function treeSum(arrParam) {

    arrParam.forEach(function (item, i, arr) {
        if (typeof item !== 'object') {
            sum += item;
        } else {
            return treeSum(arr[i]);
        }
    });

    return sum;

}