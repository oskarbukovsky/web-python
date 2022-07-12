// Creates canvas 320 × 200 at 10, 50
paper = window.Raphael(210, 210, 640, 480)

// Creates circle at x = 50, y = 40, with radius 10
circle = paper.circle(50, 40, 10)

// Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", "#0f0")

// Sets the stroke attribute of the circle to white
circle.attr("stroke", "#fff")

standartLayout = ["xAnalog1", "yAnalog1", "xAnalog2", "yAnalog2"]

let moveSpeed = 10

let bulletSpeed = 0.5

let deathZone = 0.05

function PlayerControll(event) {
    // X analog 1 axis
    xAnalog1 = $("#xAnalog1").val() - 0.5;
    if (Math.abs(xAnalog1) > deathZone) {
        if (circle.attr('cx') + xAnalog1 * moveSpeed > circle.attr('r') && circle.attr('cx') + xAnalog1 * moveSpeed < paper.width - circle.attr('r')) {
            circle.attr('cx', circle.attr('cx') + xAnalog1 * moveSpeed);
        }
    }

    // Y analog 1 axis
    yAnalog1 = $("#yAnalog1").val() - 0.5;
    if (Math.abs(yAnalog1) > deathZone) {
        if (circle.attr('cy') + yAnalog1 * moveSpeed > circle.attr('r') && circle.attr('cy') + yAnalog1 * moveSpeed < paper.height - circle.attr('r')) {
            circle.attr('cy', circle.attr('cy') + yAnalog1 * moveSpeed);
        }
    }

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
    }
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