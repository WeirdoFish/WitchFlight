
function initMove(event) {
    if (event.keyCode === 38 || event.keyCode === 87) {
        if (gameManager.player.pos_y > 0)
            gameManager.player.pos_y -= 5;
    }

    if (event.keyCode === 40 || event.keyCode === 83) {
        if (gameManager.player.pos_y < 445)
            gameManager.player.pos_y += 5;
    }
}


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
        mapManager.view.x += 5;
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
        coords.push({x: player.pos_x, y: player.pos_y - 2 * tx});
        coords.push({x: player.pos_x + tx, y: player.pos_y + 2 * tx});
        coords.push({x: player.pos_x + 2 * tx, y: player.pos_y + 2 * tx});
        coords.push({x: player.pos_x + 3 * tx, y: player.pos_y + 2 * tx});
        //ноги
        coords.push({x: player.pos_x + 3 * tx, y: player.pos_y + 3 * tx});

        var touch = 0;
        for (var i = 0; i < coords.length; i++) {
            coords.x += 10;
            coords.y += 10;
            touch = mapManager.getTilesetIDX(coords[i].x, coords[i].y, 1);
            touch = mapManager.getTilesetIDX(coords[i].x, coords[i].y, 2);
            if (touch !== 0) {
                console.log("AAAAAA!" + i);
                touch = 0;
                return;
            }
        }

        for (var i = 0; i < gameManager.entities.length; i++) {
            if (gameManager.entities[i].name !== "witch") {
                var star = gameManager.entities[i];
            }
        }

    }

//        var X=player.pos_x;
//         var Y=player.pos_y;
//         var cloud=mapManager.getTilesetIDX(X,Y);
//         if (cloud!==0){
//             alert ("AAAA!");
//         }
//    }
};
