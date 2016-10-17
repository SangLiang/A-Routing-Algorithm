/*
	Astar寻路算法
	v2.0
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
var SIZE = 6;

var Map = [
	0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0,
	0, 0, 1, 0, 0, 0,
	2, 0, 1, 0, 0, 3,
	0, 0, 1, 0, 0, 0,
	0, 0, 0, 0, 0, 0
];

// 打印地图
var PrintMap = function () {
    for (var i = 0; i < Map.length - SIZE; i = i + SIZE) {
        console.log(Map[i] + " " + Map[i + 1] + " " + Map[i + 2] + " " + Map[i + 3] + " " + Map[i + 4] + " " + Map[i + 5]);
        if (i % SIZE == SIZE - 1) {
            console.log(" ");
        }
    }
}

PrintMap();