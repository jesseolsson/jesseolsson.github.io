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
  scene.activeCamera.attachControl($('canvas'))
  scene.activeCamera.maxZ = 2000

}

function beforeRender(scene) {

}
