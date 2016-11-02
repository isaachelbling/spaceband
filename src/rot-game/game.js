import jetpack          from 'fs-jetpack'
import { ROT }          from './lib/vendor/rot'
import { Systems }      from './lib/systems'
import { FileManager }  from './lib/file-manager'
import { SceneBuilder } from './lib/scene-builder'
import { View }         from './lib/view'
import { UserDialog }   from './lib/user-dialog'
import { cfg }          from './config'



export var Game = {

  level: jetpack.cwd()+'/src/rot-game/assets/levels/00.yml',

  init() {
    console.log('game.level:',this.level)
    window.addEventListener('keydown', this)
    this.startGame(this.level)
  },

  startGame(level) {
    // setup game system
    var scene     = new SceneBuilder(level).scene
    var view      = new View(scene)
    var system    = new Systems(scene, view)

    // setup game engine
    var scheduler = new ROT.Scheduler.Simple()
    system.engine = new ROT.Engine(scheduler)

    // starting up
    scheduler.add(system, true)
    view.attachToDOM()
    system.engine.start()
  },

  handleEvent(e) {
    var code = e.keyCode
    if (code == cfg.keyMap.loadLevel) {
      this.level = UserDialog.chooseLevel()
      this.startGame(this.level)
    }
    if (code == cfg.keyMap.resetLevel) {
      this.startGame(this.level)
    }
  }

}
