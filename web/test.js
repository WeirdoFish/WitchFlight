var image = new Image();
image.src = "images/bg0.png";
image.x = 0;
image.y = 0;
image.h = 600;
image.w = 1100;

image.onload = function () {
    image.x = image.x + image.w;
    ctx.drawImage(image, image.x, image.y, image.w, image.h);
    moveBackGround();
};

var image2 = new Image();
image2.x = 0;
image2.y = 0;
image2.src = "images/bg0.png";
image2.w = 1100;

var moveBackGround = function () { // аргумент s — это скорость движения фона
    setInterval(function () {
        image.x--;
        image2.x--;
        ctx.drawImage(image, image.x, image.y, image.w, image.h);
        ctx.drawImage(image2, image2.x, image2.y, image2.w, image2.h);

        if (image.x + image.w < 0) {
            image.x = image2.x + image2.w;
        }

        if (image2.x + image2.w < 0) {
            image2.x = image.x + image.w;
        }

        mapManager.draw(ctx);
    }, 20);
};
