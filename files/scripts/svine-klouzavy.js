var pusher1;
var pusher2;
var config = {
    type: Phaser.AUTO,
    width: 1366,
    height: 768,
    parent: 'Game',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    pusherRadius: 20,
    puckRadius: 20,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var test;
function preload() {
    this.load.image('red-pusher', 'files/img/red-pusher.png');
    this.load.image('blue-pusher', 'files/img/blue-pusher.png');
    this.load.image('background', 'files/img/background.jpg');
    test = this.load.image('puck', 'files/img/puck.png');
}

function updateScore(playerIndex) {
    let original = text._text.split(":").map(a => { return a.trim() });
    original[playerIndex]++;
    text.setText(original[0] + ' : ' + original[1]);

    pusher1.x = config.width / 2;
    pusher1.y = config.height / 2;
    pusher2.x = config.width / 2;
    pusher2.y = config.height / 2;
    puck.x = config.width / 2;
    puck.y = config.height / 2;
    puck.body.velocity.x = 0;
    puck.body.velocity.y = 0;

    for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        gamepad.vibrationActuator.playEffect('dual-rumble', {
            startDelay: 0,
            duration: 222,
            weakMagnitude: 1.0,
            strongMagnitude: 1.0,
        });
    }
}

function update() {
    goal1.x = 0;
    goal1.body.velocity.x = 0;
    goal1.body.velocity.y = 0;

    goal2.x = config.width;
    goal2.body.velocity.x = 0;
    goal1.body.velocity.y = 0;

    bounds = goal1.getBounds();
    if (this.physics.overlapRect(bounds.x, bounds.y, bounds.width, bounds.height).map((el) => { return el.mass == 2 }).some((el) => { return el == true })) {
        updateScore(1);
    }

    bounds = goal2.getBounds();
    if (this.physics.overlapRect(bounds.x, bounds.y, bounds.width, bounds.height).map((el) => { return el.mass == 2 }).some((el) => { return el == true })) {
        updateScore(0);
    }
}

function create() {
    let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
    let scaleX = this.cameras.main.width / background.width
    let scaleY = this.cameras.main.height / background.height
    let scale = Math.max(scaleX, scaleY)
    background.setScale(scale).setScrollFactor(0)

    text = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 48, '0 : 0').setOrigin(0.5).setFontFamily('Arial').setFontSize(64).setColor('#000000');

    goal1 = this.add.rectangle(0, config.height / 2, 10, 170, 0x990000);

    goal2 = this.add.rectangle(config.width, config.height / 2, 10, 170, 0x990000);

    pusher1 = this.physics.add.image(config.width / 2, config.height / 2, 'red-pusher')
    pusher1.setOrigin(2, 0.5).setCircle(pusher1.width / 2).setScale(0.25).setBounce(1).setCollideWorldBounds(true).setMass(2.001);

    pusher2 = this.physics.add.image(config.width / 2, config.height / 2, 'blue-pusher')
    pusher2.setOrigin(-1, 0.5).setCircle(pusher2.width / 2).setScale(0.25).setBounce(1).setCollideWorldBounds(true).setMass(2.001);

    puck = this.physics.add.image(config.width / 2, config.height / 2, 'puck')
    puck.setCircle(puck.width / 2).setScale(0.8).setBounce(1).setCollideWorldBounds(true).setMass(2);

    this.physics.add.collider(pusher1, puck);
    this.physics.add.collider(pusher2, puck);
    this.physics.add.collider(goal1, puck);
    this.physics.add.collider(goal2, puck);
    this.physics.add.collider(pusher1, pusher2);


    puck.body.onWorldBounds = true;
    puck.body.onCollide = true;

    this.physics.add.existing(goal1);

    this.physics.add.existing(goal2);

    goal1.body.onCollide = true;
    goal2.body.onCollide = true;

    /*goal1.body.world.on('collide', function (body) {
        updateScore(0);
    });
    goal1.body.world.on('collide', function (body) {
        updateScore(1);
    });*/

    puck.body.world.on('worldbounds', function (body) {
        currentTime = new Date().getTime();
        if (lastSound + soundDelay < currentTime) {
            new Audio('files/sound/jump.wav').play();
            lastSound = currentTime;
        }
    }, this);

    puck.body.world.on('collide', function (body) {
        currentTime = new Date().getTime();
        if (lastSound + soundDelay < currentTime) {
            new Audio('files/sound/clank.wav').play();
            lastSound = currentTime;
        }
    }, this);
}

standartLayout = ["xAnalog1", "yAnalog1", "xAnalog2", "yAnalog2"];
let toSend = {};

let lastSound = new Date().getTime();

let soundDelay = 90;

let moveSpeed = 1000 

let deathZone = 0.05;

function PlayerControll(event) {

    //TODO:
    //do second if to determine which site |<---->|

    //Local gamepad
    // X analog 1 axis
    xAnalog1 = $("#0-xAnalog1").val() - 0.5;
    yAnalog1 = $("#0-yAnalog1").val() - 0.5;

    xAnalog2 = $("#0-xAnalog2").val() - 0.5;
    yAnalog2 = $("#0-yAnalog2").val() - 0.5;

    pusher1.setVelocity(xAnalog1 * moveSpeed + xAnalog2 * 2 * moveSpeed, yAnalog1 * moveSpeed + yAnalog2 * 2 * moveSpeed);


    xAnalog1 = $("#1-xAnalog1").val() - 0.5;
    yAnalog1 = $("#1-yAnalog1").val() - 0.5;

    xAnalog2 = $("#1-xAnalog2").val() - 0.5;
    yAnalog2 = $("#1-yAnalog2").val() - 0.5;

    pusher2.setVelocity(xAnalog1 * moveSpeed + xAnalog2 * 2 * moveSpeed, yAnalog1 * moveSpeed + yAnalog2 * 2 * moveSpeed);


    /*//Remote gamepad
    // X analog 2 axis
    xAnalog2 = $("#1-xAnalog2").val() - 0.5;
    if (Math.abs(xAnalog2) > deathZone) {
        if (circle2.attr('cx') - xAnalog2 * moveSpeed > circle2.attr('r') + (paper.width / 2) && circle2.attr('cx') - xAnalog2 * moveSpeed < paper.width - circle2.attr('r')) {
            circle2.attr('cx', circle2.attr('cx') - xAnalog2 * moveSpeed);
        } else if (circle2.attr('cx') - xAnalog2 * moveSpeed < circle2.attr('r') + (paper.width / 2)) {
            circle2.attr('cx', (paper.width / 2) + circle2.attr('r'));
        } else {
            circle2.attr('cx', paper.width - circle2.attr('r'));
        }
    }
 
    // Y analog 2 axis
    yAnalog2 = $("#1-yAnalog2").val() - 0.5;
    if (Math.abs(yAnalog2) > deathZone) {
        if (circle2.attr('cy') + yAnalog2 * moveSpeed > circle2.attr('r') && circle2.attr('cy') + yAnalog2 * moveSpeed < paper.height - circle2.attr('r')) {
            circle2.attr('cy', circle2.attr('cy') + yAnalog2 * moveSpeed);
        } else if (circle2.attr('cy') + yAnalog2 * moveSpeed < circle2.attr('r')) {
            circle2.attr('cy', circle2.attr('r'));
        } else {
            circle2.attr('cy', paper.height - circle2.attr('r'));
        }
    }*/
}

window.addEventListener('gamepadconnected', (event) => {
    let indexGamepad = 0;
    $('#GamepadValues').children().remove()

    for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        for (const [indexAxes, axis] of gamepad.axes.entries()) {
            $('#GamepadValues').append('<progress id=' + indexGamepad + "-" + standartLayout[indexAxes] + ' value=' + (axis * 0.5 + 0.5) + '></progress>');
        }
        for (const [indexAxes, axis] of gamepad.axes.entries()) {
            $('#GamepadValues').append('<progress id=' + (indexGamepad + 1) + "-" + standartLayout[indexAxes] + ' value=0.5' + '></progress>');
        }
        indexGamepad++;
    }
    onGamepadUpdate(event);
});

function onGamepadUpdate(event) {
    let indexGamepad = 0;
    toSend = {};
    for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        for (const [indexAxes, axis] of gamepad.axes.entries()) {
            $('#' + indexGamepad + "-" + standartLayout[indexAxes]).val(axis * 0.5 + 0.5);
            Object.assign(toSend, { [(indexGamepad + 1) + "-" + standartLayout[indexAxes]]: axis * 0.5 + 0.5 });
        }
        indexGamepad++;
    }
    if (activedc?.readyState == "open" || false) {
        sendMessage(JSON.stringify(toSend));
    };
    PlayerControll(event)
    requestAnimationFrame(onGamepadUpdate);
};

function msgToLog(user, message) {
    let parsedData = JSON.parse(message);
    let indexGamepad = 0;
    for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        for (const [indexAxes, axis] of gamepad.axes.entries()) {
            $('#' + (indexGamepad + 1) + "-" + standartLayout[indexAxes]).val(parsedData[(indexGamepad + 1) + "-" + standartLayout[indexAxes]]);
            //console.log($('#' + (indexGamepad + 1) + "-" + standartLayout[indexAxes]));

            //console.log(parsedData[(indexGamepad + 1) + "-" + standartLayout[indexAxes]]);
        }
        indexGamepad++;
    }
    //console.log('[' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + '][' + user + ']#: ' + message);
}