window.addEventListener('load', function() {
  var canvas = document.querySelector('canvas')
  var engine = new BABYLON.Engine(canvas, true)
  BABYLON.SceneLoader.Load('', 'game.babylon', engine, function(scene) {
    scene.executeWhenReady(function() {
      scene.activeCamera.attachControl(canvas)
      scene.activeCamera.maxZ = 200
      engine.runRenderLoop(function() {
        scene.render()
      })
    })
  })
})
