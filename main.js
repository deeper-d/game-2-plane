var blocks = []
var paused = false
var enableDrag = false
var loadLevel = function(n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

var __mian = function () {
    var enableDebugMode = function(enable) {
        if (!enable) {
            return
        }
        window.addEventListener('keydown', function(event) {
            let k = event.key
            if (k === 'p') {
                paused = !paused 
            } else if ('123456'.includes(k)) {
                console.log(k)
                blocks = loadLevel(Number(k))
            }
        })
        // 控制speed
        // document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        //     var fps = event.target.value
        //     window.fps = fps
        // })
    }

    var images = {
        'sky': 'img/sky.jpg',
        'bullet': 'img/bullet.png',
        'plane': 'img/plane.png',
        'cloud1': 'img/cloud1.png',
        'cloud2': 'img/cloud2.png',
        'cloud3': 'img/cloud3.png',
        'cloud4': 'img/cloud4.png',
        'cloud5': 'img/cloud5.png',
        'enemy0': 'img/enemy0.png',
        'enemy1': 'img/enemy1.png',
        'fire': 'img/particle.png',
    }

    var game = Guagame.instance(20, images, (g) => {
        var scene = Scene.new(g)
        // var scene = SceneTitle.new(g)
        g.runWithScene(scene)
    })

    enableDebugMode(true)

}

__mian()