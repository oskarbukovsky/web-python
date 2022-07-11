from browser import document, html, window
from browser.timer import request_animation_frame

# document <= html.B("Hello !")
# document <= html.B("Hello, ") + "world !"
# document <= html.B(html.I("Hello !"))
# document <= html.UL(html.LI(i) for i in range(5))
# document <= html.A("Brython", href="http://brython.info")

# Creates canvas 320 × 200 at 10, 50
global paper
paper = window.Raphael(210, 210, 640, 480)

# Creates circle at x = 50, y = 40, with radius 10
circle = paper.circle(50, 40, 10)

# Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", "#0f0")

# Sets the stroke attribute of the circle to white
circle.attr("stroke", "#fff")

standartLayout = ["xAnalog1", "yAnalox1", "xAnalog2", "yAnalog2"]

global speedModifier
moveSpeed = 10

global bulletSpeed
bulletSpeed = 0.5

global deathZone
deathZone = 0.05


def PlayerControll():
    # X analog 1 axis
    xAnalog1 = document.getElementById('xAnalog1').value-0.5
    if (abs(xAnalog1) > deathZone):
        if (circle.attr('cx') + xAnalog1 * moveSpeed > circle.attr('r') and circle.attr('cx') + xAnalog1 * moveSpeed < paper.width-circle.attr('r')):
            circle.attr('cx', circle.attr('cx') + xAnalog1 * moveSpeed)
            # circle.translate(xAnalog1*moveSpeed, 0)

    # Y analog 1 axis
    yAnalog1 = document.getElementById('yAnalox1').value-0.5
    if (abs(yAnalog1) > deathZone):
        if (circle.attr('cy') + yAnalog1 * moveSpeed > circle.attr('r') and circle.attr('cy') + yAnalog1 * moveSpeed < paper.height-circle.attr('r')):
            circle.attr('cy', circle.attr('cy') + yAnalog1 * moveSpeed)
            # circle.translate(0, yAnalog1*moveSpeed)

    # X analog 2 axis
    xAnalog2 = document.getElementById('xAnalog2').value-0.5
    if (abs(xAnalog2) > deathZone*4):
        bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
        bullet.attr("fill", "#0f0")
        bullet.attr("stroke", "#fff")
        # bullet.attr('cx', circle.attr('cx') + xAnalog2 * moveSpeed)

        bullet.animate({'cx': circle.attr('cx') + xAnalog2 *
                       100000}, 100000/bulletSpeed, 'linear')

    # Y analog 2 axis
    yAnalog2 = document.getElementById('yAnalog2').value-0.5
    if (abs(yAnalog2) > deathZone*4):
        bullet = paper.circle(circle.attr('cx'), circle.attr('cy'), 5)
        bullet.attr("fill", "#0f0")
        bullet.attr("stroke", "#fff")
        #bullet.attr('cy', circle.attr('cy') + yAnalog2 * moveSpeed)

        bullet.animate({'cy': circle.attr('cy') + yAnalog2 *
                       100000}, 100000/bulletSpeed, 'linear')


def onGamepadConnected(event):
    output = document.getElementById('GamepadValues')
    for gamepad in window.navigator.getGamepads():
        if not (gamepad):
            continue
        else:
            for index, axe in enumerate(gamepad.axes):
                progress = html.PROGRESS(
                    value=axe*0.5+0.5, id=standartLayout[index])
                output <= progress
    onGamepadUpdate(event)


def onGamepadUpdate(event):
    for gamepad in window.navigator.getGamepads():
        if not (gamepad):
            continue
        else:
            for index, axe in enumerate(gamepad.axes):
                document.getElementById(
                    standartLayout[index]).value = axe*0.5+0.5

    PlayerControll()
    request_animation_frame(onGamepadUpdate)


window.bind("gamepadconnected", onGamepadConnected)
