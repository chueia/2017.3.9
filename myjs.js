//禁止页面滚动，避免取值错误
$(document.body).css({
    "overflow-x": "hidden",
    "overflow-y": "hidden"
});
//定义全局参数
var canvas;
var context;
var isWhite = true;//先手白棋
var winner = ''//定义赢家，初始为空
var chessData = new Array(15);//创建数组记录落子位置
for (x = 4; x <= 18; x++) {
    chessData[x] = new Array(15);
    for (y = 2; y <= 16; y++) {
        chessData[x][y] = 0;
    }
}
//重置网页
function restart() {
    drawRect()
}
function drawRect() {

    //创建棋盘背景
    canvas = document.getElementById("canvas");//获取canvasID
    context = canvas.getContext("2d");//规定画布维度
    context.fillStyle = '#15aafb'//画布填充颜色




    context.fillRect(0, 0, 1024, 768)//绘制画布

    //标题
    context.fillStyle = "#e4393a";
    context.font = "40px Arial";
    context.strokeText('傻淮五子棋', 350, 50);

    //     //再来一局

    //    context.strokeRect(790, 140, 120, 30);
    //    context.fillStyle = '#00f';
    //    context.font = '25px Arial';
    //    context.strokeText('再来一局', 800, 165);

    //画棋盘
    for (var i = 1; i < 16; i++) {
        context.beginPath();
        context.moveTo(40 * i + 140, 80);
        context.lineTo(40 * i + 140, 640);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(180, 40 * i + 40);
        context.lineTo(740, 40 * i + 40);
        context.closePath();
        context.stroke();
    }
}
//点击事件
function play(e) {
    var color;
    var e = e || event;
    var px = e.clientX;
    var py = e.clientY;
    var x = parseInt(px / 40);
    var y = parseInt(py / 40);
    if (x < 4 || y < 2 || x > 18 || y > 16 || chessData[x][y] != 0) { //xy在棋盘中且没有点过
        return;

    } else if (isWhite) {
        color = "white";
        chess(color, x, y);
        isWhite = false;
        chessData[x][y] = 1;

    } else {
        color = "black";
        chess(color, x, y);
        isWhite = true;
        chessData[x][y] = 2;

    }


}
//绘制棋子
function chess(color, x, y) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x * 40 + 20, y * 40, 15, 0, Math.PI * 2, true);
    context.closePath;
    context.fill();
    isWin(color, x, y);
}
//判断是否胜利
function isWin(color, x, y) {
    console.log('判断' + color + '(' + x + ',' + y + ')是否胜利');
    var temp = 2;
    if (color == "white") {
        temp = 1;
    }
    chessData[x][y] = temp;
    lrCount(temp, x, y);//判断左右方向是否胜利
    tbCount(temp, x, y);//判断上下方向是否胜利
    lt_rbCount(temp, x, y);//判断左上右下方向是否胜利
    rt_lbCount(temp, x, y);//判断右上左下方向是否胜利
}
function lrCount(temp, x, y) {//左右判定
    var count = 0;//连线总数
    for (var i = x; i >= 4; i--) {//左判定
        if (chessData[i][y] == temp) {
            ++count;
        } else {
            i = -1;
        }
    }
    for (var i = x; i <= 18; i++) {//右判定
        if (chessData[i][y] == temp) {
            ++count
        } else {
            i = 100;
        }
    }
    success(temp, --count);
}
function tbCount(temp, x, y) {//上下判定
    var count = 0;
    for (var i = y; i >= 2; i--) {//上判定
        if (chessData[x][i] == temp) {
            ++count;
        } else {
            i = -1
        }
    }
    for (var i = y; i <= 16; i++) {//下判定
        if (chessData[x][i] == temp) {
            ++count;
        } else {
            i = 100;
        }
    }
    success(temp, --count);
}
function lt_rbCount(temp, x, y) {//左上，右下判定
    var count = 0;
    for (var i = x, k = y; i >= 4, k >= 2; i-- , k--) {//左上判定
        if (chessData[i][k] == temp) {
            ++count;
        } else {
            i = -1;
            k = -1;
        }
    }
    for (var i = x, k = y; i <= 18, k <= 16; i++ , k++) {//右下判定

        if (chessData[i][k] == temp) {
            ++count;
        } else {
            i = 100;
            k = 100;
        }
    }
    success(temp, --count);
}
function rt_lbCount(temp, x, y) {//右上，左下判定
    var count = 0;
    for (var i = x, k = y; i >= 4, k <= 16; i-- , k++) {//左下判定
        if (chessData[i][k] == temp) {
            ++count;
        } else {
            i = -1;
            k = 100;
        }
    }
    for (var i = x, k = y; i <= 18, k >= 2; i++ , k--) {//右上判定
        if (chessData[i][k] == temp) {
            ++count;
        } else {
            i = 100;
            k = -1;
        }
    }
    success(temp, --count);
}
function success(temp, count) {//判断是否胜利

    if (count == 5) {
        if (temp == 1) {
            layer.alert('白棋赢啦');
            window.restart();
            clearChess();
        } else if (temp == 2) {
            layer.alert('黑棋赢啦');
            window.restart();
            clearChess();
        }

    } else {
        console.log('no winer');
    }
}
function clearChess() {
    for (x = 4; x <= 18; x++) {
        chessData[x] = new Array(15);
        for (y = 2; y <= 16; y++) {
            chessData[x][y] = 0;
        }
    }
}
// layer.alert('墨绿风格，点击确认看深蓝', {
//   skin: 'layui-layer-molv' //样式类名
//   ,closeBtn: 0
// })
//五子棋AI
function getScore() {//获取分数
    var i = new Arraw(2);
    var score = 0;
    for (var x = 4; x <= 18; x++) {
        for (var y = 2; y <= 16; y++) {
            if (chessData == 0) {//如果当前位置没棋子再判断分数
                if (judge(x, y) > score) {
                    score = judge(x, y);
                    i[0] = x;
                    i[1] = y;
                }
            }
        }
    }
    return i;
}

function judge(x, y) {//AI算分
    var a = parseInt(aiLR(x, y, 1)) +
        parseInt(aiTB(x, y, 1)) +
        parseInt(aiRT(x, y, 1)) +
        parseInt(aiLB(x, y, 1));
    var b = parseInt(aiLR(x, y, 2)) +
        parseInt(aiTB(x, y, 2)) +
        parseInt(aiRT(x, y, 2)) +
        parseInt(aiLB(x, y, 2));
    var result = a + b;
    return result;
}

function aiPlay() {//AI下棋
    var str = getPosition();
    aiCheck(str[0], str[1]);//AI检查
}

function aiCheck() {
    if (winner != '' && winner != null) {
        return;
    }
    if (isWhite) {
        color = "white";
    } else {
        color = "black"
    }
    chess(color, x, y);
}

function aiLR(x, y, num) {
    var death = 0;//死路
    var live = 0;//被堵住
    var count = 0;//没子
    var arr = new Array(15);
    for (var i = 4; i <= 18; i++) {
        arr[i] = new Array(15);
        for (var j = 2; j <= 16; j++) {
            arr[i][j] = chessData[i][j];
        }
    }
    arr[x][y] = num;
    for (var i = x; i >= 4; i--) {
        if (arr[i][y] == num) {
            count++;
        } else if (arr[i][y] == 0) {
            live += 1;
            i = -1;
        }else{
            death += 1;
            i = -1;
        }
    }
}