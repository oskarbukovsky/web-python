document.addEventListener("DOMContentLoaded", function (event) {
    var stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(
        stats.dom)
    stats.dom.style.top = "calc(100vh - 48px)"
    requestAnimationFrame(function loop() {
        stats.update()
        requestAnimationFrame(loop)
    })

    var stats1 = new Stats()
    stats1.showPanel(1)
    document.body.appendChild(
        stats1.dom)
    stats1.dom.style.top = "calc(100vh - 48px)"
    stats1.dom.style.left = "80px"
    requestAnimationFrame(function loop1() {
        stats1.update()
        requestAnimationFrame(loop1)
    })

    var stats2 = new Stats()
    stats2.showPanel(2)
    document.body.appendChild(
        stats2.dom)
    stats2.dom.style.top = "calc(100vh - 48px)"
    stats2.dom.style.left = "160px"
    requestAnimationFrame(function loop2() {
        stats2.update()
        requestAnimationFrame(loop2)
    })
});