window.on('load', function() {
  var engine = new BABYLON.Engine($('canvas'), true)
  enableEngineResizing(engine)
  var scene = setupScene(engine)
})

function enableEngineResizing(engine) {
  window.on('resize', function() {
    engine.resize()
  })
}

function setupScene(engine){
  BABYLON.SceneLoader.Load('', 'airship.babylon', engine, function(scene) {
    scene.executeWhenReady(function() {
      codeScene(scene)
      setupLoop(engine, scene)
      setupController(scene)
    })
  })
}

function setupLoop(engine, scene) {
  scene.registerBeforeRender(function() {
    beforeRender(scene)
  })
  engine.runRenderLoop(function() {
    scene.render()
  })
}

function codeScene(scene) {
  var window1 = scene.getMeshByName('cafe_window_1')
  var human = scene.getMeshByName('human')
  var fountain = scene.getMeshByName('fountain')
  var tower = scene.getMeshByName('tower')
  var poles = scene.getMeshByName('cafe_poles')
  var canopy = scene.getMeshByName('cafe_canopy')
  var ground = scene.getMeshByName('ground')
  var fountainPool = scene.getMeshByName('fountain_pool')

  scene.activeCamera.attachControl($('canvas'))
  scene.activeCamera.maxZ = 2000

  var fountainStart = new BABYLON.Vector3(14.36917, -10.2, 27.90984)
  var fountainP = new BABYLON.ParticleSystem('fountainP', 20000, scene)
  fountainP.emitRate = 21000
  fountainP.gravity = new BABYLON.Vector3(0, -75, 0)
  fountainP.emitter = fountainStart
  fountainP.particleTexture = new BABYLON.Texture('textures/fountain_water.png', scene)
  fountainP.color1 = new BABYLON.Color4(.5, .5, .5, .5)
  fountainP.color2 = new BABYLON.Color4(.4, .4, .5, .5)
  fountainP.colorDead = new BABYLON.Color4(.8, .8, .8, .8)
  fountainP.minSize = .08
  fountainP.maxSize = .08
  fountainP.minLifeTime = .8
  fountainP.maxLifeTime = .8
  fountainP.minEmitPower = 5;
  fountainP.maxEmitPower = 5;
  fountainP.direction1 = new BABYLON.Vector3(-1.4, 4, -1.4)
  fountainP.direction2 = new BABYLON.Vector3(1.4, 4, 1.4)
  fountainP.start()

  var windowMaterial = new BABYLON.StandardMaterial('window', scene)
  windowMaterial.reflectionTexture = new BABYLON.MirrorTexture('mirror', 512, scene, true)
  windowMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(-1, 0, 0, -15)
  windowMaterial.reflectionTexture.renderList = [human, fountain, tower, poles, canopy, ground]
  windowMaterial.diffuseColor = new BABYLON.Color3(.01, .01, .01)
  windowMaterial.alpha = 0.5

  window1.material = windowMaterial
}

function beforeRender(scene) {

}


function setupController(scene) {
  window.on('keydown', function(e) {
    switch (e.keyCode) {
      case 80:
        var x = scene.activeCamera.position.x
        var y = scene.activeCamera.position.y
        var z = scene.activeCamera.position.z
        console.log('new BABYLON.Vector3(' + x + ', ' + y + ', ' + z + ')')
    }
  })
}
