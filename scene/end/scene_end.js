class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()

        var label = GuaLable.new(game, 'Game Over: 按 r 重回标题页')
        this.addElement(label)
        var end = GuaImage.new(game, 'game-over')
        end.x = 100
        end.y = 120
        this.addElement(end)
    }

    static new(game) {
        return new this(game)
    }

    setup() {
        let self = this
        this.game.registerAction('r', function () {
            var s = WalkTitle.new(self.game)
            self.game.replaceScene(s)
        })
    }

    // draw() {
    //     this.game.context.fillText('Game Over: 按 r 重回标题页', 100, 180)
    // }
}