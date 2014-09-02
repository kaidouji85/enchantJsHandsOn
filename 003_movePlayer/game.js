enchant();

var core;
var player;

window.onload = function() {
    core = new Core(640, 480);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";

    core.preload('player.PNG');

    core.onload = initGame;
    core.start();
};

function initGame() {
    player = new Sprite(128,128);
    player.image = core.assets['player.PNG'];
    player.addEventListener(Event.ENTER_FRAME,function(){
        if(core.input.right){
            player.x += 8;
        } else if(core.input.left) {
            player.x -= 8;
        }

        if(core.input.up){
            player.y -= 8;
        } else if(core.input.down) {
            player.y += 8;
        }
    });
    core.rootScene.addChild(player);
}