function initSound() {
    this.context = new AudioContext();
    this.gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode();
    this.gainNode.connect(this.context.destination);
}


function loadSound(url, callback) {
    if (this.clips[url]) {
        callback(this.clips[url]);
        return;
    }
    var clip = {url: url, buffer: null, loaded: false};
    clip.play = function (volume, loop) {
        soundManager.play(this.url, {looping: loop ? loop : false, volume: volume ? volume : 1});
    };
    this.clips[url] = clip;

    var request = new XMLHttpRequest();
    //var path = "serverpage?getsound=true";
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        soundManager.context.decodeAudioData(request.response, function (buffer) {
            clip.buffer = buffer;
            clip.loaded = true;
            callback(clip);
        });
    };
    request.send();
}

function loadArray(array) {
    for (var i = 0; i < array.length; i++) {
        soundManager.loadSound(array[i], function () {
            if (array.length === Object.keys(soundManager.clips).length) {
                for (s in soundManager.clips)
                    if (!soundManager.clips[s].loaded)
                        return;
                soundManager.loaded = true;
            }
        });
    }
}
function play(url, settings) {
    if (!soundManager.loaded) {
        setTimeout(function () {
            soundManager.play(url, settings);
        }, 1000);
        return;
    }

    var looping = false;
    var volume = 1;
    if (settings) {
        looping = settings.looping;
        volume = settings.volume;
    }
    var sd = this.clips[url];
    if (sd === null)
        return false;

    var sound = soundManager.context.createBufferSource();
    sound.buffer = sd.buffer;
    sound.loop = looping;
    sound.connect(soundManager.gainNode);
    soundManager.gainNode.gain.value = volume;

    if (!sound.start)
        sound.start = sound.noteOn;
    sound.start(0);
    return true;
}

function stop(){
    this.gainNode.disconnect();
    //this.gainNode = this.context.createGainNode(0);
    this.gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode();
    this.gainNode.connect(this.context.destination);
}