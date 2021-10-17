const randomBetween = (start, end) => {
    var n  = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Cloud extends GuaImage {
    constructor(game) {
        var type = randomBetween(1, 5)
        var name = 'cloud' + type
        super(game, name)
        this.setup()
    }

    setup() {
        this.speed = 1
        this.x = randomBetween(-100, 200)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }

}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.speed = 20
    }

    update() {
        this.y -= this.speed

        this.hitEnemy()

    }

    hitEnemy() {
        let enemies = this.scene.enemies
        for (let e of enemies) {
            if (this.y === e.y) {
                console.log('击中敌人 hit: ', e)
                // add particles
                var ps = GuaParticleSystem.new(this.game)
                this.scene.addElement(ps)
                e.life--
            }
        }
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'enemy' + type
        console.log('name', name)
        super(game, name)
        this.setup()
    }

    setup() {
        this.life = 1
        this.speed = randomBetween(2, 5)
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
        if (this.cooldown) {
            this.cooldown--
        }
       
    }

    fire() {
        if (this.cooldown === 0) {
            this.cooldown = 5
            var x = this.x + 15
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
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
        this.setup()
        this.setupInputs()

    }

    setup() {
        var game = this.game
        this.bg = GuaImage.new(game, 'sky')
        // this.cloud = GuaImage.new(game, 'cloud1')
        // this.player = GuaImage.new(g, 'plane') 
        this.player = Player.new(game)
        this.player.x = 200
        this.player.y = 500
        //
        this.numOfEnemies = 10

        // 在父类 GuaImage 里统一 draw 
        this.elements = []
        this.addElement(this.bg)
        this.addElement(this.player)
        //
        this.addClouds()
        this.addEnemies()
        // // add particles
        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)

    }

    addClouds() {
        var es = []
        for (let i = 0; i < 5; i++) {
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
        // this.cloud.y += 1
        // super.update()

         // 删除死掉的敌人
         this.enemies = this.enemies.filter(e => e.life > 0)
    }

}