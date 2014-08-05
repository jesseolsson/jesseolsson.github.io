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
      armature = scene.getSkeletonByName('Armature')
      scene.beginAnimation(armature, 1, 250, true, 1.0)

    scene.executeWhenReady(onSceneReady)

  BABYLON.SceneLoader.Load(
    '',
    'index.babylon',
    engine,
    onSceneLoad)

window.onload = main
