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

      scene.enablePhysics()
      var sphere = scene.getMeshByName('Sphere')
      sphere.setPhysicsState({impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1, restitution: .1})
      var plane = scene.getMeshByName('Plane')
      plane.setPhysicsState({impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0})
      scene.activeCamera.attachControl($('canvas'))

      setupLoop(engine, scene)
    })
  })
}

function beforeRender(scene) {
  if (keydown) {
    var player = scene.getMeshByName('player')
    var forwards = new BABYLON.Vector3(-.01, 0, 0)
    player.moveWithCollisions(forwards)
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
