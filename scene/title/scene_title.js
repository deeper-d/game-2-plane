class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.setup(game);

        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 100
        this.w = w
        this.addElement(w)

    }

    setup(game) {
        var self = this
        var lable = GuaLable.new(game, 'hello this is gua game')
        this.addElement(lable)

        // game.registerAction('k', function () {
        //     var s = Scene.new(game)
        //     game.replaceScene(s)
        // })

        game.registerAction('a', function (keyStatus) {
            console.log('click a =======', keyStatus)
            self.w.move(-3, keyStatus, 'a')
        })
        game.registerAction('d', function (keyStatus) {
            console.log('click d =======', keyStatus)
            self.w.move(3, keyStatus, 'd')
        })
    }
    
    draw() {
        super.draw()
        // this.game.context.fillText('开始游戏 按 k 开始', 100, 180)
    }
}
