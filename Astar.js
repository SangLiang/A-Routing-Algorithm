/*
	Astar寻路算法
	v1.0
	核心算法： F = G+H  
	G:已走路程所花掉的开销
	H:剩余路程所需要花掉的开销
	F:总的开销
 */


/*
	Map解释：
	2:代表初始位置和当前位置
	3:代表出口
	1:代表围墙，不可走
	0:代表可走区域
 */
var Map = [
	[ 2 , 0 , 0 , 0 , 0 ],
	[ 0 , 0 , 1 , 0 , 0 ],
	[ 0 , 0 , 1 , 0 , 0 ],
	[ 0 , 0 , 1 , 0 , 0 ],
	[ 0 , 0 , 0 , 0 , 3 ],
];

// 要走的路径
var pathRecorder = [];
// 对角权重
var CORNER_STEP = 14;
// 直线权重
var STRIGHT_STEP = 10;

var start_position = [0,0];

var ending_position = [4,4];

var current_position = [0,0];

// 周围所有的可用节点数组
var aroundNodeList = [];

// 被禁止的节点（走过的节点）
var BanNodeList  = [];

BanNodeList.push([].concat(current_position));

// 游戏主定时器
var Timer = null;

// 
var IsInArray = function(testArray,targetArray){
	var _inPosition = [];

	if(testArray.length == 0 || testArray.length ==0){
		console.log("对不起，相比较的数组长度不能为0");
		return;
	}
	// 两个都是一位数组
	if((!testArray[0][0] &&  !targetArray[0][0] )&& (testArray.length==targetArray.length)){
		if(testArray[0] == targetArray[0] && testArray[1]==targetArray[1]){
			_inPosition.push(0);
		}
		return _inPosition;
	}
	// console.log(targetArray);

	if(!testArray[0][0] && targetArray[0][0] !=null){
		for(var i = 0; i<targetArray.length ;i++){
			if((targetArray[i][0] == testArray[0]) && (targetArray[i][1] == testArray[1])){
				_inPosition.push(i);
			}
		}
		return _inPosition;
	}	

	// 两个都是二位数组
	for(var i = 0; i<testArray.length ;i++){
		for(var j = 0; j< targetArray.length;j++){
			if((testArray[i][0] == targetArray[j][0]) && (testArray[i][1] == targetArray[j][1])){
				_inPosition.push(i);
			}
		}
	}

	return _inPosition;
}

var ClearArrayByIndex = function(indexList,clearArray){
	var _count = 0;
	var _templist = [].concat(clearArray);
	if(indexList.length ==0 || clearArray.length==0){
		_templist =clearArray;
		return _templist;
	}

	for(var i = 0; i< indexList.length; i++){
		_templist.splice(indexList[i]-_count,1);
		_count++;
	}

	return _templist;
}

// 打印整张地图
var PrintMap = function (){
	for(var i = 0; i <Map.length;i++){
		console.info(Map[i]);
	}
}

// 找到周围的所有节点
var CheckNodes = function (checkPosition){
	var _i = checkPosition[0];
	var _j = checkPosition[1];

	aroundNodeList = [];
	
	// 该节点上面
	if(_i>0){
		var Node = [_i-1,_j];
		if(Map[Node[0]][Node[1]] != 1){
			aroundNodeList.push(Node);
		}
	}

	// 该节点下面
	if(_i<Map.length - 1){
		var Node = [_i+1,_j];
		if(Map[Node[0]][Node[1]] != 1){
			aroundNodeList.push(Node);
		}
	}

	// 左边
	if(_j>0){
		var Node = [_i,_j-1];
		if(Map[Node[0]][Node[1]] != 1){
			aroundNodeList.push(Node);
		}
	}

	// 右边
	if(_j<Map.length - 1){
		var Node = [_i,_j+1];
		if(Map[Node[0]][Node[1]] != 1){
			aroundNodeList.push(Node);
		}
	}

	// 左上
	if(_i>0 && _j>0){
		var Node = [_i-1,_j-1];
		if(Map[Node[0]][Node[1]] != 1){
			aroundNodeList.push(Node);
		}
	} 

	// 右上
	if(_i>0 && _j<Map.length - 1){
		var Node = [_i-1,_j+1];
		if(Map[Node[0]][Node[1]] != 1){
			aroundNodeList.push(Node);
		}
	}

	// 左下
	if(_i<Map.length-1&& _j>0){
		var Node = [_i+1,_j-1];
		if(Map[Node[0]][Node[1]] != 1){
			aroundNodeList.push(Node);
		}
	}

	// 右下
	if(_i<Map.length-1 && _j<Map.length -1){
		var Node = [_i+1,_j+1];
		if(Map[Node[0]][Node[1]] != 1){
			aroundNodeList.push(Node);
		}
	}

	var  tl= IsInArray(aroundNodeList,BanNodeList);
	// console.log("禁止列表为: "+BanNodeList);
	var resultList = ClearArrayByIndex(tl,aroundNodeList);
	aroundNodeList = [];
	aroundNodeList = resultList;
	// console.log("可选路径有"+aroundNodeList);
	
}

/*
	检查点距离目标的位置
 */
var GetHLength = function (checkPosition,ending_position){
	var _i = checkPosition[0];
	var _j = checkPosition[1];
	var result = 0;
	result  =  (Math.abs(_i-ending_position[0]) + Math.abs(_j-ending_position[1]))*STRIGHT_STEP;
	return result;
} 

/*
	检查点距离起点的位置的位置
 */
var GetGLength = function (checkPosition,start_position){
	var _i = checkPosition[0];
	var _j = checkPosition[1];
	var result = 0;
	result  =  (Math.abs(_i - start_position[0]) + Math.abs(_j- start_position[1]))*STRIGHT_STEP;
	return result;
}

var GetSumLength = function (checkPosition,ending_position,start_position){
	var _length = 0;

	var _hLength = GetHLength(checkPosition,ending_position,start_position);

	var _gLength = GetGLength(checkPosition,ending_position,start_position);

	_length = _hLength + _gLength;

	return _length;
}

// 计算所有节点的预计长度
var FindLogic = function (){
	var _templist = [];
	for(var i = 0 ; i <aroundNodeList.length; i ++){
		var _returnObj = {};
		_returnObj["len"] = GetSumLength(aroundNodeList[i],ending_position,start_position);
		_returnObj["pos"] = aroundNodeList[i];
		_templist.push(_returnObj);
	}
	return _templist;
}

// 主循环
var MainLoop = function (){
	// console.log("当前的位置是"+current_position);
	var tl = IsInArray(current_position,BanNodeList);

	if(tl.length == 0){
		BanNodeList.push(current_position);
	}
	CheckNodes(current_position);
	var _aroundNodes = FindLogic();
	// var min = _aroundNodes[0]["len"];
	var min = Number.POSITIVE_INFINITY;
	var newPosition = {};

	for(item in _aroundNodes){
		if(_aroundNodes[item]["len"]<min){
			min = _aroundNodes[item]["len"];
			current_position =_aroundNodes[item]["pos"];
		}
	}

	if(current_position[0] == ending_position[0] && current_position[1] == ending_position[1]){
		clearInterval(Timer);
		return;
	}

	Map[current_position[0]][current_position[1]] = 2;
	PrintMap();
	console.info(" ");
}

// 启动函数
var Start  = function(){
	PrintMap();
	Timer = setInterval(MainLoop,1000);
	// console.log("-------------------");
	// console.log(aroundNodeList);
	// console.log("-------------------");
}
Start();