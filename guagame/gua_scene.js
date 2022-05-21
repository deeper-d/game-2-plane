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
        for (let e of this.elements) {
            e.draw()
        }

    }

    update() {
        // 清除被杀掉的元素
        this.elements = this.elements.filter(each => !each.killed)
        for (let ele of this.elements) {
            ele.update()
        }
    }
}

