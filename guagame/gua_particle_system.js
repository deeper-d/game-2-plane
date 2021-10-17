
class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game) {
        return new this(game)
    }

    setup() {
        this.duration = 16
        this.x = 150
        this.y = 200
        this.numberOfParticles = 40
        this.particles = []
    }

    update() {
        this.duration--
        if (this.duration < 0) {

        }
        // 添加小火花
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
        // 更新所有小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)

    }

    draw() {
        if (this.duration < 0) { 
            // todo: 这是一个临时的方案，模拟删除。
            // 应该从元素中删除
            return;
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}

class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }

    setup() {
        this.life = 10
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}