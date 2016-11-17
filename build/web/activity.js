function initMove(event) {
    if (event.keyCode === 38 || event.keyCode === 87) {
        if (gameManager.player.pos_y > 0)
            gameManager.player.pos_y -= 4;
    }

    if (event.keyCode === 40 || event.keyCode === 83) {
        if (gameManager.player.pos_y < 445)
            gameManager.player.pos_y += 4;
    }
}



//init obj
function init(type) {
    if (type === "player") {
        var player = Entity.createPlayer();
        return player;
    }
    if (type === "star") {
        var star = Entity.createStar();
        return star;
    }
}
function initPlayer(obj) {
    this.player = obj;
}

function drawAll() {
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(ctx, this.entities[i].size_x, this.entities[i].size_y);
    }
}

var physManager = {
    update: function () {

        if (mapManager.view.x > mapManager.xCount * mapManager.tSize.x) {
//            var temp_y = mapManager.player.pos_y;
//            mapManager.view.x = 0;
//            mapManager.parseEntities();
//            mapManager.player.pos_y = temp_y;
            mapManager.view.x = 0
            failed();
        } else {
            mapManager.view.x += 1;
        }
        for (var i = 0; i < gameManager.entities.length; i++) {
            // if (gameManager.entities[i].name !== "witch")
            gameManager.entities[i].update();
        }
    },
    onTouch: function (player) {
        var coords = new Array();
        var tx = mapManager.tSize.x;
        //var ty
        //
        //голова
        coords.push({x: player.pos_x + 2 * tx, y: player.pos_y});
        coords.push({x: player.pos_x + 3 * tx, y: player.pos_y});
        //шея
        coords.push({x: player.pos_x + 2 * tx, y: player.pos_y + tx});
        coords.push({x: player.pos_x + 3 * tx, y: player.pos_y + tx});
        //метла
        //
        //coords.push({x: player.pos_x, y: player.pos_y + 2 * tx});
        //  coords.push({x: player.pos_x + tx, y: player.pos_y + 2 * tx});
        coords.push({x: player.pos_x + 2 * tx, y: player.pos_y + 2 * tx});
        coords.push({x: player.pos_x + 3 * tx, y: player.pos_y + 2 * tx});
        //ноги
        coords.push({x: player.pos_x + 2 * tx, y: player.pos_y + 3 * tx});

        var touch = 0;
        for (var i = 0; i < coords.length; i++) {
            coords.x += 10;
            coords.y += 10;
            touch = mapManager.getTilesetIDX(coords[i].x, coords[i].y);
            if (touch) {
                if (!soundManager.isMuted)
                    soundManager.play("sounds/fail.wav");
                //console.log(touch);
                failed(gameManager.player.score);
                clearInterval(processGame);
                ic_snd.src = "images/soundon.png";
                touch = 0;
                return;
            }
        }

        for (var j = 0; j < gameManager.entities.length; j++) {
            if (gameManager.entities[j].name !== "witch") {

                var star = gameManager.entities[j];
                var tile_star = mapManager.getPosIDX(star.pos_x + 5, star.pos_y + 5);
                var get = 0;
                for (var i = 0; i < coords.length; i++) {
                    get = mapManager.getPosIDX(coords[i].x, coords[i].y);
                    if (get === tile_star) {
                        //console.log("GOTCHA");

                        get = 0;
                        player.score += 1;
                        gameManager.entities.splice(j, 1);
                        if (!soundManager.isMuted)
                            soundManager.play("sounds/coin.wav");
                    }
                }
            }
        }

    }

};
