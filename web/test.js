var image = new Image();
image.src = "images/bg0.png";
image.xc = 0;
image.yc = 0;
image.h = 600;
image.w = 1100;

image.onload = function () {
    image.xc = image.xc + image.w;
    ctx.drawImage(image, image.xc, image.yc, image.w, image.h);
    // setInterval(move, 128);
};

var image2 = new Image();
image2.xc = 0;
image2.yc = 0;
image2.src = "images/bg0.png";
image2.w = 1100;

var ic_snd = new Image();
ic_snd.src="images/soundon.png";
ic_snd.onclick=function(){soundManager.stop();};


var move = function () {
    image.xc -= 1;
    image2.xc -= 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, image.xc, image.yc, image.w, image.h);
    ctx.drawImage(image2, image2.xc, image2.yc, image2.w, image.h);

    if (image.xc + image.w < 0) {
        image.xc = image2.xc + image2.w;
    }

    if (image2.xc + image2.w < 0) {
        image2.xc = image.xc + image.w;
    }

    mapManager.draw(ctx);
    gameManager.drawAll();
    physManager.update();
    physManager.onTouch(gameManager.player);
    drawText(ctx, gameManager.player.score)
};

function drawText(ctx, text) {
    ctx.font = "28px Myriad ProS";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";

    var ic_star = new Image();
    ic_star.src = "images/star.png";
   // ic_star.onload = function () {
        ctx.drawImage(ic_star, 10, canvas.height - 35, 30, 30);
        ctx.drawImage(ic_snd, canvas.width-50, 20, 30, 30);
   // }
    ctx.fillText(text, 50, canvas.height - 8);
}
