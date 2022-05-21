
class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    static new(game, text) {
        return new this(game, text)
    }

    draw() {
        this.game.context.fillText(this.text, 100, 180)
    }

    update() {}
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game

        this.setup(game);

        // method 2 : 
        var label = GuaLabel.new(game, 'Game Plane:  按 k 开始游戏')
        this.addElement(label)

        // 粒子
        var particle = GuaParticleSystem.new(game)
        this.addElement(particle)

    }

    
    // draw() {
    //     // 为什么这里要调用 super.draw()  ？？
    //     // 因为：如果这里写了draw方法，会覆盖父类的draw方法。
    //     // 如果不像父类被覆盖，要不子类不写该方法，要不调用super.draw
    //     super.draw()

    //     // method 1 :
    //     // this.game.context.fillText('game plane : 开始游戏 按 k 开始', 100, 180)
    // }


    setup(game) {
        var self = this
         game.registerAction('k', function () {
            var s = Scene.new(game)
            game.replaceScene(s)
        })
      
    }
}
