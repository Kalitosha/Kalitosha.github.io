var canvas = document.getElementById('myCanvas'); // подключаем canvas
var ctx = canvas.getContext('2d'); // задаем контекст

window.addEventListener('resize', resizeCanvas, false);
// canvas.addEventListener("touchmove", touchMove, false);

// var Width, Height;

Width = document.documentElement.clientWidth;
Height = document.documentElement.clientHeight;


var gall = 0;
window.onload = function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    // Width = document.documentElement.clientWidth;
    // Height = document.documentElement.clientHeight;

    init();
}

var mouseMove = function(e) {
    platform1.y = e.clientY - platform1.h/2;
    platform2.y = e.clientY - platform2.h/2;
}

var touchMove = function (e) {
    platform1.y = e.clientY - platform1.h/2;
    platform2.y = e.clientY - platform2.h/2;
}

var ball = {
    color : 'black',
    r : 0,
    vx : 0,
    vy : 0,
    x : 0,
    y : 0,
    drawBall : function () {
    }
}

function Rect(color, x, y) {
    this.color = color; // цвет прямоугольника
    this.x = x; // координата х
    this.y = y; // координата у
    this.h = Height / 6; // высота
    this.w = Height / 6 / 15; // ширина
    this.score = 0;
    this.drawRect = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}


function init() {

    platform1 = new Rect('rgb(255, 100, 0)', 1, Height/2 - Height/6/2);
    platform2 = new Rect('rgb(255, 100, 0)', Width - Height/6/15 - 1, Height/2 - Height/6/2);

    ball = {
        color : 'RGB(255, 180, 0)',
        r :  Height/60,
        vx : 3,
        vy : -3,
        x : Width/2,
        y : Height/2,
        drawBall : function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
            ctx.fill();
            ctx.closePath();
        }
    }
    //ball = new Ball('RGB(250, 220, 100)', Width/2, Height/2, Height/40);

    draw();
}
function resizeCanvas() {
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
        /*************************************************************************************/
        //platform1.x = platform1.x * document.documentElement.clientWidth/Width;
        platform1.y = platform1.y * document.documentElement.clientHeight/Height;
        platform1.w = document.documentElement.clientHeight / 6 / 15;
        platform1.h = document.documentElement.clientHeight / 6;

        platform2.x = document.documentElement.clientWidth - document.documentElement.clientHeight / 6 / 15 - 1;
        platform2.y = platform2.y * document.documentElement.clientHeight/Height;
        platform2.w = document.documentElement.clientHeight / 6 / 15;
        platform2.h = document.documentElement.clientHeight / 6;

        ball.r = document.documentElement.clientHeight/60;
        if (gall == 1){

            ball.x = platform2.x - ball.r;
        }
        else if (gall == 2){

            ball.x = platform1.x + platform1.w + ball.r;
        }
        else{
            ball.x = ball.x * document.documentElement.clientWidth/Width;
        }
        ball.y = ball.y * document.documentElement.clientHeight/Height;
        /*************************************************************************************/
        Width = document.documentElement.clientWidth; // window.innerWidth;
        Height = document.documentElement.clientHeight; // window.innerHeight;
        /*************************************************************************************/
}

function draw() {
    ctx.clearRect(0, 0, Width, Height); // стираем

    ctx.strokeStyle = 'rgb(67, 100, 100)';
    ctx.beginPath();
    ctx.moveTo(Width/2, 0);
    ctx.lineTo(Width/2, Height);

    // ctx.moveTo(0, Height/2);
    // ctx.lineTo( Width,Height/2);
    ctx.stroke();

    // ctx.fillStyle = 'rgb(80, 110, 110)';
    // ctx.font = "15px Comic Sans MS";
    // ctx.fillText(Height, 20, 20);
    // ctx.fillText(Width, 70, 20);

    // ctx.fillStyle = 'rgb(80, 110, 110)';
    // ctx.font = "15px Comic Sans MS";
    // ctx.fillText(ball.vx, 170, 20);
    // ctx.fillText(ball.vy, 170, 40);

    //счет
    // ctx.fillStyle = 'rgb(80, 110, 110)';
    ctx.fillStyle = 'red';
    ctx.font = "100px Comic Sans MS";
    ctx.fillText(":", Width/2 - 14, Height/2 + 31);
    ctx.textAlign = "right";
    ctx.fillText(platform1.score, Width/2 - 10, Height/2 + 34);
    ctx.textAlign = "left";
    ctx.fillText(platform2.score, Width/2 + 10, Height/2 + 34);


    ball.drawBall();
    platform1.drawRect();
    platform2.drawRect();

    collision();

    canvas.onmousemove = mouseMove;
    canvas.onmousedown = onMouseDown;
    canvas.touchmove = mouseMove; // TODO проверить
    canvas.touchend = onMouseDown; // убрали палец

    window.requestAnimationFrame(draw);
}

// function anim() {
//     setTimeout(function() {
//         window.requestAnimationFrame(anim)
//     }, 1000 / 60) //Setting the FPS by dividing the one second by <frames>
//     draw();
//     /*...*/
// }
// anim();

function collision() {
    if (gall == 0) {
        if ((ball.y - ball.r < 0) || (ball.y + ball.r > Height)) { // стена: верх, низ
            ball.vy = -ball.vy;
        }

        else if (ball.x - ball.r < platform1.x + platform1.w) { // столкновение с ракеткой №1
            if ((ball.y + ball.r > platform1.y) && (ball.y - ball.r < platform1.y + platform1.h )) // на промежутке
                ball.vx = -ball.vx;
            else { // стена: лево // вне промежутка нахождения ракетки
                platform2.score++;
                ball.x = platform2.x - ball.r;
                ball.y = platform1.y + platform1.h / 2;
                gall = 1;
                return;//ГОЛЛ!
            }
        }

        else if (ball.x + ball.r > platform2.x) { // столкновение с ракеткой №2
            if ((ball.y + ball.r > platform2.y) && (ball.y - ball.r < platform2.y + platform2.h )) { // на промежутке
                ball.vx = -ball.vx;
            }
            else {  // стена: право
                platform1.score++;
                ball.x = platform1.x + platform1.w + ball.r;
                ball.y = platform2.y + platform2.h / 2;
                gall = 2;
                return;//ГОЛЛ!
            }
        }

        ball.x += ball.vx;
        ball.y += ball.vy;
    }
    else
        // if (gall == 1){
            ball.y = platform2.y + platform2.h / 2; // одно и тоже
    // }
    // else
    //     if (gall == 2){
    //         ball.y = platform1.y + platform1.h / 2; // одно и тоже
    // }
}

function onMouseDown(e) {
    if (gall != 0) {
        ball.vx = -ball.vx;
        ball.x += ball.vx;
        gall = 0;
    }
}
