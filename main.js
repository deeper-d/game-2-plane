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
        // 飞机相关：
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
        'game-over': 'img/game-over.png',
        'game-start': 'img/get-ready.png',
        // 动画相关：
        // 走路
        'w1': 'img/walking/walk1.png',
        'w2': 'img/walking/walk2.png',
        'w3': 'img/walking/walk3.png',
        // 多状态动画
        // 闲置
        idle1: 'img/idle/rest1.png',
        idle2: 'img/idle/rest2.png',
        idle3: 'img/idle/rest3.png',
        idle4: 'img/idle/rest4.png',
        idle5: 'img/idle/rest5.png',
        idle6: 'img/idle/rest6.png',
        idle7: 'img/idle/rest7.png',
        // 跑动
        run1: 'img/run/run1.png',
        run2: 'img/run/run2.png',
        run3: 'img/run/run3.png',
        run4: 'img/run/run4.png',
        run5: 'img/run/run5.png',
        run6: 'img/run/run6.png',
        run7: 'img/run/run7.png',
        run8: 'img/run/run8.png',
    }

    var game = Guagame.instance(20, images, (g) => {
        var scene = new WalkTitle(g)
        // var scene = new AnimationTitle(g)
        // var scene = SceneTitle.new(g)
        // var scene = Scene.new(g)
        g.runWithScene(scene)
    })

    enableDebugMode(true)

}

__mian()