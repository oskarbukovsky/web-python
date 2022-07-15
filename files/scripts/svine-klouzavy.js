; (function (Raphael) {
    /// Plugin - replaces original RaphaelJS .image constructor
    /// with one that respects original dimensions.
    /// Optional overrides for each dimension.
    /// @drzaus @zaus
    /// based on http://stackoverflow.com/questions/10802702/raphael-js-image-with-its-original-width-and-height-size

    var originalRaphaelImageFn = Raphael.fn.image;
    /**
     * Overload - replace Raphael .image function with one that respects original dimensions
     * @param  {string} url the image path
     * @param  {number} x   position-x
     * @param  {number} y   position-y
     * @param  {number} w   dimensions-width
     * @param  {number} h   dimensions-height
     * @return {Paper.Element}     new raphael element
     */
    Raphael.fn.image = function (url, x, y, w, h) {
        // fix the image dimensions to match original scale unless otherwise provided
        if (!w || !h) {
            var img = new Image();
            img.src = url;
            if (!w) w = img.width;
            if (!h) h = img.height;
        }
        return originalRaphaelImageFn.call(this, url, x, y, w, h);
    };
    Raphael.st.setID = function (id) {
        this.id = id;
    }
})(Raphael);


// Creates canvas 320 × 200 at 10, 50
paper = window.Raphael(210, 210, 640, 480);


// Creates circle at x = 50, y = 40, with radius 10
//circle1 = paper.circle(40, 240, 10);
//circle1.attr("fill", "#0f0");
//circle1.attr("stroke", "#fff");

circle2 = paper.circle(600, 240, 10);
circle2.attr("fill", "#0f0");
circle2.attr("stroke", "#fff");

circle1 = paper.image('files/img/blue-pusher.png', 40, 240, 80, 80);

standartLayout = ["xAnalog1", "yAnalog1", "xAnalog2", "yAnalog2"];
let toSend = {};

let moveSpeed = 11

let deathZone = 0.05;

function PlayerControll(event) {

    //TODO:
    //do second if to determine which site |<---->|

    //Local gamepad
    // X analog 1 axis
    xAnalog1 = $("#0-xAnalog1").val() - 0.5;
    if (Math.abs(xAnalog1) > deathZone) {
        if (circle1.attr('x') + xAnalog1 * moveSpeed > circle1.attr('r') && circle1.attr('x') + xAnalog1 * moveSpeed < (paper.width / 2) - circle1.attr('r')) {
            circle1.attr('x', circle1.attr('x') + xAnalog1 * moveSpeed);
        } else if (circle1.attr('cx') + xAnalog1 * moveSpeed < circle1.attr('r')) {
            circle1.attr('x', circle1.attr('r'));
        } else {
            circle1.attr('x', (paper.width / 2) - circle1.attr('r'));
        }
    }

    // Y analog 1 axis
    yAnalog1 = $("#0-yAnalog1").val() - 0.5;
    if (Math.abs(yAnalog1) > deathZone) {
        if (circle1.attr('y') + yAnalog1 * moveSpeed > circle1.attr('r') && circle1.attr('y') + yAnalog1 * moveSpeed < paper.height - circle1.attr('r')) {
            circle1.attr('y', circle1.attr('y') + yAnalog1 * moveSpeed);
        } else if (circle1.attr('y') + yAnalog1 * moveSpeed < circle1.attr('r')) {
            circle1.attr('y', circle1.attr('r'));
        } else {
            circle1.attr('y', paper.height - circle1.attr('r'));
        }
    }

    // X analog 2 axis
    xAnalog2 = $("#0-xAnalog2").val() - 0.5;
    if (Math.abs(xAnalog2) > deathZone) {
        if (circle1.attr('x') + xAnalog2 * moveSpeed > circle1.attr('r') && circle1.attr('x') + xAnalog2 * moveSpeed < (paper.width / 2) - circle1.attr('r')) {
            circle1.attr('x', circle1.attr('x') + xAnalog2 * moveSpeed);
        } else if (circle1.attr('x') + xAnalog2 * moveSpeed < circle1.attr('r')) {
            circle1.attr('x', circle1.attr('r'));
        } else {
            circle1.attr('x', (paper.width / 2) - circle1.attr('r'));
        }
    }

    // Y analog 2 axis
    yAnalog2 = $("#0-yAnalog2").val() - 0.5;
    if (Math.abs(yAnalog2) > deathZone) {
        if (circle1.attr('y') + yAnalog2 * moveSpeed > circle1.attr('r') && circle1.attr('y') + yAnalog2 * moveSpeed < paper.height - circle1.attr('r')) {
            circle1.attr('y', circle1.attr('y') + yAnalog2 * moveSpeed);
        } else if (circle1.attr('y') + yAnalog2 * moveSpeed < circle1.attr('r')) {
            circle1.attr('y', circle1.attr('r'));
        } else {
            circle1.attr('y', paper.height - circle1.attr('r'));
        }
    }



    //Remote gamepad

    /*
    // X analog 1 axis
    xAnalog1 = $("#1-xAnalog1").val() - 0.5;
    if (Math.abs(xAnalog1) > deathZone) {
        if (circle2.attr('cx') - xAnalog1 * moveSpeed > circle2.attr('r') + (paper.width / 2) && circle2.attr('cx') - xAnalog1 * moveSpeed < paper.width - circle2.attr('r')) {
            circle2.attr('cx', circle2.attr('cx') - xAnalog1 * moveSpeed);
        } else if (circle2.attr('cx') - xAnalog1 * moveSpeed < circle2.attr('r') + (paper.width / 2)) {
            circle2.attr('cx', (paper.width / 2) + circle2.attr('r'));
        } else {
            circle2.attr('cx', paper.width - circle2.attr('r'));
        }
    }

    // Y analog 1 axis
    yAnalog1 = $("#1-yAnalog1").val() - 0.5;
    if (Math.abs(yAnalog1) > deathZone) {
        if (circle2.attr('cy') + yAnalog1 * moveSpeed > circle2.attr('r') && circle2.attr('cy') + yAnalog1 * moveSpeed < paper.height - circle2.attr('r')) {
            circle2.attr('cy', circle2.attr('cy') + yAnalog1 * moveSpeed);
        } else if (circle2.attr('cy') + yAnalog1 * moveSpeed < circle2.attr('r')) {
            circle2.attr('cy', circle2.attr('r'));
        } else {
            circle2.attr('cy', paper.height - circle2.attr('r'));
        }
    }

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
        Object.assign(toSend, { "cx": circle1.attr('cx') });
        Object.assign(toSend, { "cy": circle1.attr('cy') });
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
            circle2.attr('cx', paper.width - parsedData.cx);
            circle2.attr('cy', parsedData.cy);
            $('#' + (indexGamepad + 1) + "-" + standartLayout[indexAxes]).val(parsedData[(indexGamepad + 1) + "-" + standartLayout[indexAxes]]);
            //console.log($('#' + (indexGamepad + 1) + "-" + standartLayout[indexAxes]));

            //console.log(parsedData[(indexGamepad + 1) + "-" + standartLayout[indexAxes]]);
        }
        indexGamepad++;
    }
    //console.log('[' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + '][' + user + ']#: ' + message);
}