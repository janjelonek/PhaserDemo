var demo = {};
var centerX = 1500 / 2;
var centerY = 1000 / 2;
var adam, speed = 6;
demo.state0 = function () {};
demo.state0.prototype = {
    preload: function () {
        game.load.image('adam', 'assets/sprites/adam.png');
        game.load.image('tree', 'assets/backgrounds/treeBG.png');
    }
    , create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#800080';
        console.log('state0');
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 2813, 1000);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var treeBG = game.add.sprite(0, 0, 'tree');
        
        adam = game.add.sprite(centerX, centerY, 'adam');
        adam.anchor.setTo(0.5, 0.5);
        adam.scale.setTo(0.7, 0.7);
        game.physics.enable(adam);
        adam.body.collideWorldBounds = true;
        
        game.camera.follow(adam);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
    }
    , update: function () {
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            adam.scale.setTo(0.7, 0.7);
            adam.x += speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            adam.scale.setTo(-0.7, 0.7);
            adam.x -= speed;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            adam.y -= speed;
            if(adam.y<395){
                adam.y = 395;
            }
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            adam.y += speed;
        }
    }
};

function changeState(i, stateNum) {
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners() {
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
    addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
    addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
    addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
    addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
    addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}