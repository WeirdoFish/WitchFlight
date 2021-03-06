function parseAtlas() {
    var star;
    var witch;

    for (var i = 0; i < mapManager.mapData.tilesets.length; i++) {
        var t = mapManager.mapData.tilesets[i];
        if (t.name === "witch_S") {
            witch = t;
        }
        if (t.name === "star_S") {
            star = t;
        }
    }


    var witchSprite = {
        name: 'witch',
        img: new Image(),
        counts: witch.tilecount,
        frames: new Array(),
        h: witch.tileheight, w: witch.tilewidth,
        curFrame: 0
    };

    var img = new Image();
    img.src = witch.image;
    witchSprite.img = img;
    img.onload = function () {
        spriteManager.imgLoadCount++;
        if (spriteManager.imgLoadCount === 2) {
            spriteManager.loaded = true;
        }
    }
    for (var i = 0; i < witch.tilecount; i++) {
        var sprite = {
            sx: 0, sy: 0
        };
        sprite.sx = i * witch.tilewidth;


        witchSprite.frames.push(sprite);
    }
    spriteManager.sprites.push(witchSprite);

    var starSprite = {
        name: 'star',
        img: new Image(),
        counts: star.tilecount,
        frames: new Array(),
        h: star.tileheight, w: star.tilewidth
    };

    var img2 = new Image();
    img2.src = star.image;
    starSprite.img = img2;
    img2.onload = function () {
        spriteManager.imgLoadCount++;
        if (spriteManager.imgLoadCount === 2) {
            spriteManager.loaded = true;
        }
    }
    spriteManager.sprites.push(starSprite);

    for (var i = 0; i < star.tilecount; i++) {
        var sprite = {
            sx: 0, sy: 0
        };
        sprite.sx = i * star.tilewidth;

        starSprite.frames.push(sprite);
    }

}

function drawSprite(ctx, name, x, y, scalex, scaley) {
    var sprite = this.getSprite(name);
    if (mapManager.isVisible(x, y, sprite.w, sprite.h)) {
        x -= mapManager.view.x;
        y -= mapManager.view.y;
        //setInterval(animate(ctx,sprite,x, y,scalex,scaley),50);

        if (name === "witch") {
            ctx.drawImage(sprite.img, sprite.frames[Math.floor(sprite.curFrame)].sx, sprite.frames[Math.floor(sprite.curFrame)].sy, sprite.w, sprite.h, x, y, scalex, scaley);
          //  sprite.curFrame++;
          sprite.curFrame+=0.1;
         // sprite.curFrame=Math.floor(sprite.curFrame);
            if (Math.floor(sprite.curFrame) === sprite.frames.length)
                sprite.curFrame = 0;
        } else
            ctx.drawImage(sprite.img, sprite.frames[0].sx, sprite.frames[0].sy, sprite.w, sprite.h, x, y, scalex, scaley);
        //  ctx.drawImage(sprite.img, x, y, sprite.w, sprite.h);
    } else
        return;
}

function getSprite(name) {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].name === name)
            return this.sprites[i];
    }
    return null;
}

