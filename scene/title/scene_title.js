class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        game.registerAction('k', function () {
            var s = Scene.new(game)
            console.log('game s', s)
            game.replaceScene(s)
        })
    }
    
    draw() {
        this.game.context.fillText('开始游戏 按 k 开始', 100, 180)
    }
}



// var SceneTitle = function(game) {
//     var s = {
//         game: game
//     }

//     game.registerAction('k', function () {
//         var s = Scene(game)
//         game.replaceScene(s)
//     })

//     s.draw = function() {
//         // draw lable 
//         game.context.fillText('开始游戏 按 k 开始', 100, 180)
      
//     }
//     return s
// }