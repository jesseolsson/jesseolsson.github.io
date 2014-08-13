window.on('load', function() {
  var engine = new BABYLON.Engine($('canvas'), true)
  enableEngineResizing(engine)
  var scene = setupScene(engine)
  scene.registerBeforeRender(function() {
    beforeRender(scene)
  })
  engine.runRenderLoop(function() {
    scene.render()
  })
})

function enableEngineResizing(engine) {
  window.on('resize', function() {
    engine.resize()
  })
}

function setupScene(engine){
  var scene = new BABYLON.Scene(engine)
  var cameraLoc = new BABYLON.Vector3(0, 0, -10)
  var camera = new BABYLON.FreeCamera('camera', cameraLoc, scene)
  var lightLoc = new BABYLON.Vector3(0, 10, -10)
  var light = new BABYLON.PointLight('light', lightLoc, scene)
  var box = BABYLON.Mesh.CreateBox('box', 1, scene)
  var plane = BABYLON.Mesh.CreatePlane('plane', 2, scene)

  camera.attachControl($('canvas'))
  plane.rotation = new BABYLON.Vector3(0, 1.6, 0)
  plane.position = new BABYLON.Vector3(4, 0, 0)

  scene.enablePhysics()
  scene.setGravity(new BABYLON.Vector3(0, -10, 0));
  box.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1 });

  return scene
}

function beforeRender(scene) {

}
