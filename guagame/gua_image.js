class GuaImage {
    constructor(game, name) {
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }

    static new(game, name) {
        var instance = new this(game, name)
        return instance
    }

    draw() {

    }

    update() {

    }
}

// 逻辑上来看不应该继承 GuaImage, 但是现在先这么来吧
class Player extends GuaImage {
    constructor(game, name) {
        super(game, name)
    }

}
