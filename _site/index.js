(function() {
  var main;

  main = function() {
    var canvas, engine, onSceneLoad;
    canvas = document.querySelector('canvas');
    engine = new BABYLON.Engine(canvas, true);
    onSceneLoad = function(scene) {
      var onSceneReady;
      onSceneReady = function() {
        var onResize, render;
        onResize = function() {
          return engine.resize();
        };
        window.onresize = onResize;
        scene.activeCamera.attachControl(canvas);
        render = function() {
          return scene.render();
        };
        return engine.runRenderLoop(render);
      };
      return scene.executeWhenReady(onSceneReady);
    };
    return BABYLON.SceneLoader.Load('', 'index.babylon', engine, onSceneLoad);
  };

  window.onload = main;

}).call(this);
