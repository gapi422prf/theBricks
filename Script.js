var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var zoga = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ploscekHeight = 10;
var ploscekWidth = 75;
var paddleX = (canvas.width-ploscekWidth)/2;
var rightPressed = false;
var leftPressed = false;
var stevecVrstic  = 5;
var stevecStoplcev = 3;
var opekaWidth = 75;
var opekaHeight = 20;
var brickPadding = 10;
var opekaOdmikGor = 30;
var opekaOdmikLevo = 30;
var rezultat = 0;

var bricks = [];
for(var c=0; c<stevecStoplcev; c++) {
  bricks[c] = [];
  for(var r=0; r<stevecVrstic; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
document.addEventListener("mousemove", mouseMove, false);

function keyDown(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUp(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMove(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - ploscekWidth/2;
  }
}
function zaznavanjeTrkov() {
  for(var c=0; c<stevecStoplcev; c++) {
    for(var r=0; r<stevecVrstic; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+opekaWidth && y > b.y && y < b.y+opekaHeight) {
          dy = -dy;
          b.status = 0;
          rezultat++;
          if(rezultat == stevecVrstic*stevecStoplcev) {
            alert("ZMAGAL SI!");
            document.location.reload();
            clearInterval(interval); 
          }
        }
      }
    }
  }
}

function narisiZogo() {
  ctx.beginPath();
  ctx.arc(x, y, zoga, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function narisiPloscek() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-ploscekHeight, ploscekWidth, ploscekHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function narisiOpeko() {
  for(var c=0; c<stevecStoplcev; c++) {
    for(var r=0; r<stevecVrstic; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(opekaWidth+brickPadding))+opekaOdmikLevo;
        var brickY = (c*(opekaHeight+brickPadding))+opekaOdmikGor;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, opekaWidth, opekaHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function izpisiRezultat() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Rezultat: "+rezultat, 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  narisiOpeko();
  narisiZogo();
  izpisiRezultat();
  narisiPloscek();
 
 zaznavanjeTrkov();

  if(x + dx > canvas.width-zoga || x + dx < zoga) {
    dx = -dx;
  }
  if(y + dy < zoga) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-zoga) {
    if(x > paddleX && x < paddleX + ploscekWidth) {
      dy = -dy;
    }
    else {
      alert("KONEC IGRE");
      document.location.reload();
      clearInterval(interval); 
    }
  }

  if(rightPressed && paddleX < canvas.width-ploscekWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10);