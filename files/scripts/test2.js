document.addEventListener("DOMContentLoaded", function (event) {

    // Creates canvas 320 × 200 at 10, 50
    /*paper = window.Raphael(210, 210, 640, 480);

    // Creates circle at x = 50, y = 40, with radius 10
    circle = paper.circle(50, 40, 10);

    // Sets the fill attribute of the circle to red (#f00)
    circle.attr("fill", "#0f0");

    // Sets the stroke attribute of the circle to white
    circle.attr("stroke", "#fff");

    image = paper.image("http://svg.dabbles.info/tux.png", 10, 10, 300, 300)
        .attr({ "clip-rect": "20,40,300,300" });
    */


    var canvas = this.__canvas = new fabric.Canvas('c');
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    fabric.Object.prototype.transparentCorners = false;


    let titleIndex = 1;

    (function title() {
        setTimeout(function () {
            let source = ['files/img/gui/title1.png', 'files/img/gui/title2.png'];
            canvas.setBackgroundImage(source[titleIndex % 2], canvas.renderAll.bind(canvas), {
                originX: 'left',
                originY: 'top'
            });
            titleIndex++;
            title();
        }, 100);
    })();



    (function render() {
        canvas.renderAll();
        fabric.util.requestAnimFrame(render);
    })();


    /*(function () {
        var canvas = this.__canvas = new fabric.Canvas('c');
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
        fabric.Object.prototype.transparentCorners = false;

        fabric.Sprite.fromURL('files/img/player/costume_203_humblingbundle.png', createSprite());

        function createSprite(i, j) {
            return function (sprite) {
                sprite.set({
                    left: 100,
                    top: 100,
                });
                canvas.add(sprite);
                setTimeout(function () {
                    sprite.set('dirty', true);
                    sprite.play();
                }, fabric.util.getRandomInt(1, 10) * 100);
            };
        }

        (function render() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(render);
        })();
    })();*/



    standartLayout = ["xAnalog1", "yAnalog1", "xAnalog2", "yAnalog2"];

    let moveSpeed = 10;

    let bulletSpeed = 0.5;

    let deathZone = 0.05;

    class Player {
        #private = 2;
        constructor() {
            this.damage = 3.5;
            this.tears = 1;
            this.range = 6.5;
            this.speed = 1;
            this.luck = 0;
            let tmp = 1;

            let _shotSpeed = 1;
            this.shotSpeed = (shotSpeed) => {
                if (typeof shotSpeed == "undefined") {
                    return _shotSpeed;
                }
                if (shotSpeed >= 0.6) {
                    _shotSpeed = shotSpeed;
                } else {
                    _shotSpeed = 0.6;
                }
            }

            this.tearDelay = () => {
                if (this.tears >= 0) {
                    console.log(1)
                    return (16 - 6 * Math.sqrt(this.tears * 1.3 + 1));
                } else if (this.tears < 0 && this.tears > -0.77) {
                    console.log(2)
                    return (16 - 6 * Math.sqrt(this.tears * 1.3 + 1) - 6 * this.tears);
                } else {
                    console.log(3)
                    return (16 - 6 * this.tears);
                }
            };

            //Shoots per second
            this.fireRate = () => {
                return (30 / (this.tearDelay() + 1));
            };

        }
    }

    class floorGenerator {
        // 1x1 > 13x7 (15x9)
        // 2x2 > 26x14 (28x16)
        // 1x2 > 26x3 (28x5)
        // 1x2 > 26x7 (28x9)
        constructor(floorDepth) {
            this.numberOfRooms = Math.ceil(3.33 * floorDepth + getRandomIntInclusive(5, 6));
            this.map = [9][7];

        }
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
        //f(1,2) -> 1 or 2
    }


    class tmpGen {
        constructor() {
            function* anotherGenerator(i) {
                yield i + 1;
                yield i + 2;
                yield i + 3;
            }

            function* generator(i) {
                yield i;
                yield* anotherGenerator(i);
                yield i + 10;
            }

            const gen = generator(10);

            console.log(gen.next().value); // 10
            console.log(gen.next().value); // 11
            console.log(gen.next().value); // 12
            console.log(gen.next().value); // 13
            console.log(gen.next().value); // 20
        }
    }

    function* PseudoRandomGenerator(seed) {
        function cyrb128(str) {
            let h1 = 1779033703, h2 = 3144134277,
                h3 = 1013904242, h4 = 2773480762;
            for (let i = 0, k; i < str.length; i++) {
                k = str.charCodeAt(i);
                h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
                h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
                h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
                h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
            }
            h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
            h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
            h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
            h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
            return (h1 ^ h2 ^ h3 ^ h4);
        }
        function mulberry32(a) {
            return function () {
                var t = a += 0x6D2B79F5;
                t = Math.imul(t ^ t >>> 15, t | 1);
                t ^= t + Math.imul(t ^ t >>> 7, t | 61);
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            }
        }
        var rand = mulberry32(cyrb128(seed));
        while (true) {
            yield rand();
        }
    }
    //gen = PseudoRandomGenerator("apples1")
    //gen.next().value

    class Cat {
        constructor(name) {
            this.name = name;
        }

        speak() {
            console.log(`${this.name} makes a noise.`);
        }
    }

    class Lion extends Cat {
        speak() {
            super.speak();
            console.log(`${this.name} roars.`);
        }
    }

    const l = new Lion('Fuzzy');
    //l.speak();
    // Fuzzy makes a noise.
    // Fuzzy roars.

    function PlayerControll(event) {
        // X analog 1 axis
        xAnalog1 = $("#xAnalog1").val() - 0.5;
        if (Math.abs(xAnalog1) > deathZone) {
            //if (circle.attr('cx') + xAnalog1 * moveSpeed > circle.attr('r') && circle.attr('cx') + xAnalog1 * moveSpeed < paper.width - circle.attr('r')) {
            //    circle.attr('cx', circle.attr('cx') + xAnalog1 * moveSpeed);
            //}
        }

        // Y analog 1 axis
        yAnalog1 = $("#yAnalog1").val() - 0.5;
        if (Math.abs(yAnalog1) > deathZone) {
            //if (circle.attr('cy') + yAnalog1 * moveSpeed > circle.attr('r') && circle.attr('cy') + yAnalog1 * moveSpeed < paper.height - circle.attr('r')) {
            //    circle.attr('cy', circle.attr('cy') + yAnalog1 * moveSpeed);
            //}
        }


        /*
        // X analog 2 axis
        xAnalog2 = $("#xAnalog2").val() - 0.5;
        if (Math.abs(xAnalog2) > deathZone * 4) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cx': circle.attr('cx') + xAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }
     
        // Y analog 2 axis
        yAnalog2 = $("#yAnalog2").val() - 0.5;
        if (Math.abs(yAnalog2) > deathZone * 4) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cy': circle.attr('cy') + yAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }
     
        // A button
        if (event.buttons[0].pressed) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cy': circle.attr('cy') + yAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }
        // B button
        if (event.buttons[1].pressed) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cy': circle.attr('cy') + yAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }
        // X button
        if (event.buttons[2].pressed) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cx': circle.attr('cx') + yAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }
        // Y button
        if (event.buttons[3].pressed) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cx': circle.attr('cx') + yAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }
        // L1 button
        if (event.buttons[4].pressed) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cy': circle.attr('cy') + yAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }
        // R1 button
        if (event.buttons[5].pressed) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cy': circle.attr('cy') + yAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }
        // L2 button
        if (event.buttons[6].pressed) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cy': circle.attr('cy') + yAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }
        // R2 button
        if (event.buttons[7].pressed) {
            bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
            bullet.animate({
                'cy': circle.attr('cy') + yAnalog2 *
                    100000
            }, 100000 / bulletSpeed, 'linear');
        }*/
    }

    window.addEventListener('gamepadconnected', (event) => {
        for (const gamepad of navigator.getGamepads()) {
            if (!gamepad) continue;
            for (const [index, axis] of gamepad.axes.entries()) {
                $('#GamepadValues').append('<progress id=' + standartLayout[index] + ' value=' + (axis * 0.5 + 0.5) + '></progress>');
            }
            onGamepadUpdate(event);
            break;
        }
    });

    function onGamepadUpdate(event) {
        for (const gamepad of navigator.getGamepads()) {
            if (!gamepad) continue;
            for (const [index, axis] of gamepad.axes.entries()) {
                $('#' + standartLayout[index]).val(axis * 0.5 + 0.5);
            }
            PlayerControll(gamepad)
            requestAnimationFrame(onGamepadUpdate);
            break;
        }
    };

});









fabric.Sprite = fabric.util.createClass(fabric.Image, {

    type: 'sprite',

    spriteWidth: 50,
    spriteHeight: 72,
    spriteIndex: 0,
    frameTime: 100,

    initialize: function (element, options) {
        options || (options = {});

        options.width = this.spriteWidth;
        options.height = this.spriteHeight;

        this.callSuper('initialize', element, options);

        this.createTmpCanvas();
        this.createSpriteImages();
    },

    createTmpCanvas: function () {
        this.tmpCanvasEl = fabric.util.createCanvasElement();
        this.tmpCanvasEl.width = this.spriteWidth || this.width;
        this.tmpCanvasEl.height = this.spriteHeight || this.height;
    },

    createSpriteImages: function () {
        this.spriteImages = [];

        var steps = this._element.width / this.spriteWidth;
        for (var i = 0; i < steps; i++) {
            this.createSpriteImage(i);
        }
    },

    createSpriteImage: function (i) {
        var tmpCtx = this.tmpCanvasEl.getContext('2d');
        tmpCtx.clearRect(0, 0, this.tmpCanvasEl.width, this.tmpCanvasEl.height);
        tmpCtx.drawImage(this._element, -i * this.spriteWidth, 0);

        var dataURL = this.tmpCanvasEl.toDataURL('image/png');
        var tmpImg = fabric.util.createImage();

        tmpImg.src = dataURL;

        this.spriteImages.push(tmpImg);
    },

    _render: function (ctx) {
        ctx.drawImage(
            this.spriteImages[this.spriteIndex],
            -this.width / 2,
            -this.height / 2
        );
    },

    play: function () {
        var _this = this;
        this.animInterval = setInterval(function () {

            _this.onPlay && _this.onPlay();
            _this.dirty = true;
            _this.spriteIndex++;
            if (_this.spriteIndex === _this.spriteImages.length) {
                _this.spriteIndex = 0;
            }
        }, this.frameTime);
    },

    stop: function () {
        clearInterval(this.animInterval);
    }
});

fabric.Sprite.fromURL = function (url, callback, imgOptions) {
    fabric.util.loadImage(url, function (img) {
        callback(new fabric.Sprite(img, imgOptions));
    });
};

fabric.Sprite.async = true;