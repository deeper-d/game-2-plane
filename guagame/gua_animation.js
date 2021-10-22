class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，这里硬编码 hard code一套动画
        this.animations = {
            idle: [],
            run: [],
        }

        for (let index = 1; index < 11; index++) {
            var name = `run${index}`;
            var t = game.textureByName(name);
            this.animations['run'].push(t)
        }
        for (let index = 1; index < 5; index++) {
            var name = `idle${index}`;
            var t = game.textureByName(name);
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        this.flipX = false
    }

    static new(game) {
        var instance = new this(game)
        return instance
    }

    frames() {
        return this.animations[this.animationName]
    }

    draw() {
        var context = this.game.context
        console.log('context', this.game, context)

        if (this.flipX) {
            var x = this.x + this.w / 2
            context.save()
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)

            context.drawImage(this.texture, this.x, this.y)
            context.restore()

        } else {
            context.drawImage(this.texture, this.x, this.y)

        }
    }

    update() {
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    move(x, keyStatus, key) {
        console.log('--------------keyStatus ---- key', keyStatus, key, this.game.keydowns)
        if (keyStatus === 'down') {
            this.x += x
        }
        let keydowns = this.game.keydowns
        // todo:不知道为啥这里有个bug, 只判断一个是不起作用的，要两个都判断
        if (keydowns['a'] === 'down' || keydowns['d'] === 'down') {
            this.flipX = keydowns['a'] === 'down'
            this.changeAnimation('run')
        
        } else if (!keydowns['a'] && !keydowns['d']) {
            this.changeAnimation('idle')
        } 
        
        // if (keyStatus === 'down') {
        //     console.log(111111111)
        //     this.changeAnimation('run')

        // } else if (keyStatus === 'up') {
        //     console.log(222222222)
        //     this.changeAnimation('idle')
        // }
       
    }

    changeAnimation(name) {
        this.animationName = name

    }
}