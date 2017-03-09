
 //定义全局参数
var canvas;
var context;
var isWhite = true;
var chessData = new Array(15);//创建数组记录落子位置
for(x=4;x<=18;x++){
    chessData[x]= new Array(15);
    for(y=2;y<=16;y++){
        chessData[x][y]=0;
    }
}
//重置网页
function restart(){
    drawRect()
}
function drawRect(){
   
    //创建棋盘背景
    canvas = document.getElementById("canvas");//获取canvasID
    context = canvas.getContext("2d");//规定画布维度
    context.fillStyle = '#15aafb'//画布填充颜色
    context.fillRect(0,0,1024,768)//绘制画布

//     //标题
//     context.fillStyle = "#e4393a";
//     context.font = "40px Arial";
//     context.strokeText('五子棋',350,50);

//     //再来一局
    
//    context.strokeRect(790, 140, 120, 30);
//    context.fillStyle = '#00f';
//    context.font = '25px Arial';
//    context.strokeText('再来一局', 800, 165);
    
    //画棋盘
    for(var i = 1;i < 16;i++){
        context.beginPath();
        context.moveTo(40*i+140,80);
        context.lineTo(40*i+140,640);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(180,40*i+40);
        context.lineTo(740,40*i+40);
        context.closePath();
        context.stroke();
    }

    
    
}

//点击事件
function play(e){
    var color;
    var e = e||event;
    var px = e.clientX;
    var py = e.clientY;
    var x = parseInt(px/40);
    var y = parseInt(py/40);
    if(x<4||y<2||x>18||y>16||chessData[x][y]!=0){
        return;

    }else if(isWhite){
        color = "white";
        chess(color,x,y);
        isWhite = false;
        chessData[x][y]=1;
    
    }else{
        color = "black";
        chess(color,x,y);
        isWhite = true;
        chessData[x][y]=2;
    }
    console.log(x,y)
    
    
}
//绘制棋子
function chess(color,x,y){
    context.beginPath();
    context.fillStyle = color;
    context.arc(x*40+20,y*40,15,0,Math.PI*2,true);
    context.closePath;
    context.fill();

}
function doCheck(x,y){

}