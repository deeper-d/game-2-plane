class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)

        game.registerAction('r', function () {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    static new(game) {
        return new this(game)
    }
    
    draw() {
        this.game.context.fillText(' Game Over, 按 r 重回标题页', 100, 180)
    }
}