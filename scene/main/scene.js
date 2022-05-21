
// 单例（全局变量）
const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 10,
    cooldown: 2,
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
    constructor(game, type) {
        super(game, 'bullet')
        this.type = type
        this.setup()
    }

    setup() {
    }

    update() {
        // 动态调整速度
        this.speed = config.bullet_speed
        this.type === 'enemy' ? this.y += this.speed : this.y -= this.speed
    }

    hitEnemy() {
        let enemies = this.scene.enemies
        for (let e of enemies) {
            if (rectIntersects(this, e) || rectIntersects(e, this)) {
                // 击中敌人
                e.killed = true
                // 爆炸 add particles
                var ps = GuaParticleSystem.new(this.game, {
                    x: e.x + e.w,
                    y: e.y
                })
                this.scene.addElement(ps)
            }
        }
    }
}

// 2 Enemy
class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'enemy' + type
        super(game, name)
        this.type = type
        this.setup(type)
    }

    setup(type) {
        this.bullets = []
        this.numOfBullets = 10
        this.cooldown = 100
        //
        this.life = 1
        this.killed = false
        this.speed = type ? randomBetween(4, 6) : randomBetween(2, 4)
        this.x = randomBetween(0, 300)
        this.y = -randomBetween(0, 200)
    }

    fire(x, y) {
        if (this.cooldown > 96 && this.cooldown < 100) {
            var b = Bullet.new(this.game, 'enemy')
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.bullets.push(b)
        }
    }

    update() {
        this.cooldown--
        if (this.cooldown === 0) {
            this.cooldown = 100
        }
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
        // 敌机开火
        if (this.type === 0) {
            this.fire(this.x, this.y)
            this.fire(this.x + this.texture.width, this.y)
        }
        // 击中玩家
        this.ifHitPlayer()
    }

    // 击中玩家
    ifHitPlayer() {
        let player = this.scene.player
        let bullets = this.bullets
        for (let b of bullets) {
            if (rectIntersects(b, player) || rectIntersects(player, b)) {
                // 爆炸 add particles
                var ps = GuaParticleSystem.new(this.game, {
                    x: player.x,
                    y: player.y
                })
                this.scene.addElement(ps)
                 // 游戏结束
                 setTimeout(() => {
                    this.scene.gameOver()
                }, 300)
            }
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
        this.bullets = []
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
        // 击中敌人
        this.ifHitEnemy()
        // 和敌人相撞
        this.ifCollideWithEnemy()
    }

    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.cooldown
            var b = Bullet.new(this.game)
            b.x = this.x + 15
            b.y = this.y
            this.scene.addElement(b)
            this.bullets.push(b)
        }
    }

    // 击中敌人
    ifHitEnemy() {
        let enemies = this.scene.enemies
        let bullets = this.bullets
        for (let b of bullets) {
            for (let e of enemies) {
                if (rectIntersects(b, e) || rectIntersects(e, b)) {
                    // 击中敌人
                    e.killed = true
                    // 爆炸 add particles
                    var ps = GuaParticleSystem.new(this.game, {
                        x: e.x + e.w,
                        y: e.y
                    })
                    this.scene.addElement(ps)
                }
            }
        }
        
    }

    // 判断敌机和玩家相撞
    ifCollideWithEnemy() {
        let player = this
        let enemies = this.scene.enemies
        for (let e of enemies) {
            if (rectIntersects(e, player) || rectIntersects(player, e)) {
                // 爆炸
                var ps = GuaParticleSystem.new(this.game, {
                    x: player.x + player.w,
                    y: player.y
                })
                this.scene.addElement(ps)
                // 游戏结束
                setTimeout(() => {
                    this.scene.gameOver()
                }, 300)
            }
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
        // 背景
        this.addElement(this.bg)
        // 玩家
        this.addElement(this.player)
        // 云
        this.addClouds()
        // 敌人
        this.addEnemies()
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

    gameOver() {
        var end = SceneEnd.new(this.game)
        this.game.replaceScene(end)
    }

    update() {
        super.update()

        // 删除击中的敌人 判断游戏是否结束
        this.enemies = this.enemies.filter(e => !e.killed)
        if (!this.enemies.length) {
            this.gameOver()
        }
    }

}