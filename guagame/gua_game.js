class Guagame {
    constructor(fps, images, runCallback) {
        window.fps = 30
        this.fps = fps 
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        // 
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        let self = this
        window.addEventListener('keydown', function (event) {
            self.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = false
        })
        // 初始化数据
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    init() {
        this.start()
    }

    update() {
        this.scene.update && this.scene.update()

    }
    draw() {
        this.scene.draw()
    }

    drawImage(guaImage)  {
        this.context.drawImage(guaImage.texture, guaImage.x, guaImage.y)
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    replaceScene(newScene) {
        this.scene = newScene
    }

    textureByName(name)  {
        var img = imageFromPath(this.images[name])
        return img
    }

    runWithScene(scene) {
        let self = this
        self.scene = scene
        setTimeout(function () {
            self.runloop()
    
        }, 1000/window.fps)
    }

    runloop() {
        var g = this
        // console.log('监听动画')

        // events
        var actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            var k = actions[i]
            if (g.keydowns[k]) {
                g.actions[k]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function () {
            g.runloop()
     
         }, 1000/window.fps)
    }

    start() {
        this.runCallback(this)
    }

}
