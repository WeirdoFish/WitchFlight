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
    soundManager.play(urls[0],{looping:true,volume:0.4});
     setInterval(move, 128);
}

