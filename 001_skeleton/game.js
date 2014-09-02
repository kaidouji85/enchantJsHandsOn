enchant();
var core;

window.onload = function() {
    core = new Core(640, 480);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";
    core.start();
};