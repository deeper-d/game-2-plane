
class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }

    setup() {
        // 小火花的生命值
        this.life = 10
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life-- // 生命减少
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02 // 加速度
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game, pisition) {
        this.game = game
        this.pos = pisition
        this.setup()
    }

    static new(game, pisition) {
        return new this(game, pisition)
    }

    setup() {
        this.duration = 20
        if (this.pos) {
            this.x = this.pos.x
            this.y = this.pos.y
        } else {
            this.x = 240
            this.y = 200
        }
        this.numberOfParticles = 40
        this.particles = [] // 存储烟花
    }

    update() {
        this.duration--
        if (this.duration < 0) {
            // todo 从场景中删掉

        }
        // 1. 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            // 设置初始化坐标
            var s = 10
            var x = this.x
            var y = this.y
            var vx = randomBetween(-s, 10)
            var vy = randomBetween(-s, 10)
            p.init(x, y, vx, vy)
            this.particles.push(p)
        }
        // 2. 更新所有小火花
        for (var p of this.particles) {
            p.update()
        }
        // 3. 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)

    }

    draw() {
        if (this.duration < 0) { 
            // todo: 临时的方案, 模拟删除。
            // 其实应该从scene中删除
            return;
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}

