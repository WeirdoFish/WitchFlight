var image = new Image();
image.src = "images/bg0.png";
image.xc = 0;
image.yc = 0;
image.h = 600;
image.w = 1100;

image.onload = function () {
    image.xc = image.xc + image.w;
    ctx.drawImage(image, image.xc, image.yc, image.w, image.h);
    setInterval(move,100);
};

var image2 = new Image();
image2.xc = 0;
image2.yc = 0;
image2.src = "images/bg0.png";
image2.w = 1100;

var move = function () {
        image.xc-=1;
        image2.xc-=1;
        ctx.clearRect(0,0,canvas.width, canvas.height);
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
};
