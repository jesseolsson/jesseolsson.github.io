(function() {
  var main;

  main = function() {
    var canvas, engine, onSceneLoad;
    canvas = document.querySelector('canvas');
    engine = new BABYLON.Engine(canvas, true);
    onSceneLoad = function(scene) {
      var onSceneReady;
      onSceneReady = function() {
        var armature, onResize, render;
        onResize = function() {
          return engine.resize();
        };
        window.onresize = onResize;
        scene.activeCamera.attachControl(canvas);
        render = function() {
          return scene.render();
        };
        engine.runRenderLoop(render);
        armature = scene.getSkeletonByName('Armature');
        return scene.beginAnimation(armature, 1, 250, true, 1.0);
      };
      return scene.executeWhenReady(onSceneReady);
    };
    return BABYLON.SceneLoader.Load('', 'index.babylon', engine, onSceneLoad);
  };

  window.onload = main;

}).call(this);
