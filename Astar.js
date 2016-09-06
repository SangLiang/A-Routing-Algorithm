/*
	Astar寻路算法
	核心算法： F = G+H  
	G:已走路程所花掉的开销
	H:剩余路程所需要花掉的开销
	F:总的开销
 */

var Map = [
	[ 0 , 0 , 0 , 0 , 0 ],
	[ 0 , 0 , 1 , 0 , 0 ],
	[ 2 , 0 , 1 , 0 , 3 ],
	[ 0 , 0 , 1 , 0 , 0 ],
	[ 0 , 0 , 1 , 0 , 0 ],
];

// 要走的路径
var pathRecorder = [];
// 对角权重
var CORNER_STEP = 14;
// 直线权重
var STRIGHT_STEP = 10;

var start_position = [2,0];

var ending_position = [2,4];

var current_position = [2,0];

// 周围所有的可用节点数组
var aroundNodeList = [];

// 被禁止的节点（走过的节点）
var BanNodeList  = [];

// 游戏主定时器
var Timer = null;

// 打印整张地图
function PrintMap(){
	for(var i = 0; i <Map.length;i++){
		console.info(Map[i]);
	}
}

// 找到周围的所有节点
function CheckNodes(checkPosition){
	var _i = checkPosition[0];
	var _j = checkPosition[1];

	aroundNodeList = [];
	
	// 该节点上面
	if(_i>0){
		var Node = [_i-1,_j];
		if(Map[Node[0]][Node[1]] != 1){
			for(item in BanNodeList){
				if(BanNodeList[item][0] != Node[0] && BanNodeList[item][1] !=Node[1]){
					aroundNodeList.push(Node);
				}
			}
		}
	}

	// 该节点下面
	if(_i<Map.length - 1){
		var Node = [_i+1,_j];

		if(Map[Node[0]][Node[1]] != 1){
			for(item in BanNodeList){
				if(BanNodeList[item][0] != Node[0] && BanNodeList[item][1] !=Node[1]){
					aroundNodeList.push(Node);
				}
			}
		}
	}

	// 左边
	if(_j>0){
		var Node = [_i,_j-1];
		if(Map[Node[0]][Node[1]] != 1){
			for(item in BanNodeList){
				if(BanNodeList[item][0] != Node[0] && BanNodeList[item][1] !=Node[1]){
					aroundNodeList.push(Node);
				}
			}
		}
	}

	// 右边
	if(_j<Map.length - 1){
		var Node = [_i,_j+1];
		if(Map[Node[0]][Node[1]] != 1){
			for(item in BanNodeList){
				if(BanNodeList[item][0] != Node[0] && BanNodeList[item][1] !=Node[1]){
					aroundNodeList.push(Node);
				}
			}
		}
	}

	// 左上
	if(_i>0 && _j>0){
		var Node = [_i-1,_j-1];
		if(Map[Node[0]][Node[1]] != 1){
			for(item in BanNodeList){
				if(BanNodeList[item][0] != Node[0] && BanNodeList[item][1] !=Node[1]){
					console.log(BanNodeList);
					aroundNodeList.push(Node);
				}
			}
		}
	} 

	// 右上
	if(_i>0 && _j<Map.length - 1){
		var Node = [_i-1,_j+1];
		if(Map[Node[0]][Node[1]] != 1){
			for(item in BanNodeList){
				if(BanNodeList[item][0] != Node[0] && BanNodeList[item][1] !=Node[1]){
					aroundNodeList.push(Node);
				}
			}
		}
	}

	// 左下
	if(_i<Map.length-1&& _j>0){
		var Node = [_i+1,_j-1];
		if(Map[Node[0]][Node[1]] != 1){
			for(item in BanNodeList){
				if(BanNodeList[item][0] != Node[0] && BanNodeList[item][1] !=Node[1]){
					aroundNodeList.push(Node);
				}
			}
		}
	}

	// 右下
	if(_i<Map.length-1 && _j<Map.length -1){
		var Node = [_i+1,_j+1];
		if(Map[Node[0]][Node[1]] != 1){
			for(item in BanNodeList){
				if(BanNodeList[item][0] != Node[0] && BanNodeList[item][1] !=Node[1]){
					aroundNodeList.push(Node);
				}
			}
		}
	}

	// console.log(aroundNodeList);
}

function GetSumLength(checkPosition,ending_position,start_position){
	var _length = 0;

	var _hLength = GetHLength(checkPosition,ending_position,start_position);

	var _gLength = GetGLength(checkPosition,ending_position,start_position);

	_length = _hLength + _gLength;

	return _length;
}


/*
	检查点距离目标的位置
 */
function GetHLength(checkPosition,ending_position){
	var _i = checkPosition[0];
	var _j = checkPosition[1];
	var result = 0;
	result  =  (Math.abs(_i-ending_position[0]) + Math.abs(_j-ending_position[1]))*STRIGHT_STEP;
	return result;
} 

/*
	检查点距离起点的位置的位置
 */
function GetGLength(checkPosition,start_position){
	var _i = checkPosition[0];
	var _j = checkPosition[1];
	var result = 0;
	result  =  (Math.abs(_i - start_position[0]) + Math.abs(_j- start_position[1]))*STRIGHT_STEP;
	return result;
}

// 计算所有节点的预计长度
function FindLogic(){
	var _templist = [];
	for(var i = 0 ; i <aroundNodeList.length; i ++){
		var _returnObj = {};
		_returnObj["len"] = GetSumLength(aroundNodeList[i],ending_position,start_position);
		_returnObj["pos"] = aroundNodeList[i];
		_templist.push(_returnObj);
	}
	// console.log(_templist);
	return _templist;
}

// 主循环
function MainLoop(){
	BanNodeList.push(current_position);
	// console.log(current_position);
	CheckNodes(current_position);
	var _aroundNodes = FindLogic();
	var min = _aroundNodes[0]["len"];
	// var min = 100000000;
	var newPosition = {};

	for(item in _aroundNodes){
		if(_aroundNodes[item]["len"]<min){
			min = _aroundNodes[item]["len"];
			console.log(min);
			current_position =_aroundNodes[item]["pos"];
			console.log(current_position);
		}else{
			// current_position =_aroundNodes[item]["pos"];
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
(function Start(){
	PrintMap();
	
	Timer = setInterval(MainLoop,1000);
	// console.log("-------------------");
	// console.log(aroundNodeList);
	// console.log("-------------------");
})();
