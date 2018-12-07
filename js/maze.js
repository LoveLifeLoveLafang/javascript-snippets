
class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    /*
    * 取值函数, 赋值函数
    * */
    get x() {
        return this._x;
    }

    set x(x_val) {
        this._x = x_val;
    }

    get y() {
        return this._y;
    }

    set y(y_val) {
        this._y = y_val;
    }

    /*
    * 实现point对象加法运算
    * */
    _add(p) {
        let sum = new Point(0, 0);
        sum.x = this.x + p.x;
        sum.y = this.y + p.y;
        return sum;
    }

    /*
    * 用来判断当前point对象是否越界， 且返回其在具体的二维矩阵中的位置
    * */
    _at(grid) {
        let row = grid.length;
        let col = grid[0].length;

        if ( this.x < 0 || this.x >= row ) {
            return [-1, false];
        }

        if ( this.y < 0 || this.y >= col ) {
            return [-1, false];
        }

        return [grid[this.x][this.y], true];
    }
}

function maze(input) {
    /*
    * 首先获取到数据
    * */
    let row = input.length;
    let col = input[0].length;

    let start = new Point(0, 0);
    let end = new Point(row - 1, col - 1);

    /*
    * 进入迷宫，并返回路径轨迹
    * */

    let path = walkMaze(input, start, end);
    for (let i = 0; i < path.length; i++) {
        console.log(path[i]);
    }

}

//因为使用的是广度优先遍历，所以使用一个辅助队列
function walkMaze(input, start, end) {

    /*
    * 定义一个保存路径的辅助数组
    * */
    let row = input.length;
    let col = input[0].length;
    let path = [];
    for (let i = 0; i < row; i++) {
        path.push(new Array(col));
        for (let j = 0; j < col; j++) {
            path[i][j] = 0;
        }
    }

    /*
    * 先定义好四个邻接方向，以便进行遍历, 顺时针：上，右，下，左
    * */
    let directions = [
        new Point(-1, 0),
        new Point(0, 1),
        new Point(1, 0),
        new Point(0, -1),

    ];

    /*
    * 实例化一个队列
    * */
    let queue = [];
    queue.push(start);

    while(queue.length !== 0) {
        //取出队首元素
        let front = queue.shift();

        if (front.x === end.x && front.y === end.y) {
            break;
        }

        for (let i = 0; i < directions.length; i++) {
            let next = front._add(directions[i]);

            //判断next是否能走通， 是否越界
            let isValid = next._at(input);
            if ( isValid[0] !== 0 || isValid[1] === false ) continue;

            //判断next是否已经走过， 是否越界
            isValid = next._at(path);
            if ( isValid[0] !== 0 || isValid[1] === false ) continue;

            //判断next是否是start point
            if ( next.x === start.x && next.y === start.y)
                continue;

            //next合法， 则进行以下两步
            //1. 将next加入队列
            //2. 更新path表
            queue.push(next);

            let val = front._at(path);
            path[next.x][next.y] = val[0] + 1;
        }
    }

    return path;
}

export default maze;
