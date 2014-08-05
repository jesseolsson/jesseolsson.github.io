---
---

main = ->
  canvas = document.querySelector('canvas')
  engine = new BABYLON.Engine(canvas, true)

  onSceneLoad = (scene) ->

    onSceneReady = ->

      onResize = ->
        engine.resize()

      window.onresize = onResize
      scene.activeCamera.attachControl(canvas)

      render = ->
        scene.render()

      engine.runRenderLoop(render)

    scene.executeWhenReady(onSceneReady)

  BABYLON.SceneLoader.Load(
    '',
    'index.babylon',
    engine,
    onSceneLoad)

window.onload = main
