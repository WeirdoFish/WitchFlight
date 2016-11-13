
function initMove(event) {
    if (event.keyCode === 38 || event.keyCode === 87) {

    }

    if (event.keyCode === 40 || event.keyCode === 83) {

    }
}


function init (type){
    if (type==="player"){
        var player = Entity.createPlayer();
        return player;
    }
    if (type==="star"){
        var star = Entity.createStar();
        return star;
    }
}
function initPlayer() {

}

function drawAll(){
    for (var i=0; i<this.entities.length; i++){
        this.entities[i].draw(ctx,this.entities[i].size_x,this.entities[i].size_y);
    }
}