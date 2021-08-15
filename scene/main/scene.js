
class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()

    }

    setup() {
        var g = this.game
        this.bg = GuaImage.new(g, 'sky')
        this.cloud = GuaImage.new(g, 'cloud1')
        this.player = GuaImage.new(g, 'plane') 
        this.player.x = 200
        this.player.y = 500

        // 在父类 GuaImage 里draw 
        this.elements = []
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)

        // this.game.registerAction()


    }

    update() {
        this.cloud.y += 1
    }

}


// var Scene = function(game) {
//     var s = {
//         game: game
//     }

//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//     var score = 0
//     blocks = loadLevel(1)

//     // register actions
//     game.registerAction('a', function () {
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function () {
//         paddle.moveRight()
//     })
//     game.registerAction('f', function () {
//         ball.fire()
//     })


//     s.draw = function() {

//         game.drawImage(paddle)
//         game.drawImage(ball)
        
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)   
//             }  
//         }

//         // draw lable 
//         game.context.fillText('HELLO GAU', 10, 280)
//         // draw 背景
//         game.context.fillStyle = "#553"
//     }
//     s.update = function() {
//         if (paused) {
//             return
//         }

//         ball.move()

//         // 判断游戏结束
//         if (ball.y > 300) {
//             // 跳转到游戏结束的场景 
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }

//         // 判断相撞
//         if (paddle.collide(ball)) {
//             ball.反弹()
//         }
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 block.kill()
//                 ball.反弹()
//             }
//         }

//     }

//      // mouse event 
//      document.addEventListener("mousedown", function(e) {
//         var x = e.offsetX
//         var y = e.offsetY
//         console.log('x y', x, y, ball.w)
//         // 检查是否点中了小球
//         if (ball.hasPoint(x, y)) {
//             // 点中 设置 拖拽状态
//             enableDrag = true
//         }
//     })
//     document.addEventListener("mousemove", function(e) {
//         var x = e.offsetX
//         var y = e.offsetY
//         // 检查是否点中了小球
//         if (enableDrag) {
//             // 点中 设置 拖拽状态
//             ball.x = x
//             ball.y = y
//         }
//     })
//     document.addEventListener("mouseup", function(e) {
//         enableDrag = false
//     })

//     return s
// }