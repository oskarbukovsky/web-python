from browser import document, html, window

# document <= html.B("Hello !")
# document <= html.B("Hello, ") + "world !"
# document <= html.B(html.I("Hello !"))
# document <= html.UL(html.LI(i) for i in range(5))
# document <= html.A("Brython", href="http://brython.info")

# Creates canvas 320 × 200 at 10, 50
paper = window.Raphael(210, 210, 640, 480)

# Creates circle at x = 50, y = 40, with radius 10
circle = paper.circle(50, 40, 10)

# Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", "#0f0")

# Sets the stroke attribute of the circle to white
circle.attr("stroke", "#fff")

paper.circle(320, 240, 60).animate(
    {"fill": "#223fa3", "stroke": "#0f0", "stroke-width": 80, "stroke-opacity": 0.5}, 2000)

def gamepads(event):
                output = document.getElementById('axes')
                output.innerHTML = ''
                print(window.navigator.getGamepads())
                for gamepad in window.navigator.getGamepads():
                    print(gamepad.axes.entries())

window.bind("gamepadconnected", gamepads)