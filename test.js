// var IsInArray = function(testArray,targetArray){
// 	var _inPosition = [];

// 	if(testArray.length == 0 || testArray.length ==0){
// 		console.log("对不起，相比较的数组长度不能为0");
// 		return;
// 	}

// 	for(var item in targetArray){
// 		for(var i = 0; i<testArray.length;i++){
// 			if(targetArray[item][0] == testArray[i][0] && targetArray[item][1] == testArray[i][1]){
// 				_inPosition.push(i);
// 			}
// 		}
// 	}

// 	return _inPosition;
// }

// var ClearArrayByIndex = function(indexList,clearArray){
// 	var _count = 0;
// 	var _templist = [].concat(clearArray);
// 	// console.log(_templist);
// 	if(indexList.length ==0 || clearArray.length==0){
// 		return;
// 	}
// 	// console.log(indexList.length);

// 	for(var i = 0; i< indexList.length; i++){
// 		_templist.splice(indexList[i]-_count,1);
// 		_count++;
// 		// console.log(_templist);
// 	}

// 	return _templist;
// }


// var array1 = [[1,0],[1,1],[1,2]];
// var array2 = [[1,0],[1,2],[1,3],[1,2]];

// var list = IsInArray(array2,array1);

// var result = ClearArrayByIndex(list,array2);
// console.log("最终结果是"+result);

var a = [[0,1,2,3,4,5],[1,2,3,4]];

// console.log(a.length);