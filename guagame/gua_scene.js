class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }

    static new(game) {
        var instance = new this(game)
        return instance
    } 

    addElement(img) {
        this.elements.push(img)
        img.scene = this
    }

    draw() {
        for (let ele of this.elements) {
            this.game.drawImage(ele)
            ele.update()
        }

    }

    update() {
        for (let ele of this.elements) {
            this.game.drawImage(ele)
            ele.update()
        }
    }
}

