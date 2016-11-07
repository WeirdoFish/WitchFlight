 var mapManager = {
            mapData: null,
            tLayer: null,
            xCount: 0,
            yCount: 0,
            tSize: {x: 40, y: 40},
            tilesets: new Array(),
            imgLoadCount:0,
            imgLoaded:false,
            jsonLoaded:false,
            view:{x:0, y:0, w:800, h:500}
        };

 function loadMap() {
            var path = "serverpage?getjson=true";
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    //ответ получен
                    mapManager.parseMap(request.responseText);

                }
            };
            request.open("GET", path, true);
            request.send();
        };

 function parseMap(tilesJSON){
     this.mapData=JSON.parse(tilesJSON);
     this.xCount = this.mapData.width;
     this.yCount = this.mapData.height;
     this.tSize.y=this.mapData.tileheight;
     this.tSize.x=this.mapData.tilewidth;
     this.mapSize.x=this.xCount*this.tSize.x;
     this.mapSize.y=this.yCount*this.tSize.y;
      for(var i=0; i<this.mapData.tilesets.length; i++){
        var img = new Image();
        img.onload = function(){
          mapManager.imgLoadCount++;
          if (mapManager.imgLoadCount===mapManager.mapData.tilesets.length){
            mapManager.imgLoaded=true;
          }
        };
        var t = this.mapData.tilesets[i];
        img.src=t.image;
        var ts = {
          firstgrid:t.firstgrid,
          image:img,
          name:t.name,
          xCount:Math.floor(t.imageheight/mapManager.tSize.x),
          yCount:Math.floor(t.imageheight/mapManager.tSize.y)
        };
        this.tilesets.push(ts);
        }
        this.jsonLoaded=true;
      }


function draw(ctx){
  if (!mapManager.imgLoaded||!mapManager.jsonLoaded){
    setTimeout(function(){mapManager.draw(ctx);},100);
  } else {
    if (this.tLayer===null)
    for (var id=0; id < this.mapData.layers.length; id++){
      var layer = this.mapData.layers[id];
      if (layer.type==="tilelayer"){
        this.tLayer = layer;
        break;
      }
    }
    for (var i=0; i < this.tLayer.data.length; i++){
      if (this.tLayer.data[i]!==0){
        var tile = this.getTile(this.tLayer.data[i]);
        var pX=(i%this.xCount)*this.tSize.x;
        var pY = Math.floor(i/this.x.Count)*this.tSize.y;
        if (!this.isVisible(pX,pY,this.tSize.x,this.tSize.y))
            continue;
            pX-=this.view.x;
            pY-=this.view.y;
        ctx.drawImage(tile.img,tile.px,tile.py,this.tSize.x,this.tSize.y,pX,pY,this.tSize.x,this.tSize.y);
      }
    }
  }
}
function isVisible(x,y,width,height){
    if (x+width<this.view.x || y+ height<this.view.y || x>this.view.x+this.view.w || y>this.view.y + this.view.h)
      return false;
    return true;
}


function getTile(tileIndex){
  var tile={
    img:null,
    px:0,py:0
  };

  var tileset=this.getTileset(tileIndex);
  tile.img=tileset.image;
  var id=tileIndex-tileset.firstgrid;
  var x = id%tileset.xCount;
  var y = Math.floor(id/tileset.xCount);
  tile.px=x*mapManager.tSize.x;
  tile.py=y*mapManager.tSize.y;
  return tile;
  }

function getTileset(tileIndex){
  for (var i = mapManager.tilesets.length-1; i>=0; i--){
    if (mapManager.tilesets[i].firstgrid<=tileIndex){
      return mapManager.tilesets[i];
    }
    return null;
  }
}
