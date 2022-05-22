class WalkAnimation {
    constructor(game) {
        this.game = game
        // 为了省事， 在这里硬编码一套动画
        this.frames = []
        for (let i = 1; i <= 3; i++) {
            var name = `w${i}`
            var t = game.textureByName(name)

            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 9

    }

    static new(game) {
        return new this(game)
    }

    update() {
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 6
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }

    }

    draw() {
        this.game.drawImage(this)

    }

    move(x) {
        this.x += x
    }
}

class MultipleAnimation {
    constructor(game) {
        this.game = game
        // 为了省事， 在这里硬编码一套动画
        this.animations = {
            idle: [],
            run: []
        }
        for (let i = 1; i <= 7; i++) {
            var name = `idle${i}`
            var t = game.textureByName(name)
            this.animations.idle.push(t)
        }
        for (let i = 1; i <= 8; i++) {
            var name = `run${i}`
            var t = game.textureByName(name)
            this.animations.run.push(t)
        }

        // current animation state
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        this.flipX = false

    }

    static new(game) {
        return new this(game)
    }

    frames() {
        return this.animations[this.animationName]
    }

    update() {
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }

    }

    draw() {
        var context = this.game.context

        if (this.flipX) {
            // flip x
            this.flip(context)
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
        

    }

    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        var animationNames = {
            down: 'run',
            up: 'idle'
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
    }

    changeAnimation(name) {
        this.animationName = name
    }

    flip(context) {
        var x = this.x + this.w / 2
        context.save()
        context.translate(x, 0)
        context.scale(-1, 1)
        context.translate(-x, 0)

        context.drawImage(this.texture, this.x, this.y)
        context.restore()
    }
}

class WalkTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'Game Plane: press k to start')
        this.addElement(label)

        var start = GuaImage.new(game, 'game-start')
        start.x = 100
        start.y = 120
        this.addElement(start)


        // walk 的动画效果
        // var w = WalkAnimation.new(game)
        // w.x = 100
        // w.y = 200
        // this.w = w
        // this.addElement(w)

        // multiple animation
        var a = MultipleAnimation.new(game)
        a.x = 100
        a.y = 200
        this.w = a
        this.addElement(a)

        this.setupInputs()

    }

    setupInputs() {
        let self = this
        this.game.registerAction('a', (keyStatus) => {
            self.w.move( -2, keyStatus)
        })
        this.game.registerAction('d', (keyStatus) => {
            self.w.move(2, keyStatus)
        })

        this.game.registerAction('k', function () {
            var s = Scene.new(self.game)
            self.game.replaceScene(s)
        })

    }
}