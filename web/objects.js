var Entity = {
    pos_x: 0,
    pos_y: 0,
    size_x: 0,
    size_y: 0,
    createPlayer: function () {
        var Player = Object.create(Entity);
        Player.move_y = 0;
        Player.draw = function draw(ctx) {
            drawSprite(ctx,"witch_S",this.pos_x,this.pos_y)
        };
        Player.update = function update() {};
        Player.onTouchEntity = function onTouchEntity(obj) {};
        Player.onTouchMap = function onTouchMap(obj) {};
        return Player;
    },
    createStar: function () {
        var Star = Object.create(Entity);
        Star.draw = function draw(ctx) {
            drawSprite(ctx,"star_S",this.pos_x,this.pos_y)
        };
        Star.kill = function kill() {};
        return Star;
    }
}

var SpriteManager = {
    sprites: new Array(),
    drawSprite: drawSprite,
    parseAtlas: parseAtlas,
    getSprite: getSprite
};
var Sprite = {
    name: null,
    img: new Image(),
    counts: 0,
    frames: new Array(),
    h: 0, w: 0
}
var SpriteInfo = {
    sx: 0, sy: 0
}

var parseAtlas = function () {
    var star;
    var witch;
    var manager = new SpriteManager();

    for (var i = 0; i < mapManager.mapData.tilesets.length; i++) {
        var t = mapManager.mapData.tilesets;
        if (t.name === "witch_S") {
            witch = t;
        }
        if (t.name === "star_S") {
            star = t;
        }
    }


    var witchSprite = new Sprite();
    var img = new Image();
    img.src = witch.image;
    witchSprite.img = img;
    witchSprite.counts = witch.tilecount;

    witchSprite.w = witch.tilewidth;
    witchSprite.h = witch.tileheight;
    for (var i = 0; i < witch.tilecount; i++) {
        var sprite = new SpriteInfo();
        sprite.sx = i * witch.tilewidth;
        if (sprite.sx !== 0)
            sprite.sx += 1; //смещение от предыдущего кадра
        sprite.sy = witch.tileheight;

        witchSprite.frames.push(sprite);
    }
    manager.sprites.push(witchSprite);

    var starSprite = new Sprite();
    var img2 = new Image();
    img2.src = star.image;
    starSprite.img = img;
    starSprite.counts = star.tilecount;

    starSprite.w = star.tilewidth;
    starSprite.h = star.tileheight;
    for (var i = 0; i < star.tilecount; i++) {
        var sprite = new SpriteInfo();
        sprite.sx = i * star.tilewidth;
        if (sprite.sx !== 0)
            sprite.sx += 1; //смещение от предыдущего кадра
        sprite.sy = star.tileheight;

        manager.spritesS.push(sprite);
    }

    return manager;
}

drawSprite = function (ctx, name, x, y) {
    var sprite = this.getSprite(name);
    if (!mapManager.isVisible(x, y, sprite.w, sprite.h)) {
        x-=mapManager.view.x;
        y-=mapManager.view.y;
        ctx.drawImage(sprite.image,sprite.frames[0].x,sprite.frames[0].y,sprite.w, sprite.h, x,y,sprite.w, sprite.h)
    } else
        return;
}

getSprite = function (name) {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].name === name)
            return this.sprites[i];
    }
    return null;
} 