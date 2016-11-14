function initManagers() {
    gameManager = {
        entities: [],
        player: null,
        init: init,
        initPlayer: initPlayer,
        drawAll: drawAll
    }
    mapManager = {
        mapData: null,
        nextRow: 0,
        tLayer: null,
        xCount: 0,
        yCount: 0,
        tSize: {x: 40, y: 40},
        mapSize: {x: 40, y: 40},
        tilesets: new Array(),
        imgLoadCount: 0,
        imgLoaded: false,
        jsonLoaded: false,
        view: {x: 0, y: 0, w: 800, h: 600},
        parseMap: parseMap,
        draw: draw,
        getTile: getTile,
        isVisible: isVisible,
        getTileset: getTileset,
        parseEntities: parseEntities,
        getTilesetIDX: getTilesetIDX,
        getPosIDX: getPosIDX
    };

    Entity = {
        pos_x: 0,
        pos_y: 0,
        size_x: 0,
        size_y: 0,
        name: null,
        createPlayer: function () {
            var Player = Object.create(Entity);
            Player.move_y = 0;
            Player.score = 0;
            Player.draw = function draw(ctx, scalex, scaley) {
                spriteManager.drawSprite(ctx, "witch", this.pos_x, this.pos_y, scalex, scaley)
            };
            Player.update = function update() {
                this.pos_x += 5;
            };
            return Player;
        },
        createStar: function () {
            var Star = Object.create(Entity);
            Star.draw = function draw(ctx, scalex, scaley) {
                spriteManager.drawSprite(ctx, "star", this.pos_x, this.pos_y, scalex, scaley)
            };
            Star.update = function update() {
                //this.pos_x-=2; 
            }
            Star.kill = function kill() {};
            return Star;
        }
    }

    spriteManager = {
        sprites: new Array(),
        loaded: false,
        imgLoadCount: 0,
        drawSprite: drawSprite,
        parseAtlas: parseAtlas,
        getSprite: getSprite
    };

    soundManager = {
        clips: {},
        context: null,
        gainNode: null,
        loaded: false,
        initSound: initSound,
        loadSound: loadSound,
        loadArray: loadArray,
        play: play,
        stop: stop
    };
}


function loadAll(responseText) {
    mapManager.parseMap(responseText);
    mapManager.parseEntities();
    spriteManager.parseAtlas();
    var urls = new Array();
    urls.push("sounds/sound.mp3");
    urls.push("sounds/coin.wav")
    urls.push("sounds/fail.wav")
    soundManager.initSound();
    soundManager.loadArray(urls);
    soundManager.play(urls[0], {looping: true, volume: 0.4});
    startGame();
}

function startGame() {
    if (mapManager.imgLoaded && mapManager.imgLoaded && soundManager.loaded && spriteManager.loaded) {
        processGame = setInterval(move, 100);
    } else
        setTimeout(startGame, 100);
}

