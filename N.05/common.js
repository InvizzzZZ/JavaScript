let arr = [5, 7,
          [4, [2], 8, [1, 3], 2],
          [9, []],
          1, 8
          ];

alert(treeSum(arr));

// function treeSum(arrParam, sumParam) {
//     let sum = sumParam || 0;
//
//     arrParam.forEach(function (item, i, arr) {
//         if (typeof item !== 'object') {
//             sum += item;
//         } else {
//             sum = treeSum(arr[i], sum);
//         }
//     });
//
//     return sum;
//
// }
//

function treeSum(arrParam) {
    let sum =  0;

    arrParam.forEach(function (item, i, arr) {
        if (typeof item !== 'object') {
            sum += item;
        } else {
            sum += treeSum(arr[i]);
        }
    });

    return sum;

}



