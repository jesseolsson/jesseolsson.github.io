var keydown = false

window.on('load', function() {
  setupController()
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

      var camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', 1.6, 1.6, 10, new BABYLON.Vector3(0, 0, 0), scene)
      scene.enablePhysics()
      var cube = scene.getMeshByName('Cube')
      cube.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1, restitution: .2 })
      var plane = scene.getMeshByName('Plane')
      plane.setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0 })
      scene.activeCamera.attachControl($('canvas'))

      setupLoop(engine, scene)
    })
  })
}

function beforeRender(scene) {
  if (keydown) {
    var cube = scene.getMeshByName('Cube')
    cube.translate(BABYLON.Axis.X, .01)
  }
}

function setupLoop(engine, scene) {
  scene.registerBeforeRender(function() {
    beforeRender(scene)
  })
  engine.runRenderLoop(function() {
    scene.render()
  })
}

function setupController() {
  window.on('keydown', function() {
    keydown = true
  })
  window.on('keyup', function() {
    keydown = false
  })
}
