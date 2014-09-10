enchant();

var core;
var player;
var enemyArray = new Array(4);
var shotArray = new Array(3);
var oldInput = {};

window.onload = function() {
    core = new Core(640, 480);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";

    core.preload('player.PNG');
    core.preload('enemy.PNG');
    core.preload('shot.PNG');

    core.onload = initGame;
    core.start();
};

function initGame() {
    player = new Sprite(128,128);
    player.image = core.assets['player.PNG'];
    player.x = 256;
    player.y = 352;
    player.addEventListener(Event.ENTER_FRAME,function(){
        if(core.input.right){
            player.x += 4;
        } else if(core.input.left) {
            player.x -= 4;
        }

        if(core.input.up){
            player.y -= 4;
        } else if(core.input.down) {
            player.y += 4;
        }

        if(core.input.z && !oldInput.z && player.visible===true){
            for(var i=0; i<3; i++){
                if(shotArray[i].visible===false){
                    shotArray[i].x = player.x+32;
                    shotArray[i].y = player.y-32;
                    shotArray[i].visible = true;
                    break;
                }
            }
        }

        if(player.x < 0){
            player.x = 0;
        }if(player.x > 512) {
            player.x = 512;
        }
        if(player.y < 0){
            player.y = 0;
        }
        if(player.y > 352) {
            player.y = 352;
        }
    });
    core.rootScene.addChild(player);

    for(var i=0; i<4; i++){
        enemyArray[i] = createEnemy(i*170,0);
        core.rootScene.addChild(enemyArray[i]);
    }

    for(i=0; i<3; i++){
        shotArray[i] = createShot();
        core.rootScene.addChild(shotArray[i]);
    }


    core.rootScene.addEventListener(Event.ENTER_FRAME,enterFrameByCore);
    core.keybind(90, 'z');
}

function enterFrameByCore() {
    for(var i=0; i<4; i++){
        if(enemyArray[i].visible===true && player.intersect(enemyArray[i])){
            player.visible = false;
        }
        for(var j=0; j<3; j++){
            if(shotArray[j].intersect(enemyArray[i]) && shotArray[j].visible === true){
                enemyArray[i].visible = false;
            }
        }
    }

    $.extend(true,oldInput,core.input);
}

function createEnemy(posx,posy) {
    var lenemy = new Sprite(128,128);
    lenemy.image = core.assets['enemy.PNG'];
    lenemy.x = posx;
    lenemy.y = posy;
    lenemy.addEventListener(Event.ENTER_FRAME,function(){
        lenemy.y += 2;
    });
    return lenemy;
}

function createShot(){
    var lshot = new Sprite(64,128);
    lshot.image = core.assets['shot.PNG'];
    lshot.visible = false;
    lshot.addEventListener(Event.ENTER_FRAME,function(){
        lshot.y -= 18;
        if(lshot.y < -128) {
            lshot.visible = false;
        }
    });
    return lshot;
}