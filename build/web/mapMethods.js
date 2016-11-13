function loadMap() {
    var path = "newmap11.json";//"serverpage?getjson=true";
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            //ответ получен
           loadAll(request.responseText);
        }
    };

    request.open("GET", path, true);
    request.send();
}
;
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
            
function parseMap(tilesJSON) {
    this.mapData = JSON.parse(tilesJSON);
    this.xCount = this.mapData.width;
    this.yCount = this.mapData.height;
    this.tSize.y = this.mapData.tileheight;
    this.tSize.x = this.mapData.tilewidth;
    this.mapSize.x = this.xCount * this.tSize.x;
    this.mapSize.y = this.yCount * this.tSize.y;
    for (var i = 0; i < this.mapData.tilesets.length; i++) {
        var img = new Image();

        img.onload = function () {
            mapManager.imgLoadCount++;
            if (mapManager.imgLoadCount === mapManager.mapData.tilesets.length) {
                mapManager.imgLoaded = true;
            }
        };
        var t = this.mapData.tilesets[i];
        img.src = t.image;
        var ts = {
            firstgid: t.firstgid,
            image: img,
            name: t.name,
            xCount: Math.floor(t.imagewidth / mapManager.tSize.x),
            yCount: Math.floor(t.imageheight / mapManager.tSize.y),
            tileheight: t.tileheight,
            tilewidth: t.tilewidth
        };
        this.tilesets.push(ts);
    }
    this.jsonLoaded = true;
}


function draw(ctx) {
    if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
        setTimeout(function () {
            mapManager.draw(ctx);
        }, 100);
    } else {
        if (this.tLayer === null)
            for (var id = 0; id < this.mapData.layers.length; id++) {
                var layer = this.mapData.layers[id];
                if (layer.type === "tilelayer") {
                    this.tLayer = layer;
                    break;
                }
            }
        for (var i = 0; i < this.tLayer.data.length; i++) {
            if (this.tLayer.data[i] !== 0) {
                var tile = this.getTile(this.tLayer.data[i]);
                var pX = (i % this.xCount) * this.tSize.x;
                var pY = Math.floor(i / this.xCount) * this.tSize.y;
                if (!this.isVisible(pX, pY, this.tSize.x, this.tSize.y))
                    continue;
                pX -= this.view.x;
                pY -= this.view.y;
                var tX = tile.tilewidth;
                var tY = tile.tileheight;

                ctx.drawImage(tile.img, tile.px, tile.py, tX, tY, pX, pY, tX, tY);
            }
        }
    }
}
function isVisible(x, y, width, height) {
    if (x + width < this.view.x || y + height < this.view.y || x > this.view.x + this.view.w || y > this.view.y + this.view.h)
        return false;
    return true;
}



function getTile(tileIndex) {
    var tile = {
        img: null,
        px: 0, py: 0,
        tileheight: 0,
        tilewidth: 0
    };

    var tileset = this.getTileset(tileIndex);
    tile.img = tileset.image;
    tile.tilewidth = tileset.tilewidth;
    tile.tileheight = tileset.tileheight;

    var id = tileIndex - tileset.firstgid;
    var x = id % tileset.xCount;
    var y = Math.floor(id / tileset.xCount);
    tile.px = x * mapManager.tSize.x;
    tile.py = y * mapManager.tSize.y;
    return tile;
}

function getTileset(tileIndex) {
    for (var i = mapManager.tilesets.length - 1; i >= 0; i--) {

        if (mapManager.tilesets[i].firstgid <= tileIndex) {
            return mapManager.tilesets[i];

        }
        return null;
    }
}

function  parseEntities() {
    if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
        setTimeout(function () {
            mapManager.parseEntities();
        }, 100);
    } else {
        for (var j = 0; j < this.mapData.layers.length; j++) {
            var layer = this.mapData.layers[j];
            if (layer.type === "objectgroup") {
                var entities = layer;
                for (var i = 0; i < entities.objects.length; i++) {
                    var e = entities.objects[i];
                    try {
                        var obj = gameManager.init(e.type);
                        obj.name = e.name;
                        obj.pos_x = e.x;
                        obj.pos_y = e.y;
                        obj.size_x = e.width;
                        obj.size_y = e.height;
                        gameManager.entities.push(obj);
                        if (obj.name === "player")
                            gameManager.initPlayer(obj);
                    } catch (ex) {
                        console.log("err" + e.gid + " " + e.type + " " + ex);
                    }
                }
            }
        }
    }
}

function getTilesetIDX(x, y) {
    var wX = x;
    var wY = y;
    var idx = Math.floor(wY / this.tSize.y) * this.xCount + Math.floor(wX / this.tSize.x);
    var data = this.tLayer.data[idx]
//    if (offset===1 && offset===2 && data!==0 ){
//        return 1;
//    }
    return data;
}
function getPosIDX(x, y) {
    var wX = x;
    var wY = y;
    var idx = Math.floor(wY / this.tSize.y) * this.xCount + Math.floor(wX / this.tSize.x);
   return idx;
}