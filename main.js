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
        // 走路
        // 'w1': 'img/walking/w1.png',
        // 'w2': 'img/walking/w2.png',
        // 'w3': 'img/walking/w3.png',
        // 'w4': 'img/walking/w4.png',
        // 'w5': 'img/walking/w5.png',
        // 'w6': 'img/walking/w6.png',
        // 'w7': 'img/walking/w7.png',
        // 'w8': 'img/walking/w8.png',
        // 'w9': 'img/walking/w9.png',
        // 多状态动画
        // 闲置
        idle1: 'img/idle/i1.png',
        idle2: 'img/idle/i2.png',
        idle3: 'img/idle/i3.png',
        idle4: 'img/idle/i4.png',
        // 跑动
        run1: 'img/run/r1.png',
        run2: 'img/run/r2.png',
        run3: 'img/run/r3.png',
        run4: 'img/run/r4.png',
        run5: 'img/run/r5.png',
        run6: 'img/run/r6.png',
        run7: 'img/run/r7.png',
        run8: 'img/run/r8.png',
        run9: 'img/run/r9.png',
        run10: 'img/run/r10.png',
    }

    var game = Guagame.instance(20, images, (g) => {
        console.log('runcallback')
        var scene = Scene.new(g)
        // var scene = SceneTitle.new(g)
        g.runWithScene(scene)
    })

    enableDebugMode(true)

}

__mian()