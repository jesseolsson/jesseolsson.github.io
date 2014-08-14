"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var airship = (function(){
    var ret = {};
    ret.initScene = function(scene){
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        scene.autoClear = true;
        scene.clearColor    = new BABYLON.Color3(0,0,0);
        scene.ambientColor  = new BABYLON.Color3(0,0,0);
        scene.gravity = new BABYLON.Vector3(0,-9.81,0);

        // define materials & skeletons before meshes
        ret.defineMaterials(scene);
        ret.defineSkeletons(scene);

        // instance all root meshes
        new ret.Plane("Plane", scene);
        new ret.Cube("Cube", scene);

        // define cameras after meshes, incase LockedTarget is in use
        ret.defineCameras  (scene);

        // cannot call Shadow Gen prior to all lights & meshes being instanced
        ret.defineLights   (scene);
        ret.defineShadowGen(scene);
    };

    var matLoaded = false;
    ret.defineMaterials = function(scene){
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        if (matLoaded) return;
        console.log('In defineMaterials');
        var material;
        var texture;
        material = new BABYLON.StandardMaterial("airship.Material", scene);
        material.ambientColor  = new BABYLON.Color3(0.8,0.8,0.8);
        material.diffuseColor  = new BABYLON.Color3(0.64,0.64,0.64);
        material.specularColor = new BABYLON.Color3(0.5,0.5,0.5);
        material.emissiveColor = new BABYLON.Color3(0,0,0);
        material.specularPower = 50;
        material.alpha =  1;
        material.backFaceCulling = true;
        ret.defineMultiMaterials(scene);
        matLoaded = true;
    };

    ret.defineMultiMaterials = function(scene){
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        console.log('In defineMultiMaterials');
        var multiMaterial;
    };

    var bonesLoaded = false;
    ret.defineSkeletons = function(scene){
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        if (bonesLoaded) return;
        console.log('In defineSkeletons');
        var skeleton;
        var bone;
        var animation;
        bonesLoaded = true;
    };

    ret.Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane(name, scene){
            _super.call(this, name, scene);

            ret.defineMaterials(scene); //embedded version check
            console.log('defining mesh: ' + this.name);

            this.id = this.name;
            this.billboardMode  = 0;
            this.position.x  = 0;
            this.position.y  = 0;
            this.position.z  = 0;
            this.rotation.x  = 0;
            this.rotation.y  = 0;
            this.rotation.z  = 0;
            this.scaling.x   = 5;
            this.scaling.y   = 5;
            this.scaling.z  = 5;
            this.isVisible       = true;
            this.checkCollisions = false;
            this.receiveShadows  = true;
            this.setVerticesData(BABYLON.VertexBuffer.PositionKind, [
                1,0,-1,1,0,1,-1,0,1,-1,0,-1
            ],
            false);

            this.setVerticesData(BABYLON.VertexBuffer.NormalKind, [
                0,1,0,0,1,0,0,1,0,0,1,0
            ],
            false);

            this.setIndices([
                0,1,2,3,0,2
            ]);

            this.subMeshes = [];
            new BABYLON.SubMesh(0, 0, 4, 0, 6, this);
            this.computeWorldMatrix(true);
            if (scene._selectionOctree) {
                scene._selectionOctree.addMesh(this);
            }
        }
        return Plane;
    })(BABYLON.Mesh);

    ret.Cube = (function (_super) {
        __extends(Cube, _super);
        function Cube(name, scene){
            _super.call(this, name, scene);

            ret.defineMaterials(scene); //embedded version check
            console.log('defining mesh: ' + this.name);

            this.setMaterialByID("airship.Material");
            this.id = this.name;
            this.billboardMode  = 0;
            this.position.x  = 0;
            this.position.y  = 5.0573;
            this.position.z  = 0;
            this.rotation.x  = 0.6887;
            this.rotation.y  = 0.276;
            this.rotation.z  = -0.3513;
            this.scaling.x   = 1;
            this.scaling.y   = 1;
            this.scaling.z  = 1;
            this.isVisible       = true;
            this.checkCollisions = false;
            this.receiveShadows  = false;
            this.setVerticesData(BABYLON.VertexBuffer.PositionKind, [
                1,-1,-1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,1,1,-1,1,-1,1,1,1,1
            ],
            false);

            this.setVerticesData(BABYLON.VertexBuffer.NormalKind, [
                0.5773,-0.5773,-0.5773,-0.5773,-0.5773,-0.5773,-0.5773,-0.5773,0.5773,-0.5773,0.5773,0.5773,-0.5773,0.5773,-0.5773,0.5773,0.5773,-0.5773,0.5773,-0.5773,0.5773,0.5773,0.5773,0.5773
            ],
            false);

            this.setIndices([
                0,1,2,3,4,5,6,7,5,0,5,4,4,3,2,6,2,3,6,0,2,7,3,5,0,6,5,1,0,4,1,4,2,7,6,3
            ]);

            this.subMeshes = [];
            new BABYLON.SubMesh(0, 0, 8, 0, 36, this);
            this.computeWorldMatrix(true);
            if (scene._selectionOctree) {
                scene._selectionOctree.addMesh(this);
            }
        }
        return Cube;
    })(BABYLON.Mesh);

    ret.defineCameras = function(scene){
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        console.log('In defineCameras');
        var camera;
    };

    ret.defineLights = function(scene){
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        console.log('In defineLights');
        var light;
        light = new BABYLON.DirectionalLight("Sun", new BABYLON.Vector3(-0.3843,-0.8911,-0.2413), scene);
        light.position = new BABYLON.Vector3(3.6959,6.3095,2.6116);
        light.id = "Sun";
        light.intensity = 1;
        light.diffuse = new BABYLON.Color3(1,1,1);
        light.specular = new BABYLON.Color3(1,1,1);
    };

    ret.defineShadowGen = function(scene){
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        console.log('In defineShadowGen');
        var light;
        var shadowGenerator;
        var renderList;
        light = scene.getLightByID("Sun");
        shadowGenerator = new BABYLON.ShadowGenerator(512, light);
        shadowGenerator.useVarianceShadowMap = false;
        renderList = shadowGenerator.getShadowMap().renderList;
        renderList.push(scene.getMeshByID("Cube"));
    };
    return ret;

}());