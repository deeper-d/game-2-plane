const randomBetween = (start, end) => {
    var n  = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

// 单例（全局变量）
const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 5,
    cooldown: 5,
}


class Cloud extends GuaImage {
    constructor(game) {
        var type = randomBetween(1, 5)
        var name = 'cloud' + type
        super(game, name)
        this.setup()
    }

    setup() {
        this.x = randomBetween(-100, 200)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.speed = config.cloud_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }

}

// 3 Bullet
class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
    }

    update() {
        // 动态调整速度
        this.speed = config.bullet_speed
        this.y -= this.speed

        // this.hitEnemy()

    }

    hitEnemy() {
        let enemies = this.scene.enemies
        console.log('enemies', enemies)
        // for (let e of enemies) {
        //     if (this.y === e.y) {
        //         console.log('击中敌人 hit: ', e)
        //         // add particles
        //         // var ps = GuaParticleSystem.new(this.game)
        //         // this.scene.addElement(ps)
        //         // e.life--
        //     }
        // }
    }
}

// 2 Enemy
class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'enemy' + type
        super(game, name)
        this.setup(type)

    }

    setup(type) {
        this.life = 1
        this.speed = randomBetween(2, 4)
        this.x = randomBetween(0, 300)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}

// 1 Player
class Player extends GuaImage {
    constructor(game) {
        super(game, 'plane')
        this.setup()
    }

    setup() {
        this.speed = 10
        this.cooldown = 0
    }

    update() {
        // 子弹冷却时间
        if (this.cooldown > 0) {
            this.cooldown--
        }
        // 动态调整速度
        this.speed = config.player_speed

    }

    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.cooldown
            var b = Bullet.new(this.game)
            b.x = this.x + 15
            b.y = this.y
            this.scene.addElement(b)
        }
    }

    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}


class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // 初始化 主场景
        this.setup()
        // 初始化操作事件
        this.setupInputs()
    }

    setup() {
        var game = this.game
        this.bg = GuaImage.new(game, 'sky')
        this.player = Player.new(game)
        this.player.x = 200
        this.player.y = 500
        this.numOfEnemies = 5

        // 把元素添加进主场景，在主场景里自动draw所有，
        // 在 GuaGame 里统一 draw ,调用 scene.draw()
        this.elements = []
        this.addElement(this.bg)
        this.addElement(this.player)
        // 添加云
        this.addClouds()
        // 添加敌人
        this.addEnemies()

        // // add particles
        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)

    }

    addClouds() {
        var es = []
        for (let i = 0; i < 2; i++) {
            var e = Cloud.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    addEnemies() {
        var es = []
        for (let i = 0; i < this.numOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game;   
        var s = this;
        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('d', function () {
            s.player.moveRight()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })
        g.registerAction('z', function () {
            s.player.moveDown()
        })
        g.registerAction('j', function () {
            s.player.fire()
        })
    }

    update() {
        super.update()

         // 删除死掉的敌人
        //  this.enemies = this.enemies.filter(e => e.life > 0)
    }

}