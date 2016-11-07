var image = new Image();
image.src="images/bg0.png";
image.onload = function(){
    ctx.drawImage(image,0,0,800,600);
};