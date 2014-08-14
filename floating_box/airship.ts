import BABYLON = require("BABYLON");
module airship{

    export function initScene(scene : BABYLON.Scene) : void {
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        scene.autoClear = true;
        scene.clearColor    = new BABYLON.Color3(0,0,0);
        scene.ambientColor  = new BABYLON.Color3(0,0,0);
        scene.gravity = new BABYLON.Vector3(0,-9.81,0);

        // define materials & skeletons before meshes
        defineMaterials(scene);
        defineSkeletons(scene);

        // instance all root meshes
        new Plane("Plane", scene);
        new Cube("Cube", scene);

        // define cameras after meshes, incase LockedTarget is in use
        defineCameras  (scene);

        // cannot call Shadow Gen prior to all lights & meshes being instanced
        defineLights   (scene);
        defineShadowGen(scene);
    }

    var matLoaded = false;
    export function defineMaterials(scene : BABYLON.Scene) : void {
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        if (matLoaded) return;
        console.log('In defineMaterials');
        var material : BABYLON.StandardMaterial;
        var texture : BABYLON.Texture;
        material = new BABYLON.StandardMaterial("airship.Material", scene);
        material.ambientColor  = new BABYLON.Color3(0.8,0.8,0.8);
        material.diffuseColor  = new BABYLON.Color3(0.64,0.64,0.64);
        material.specularColor = new BABYLON.Color3(0.5,0.5,0.5);
        material.emissiveColor = new BABYLON.Color3(0,0,0);
        material.specularPower = 50;
        material.alpha =  1;
        material.backFaceCulling = true;
        defineMultiMaterials(scene);
        matLoaded = true;
    }

    export function defineMultiMaterials(scene : BABYLON.Scene) : void {
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        console.log('In defineMultiMaterials');
        var multiMaterial : BABYLON.MultiMaterial;
    }

    var bonesLoaded = false;
    export function defineSkeletons(scene : BABYLON.Scene) : void {
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        if (bonesLoaded) return;
        console.log('In defineSkeletons');
        var skeleton : BABYLON.Skeleton;
        var bone : BABYLON.Bone;
        var animation : BABYLON.Animation;
        bonesLoaded = true;
    }

    export class Plane extends BABYLON.Mesh {
        constructor(name: string, scene: BABYLON.Scene) {
            super(name, scene);

            airship.defineMaterials(scene); //embedded version check
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
    }

    export class Cube extends BABYLON.Mesh {
        constructor(name: string, scene: BABYLON.Scene) {
            super(name, scene);

            airship.defineMaterials(scene); //embedded version check
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
    }

    export function defineCameras(scene : BABYLON.Scene) : void {
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        console.log('In defineCameras');
        var camera : BABYLON.FreeCamera;
    }

    export function defineLights(scene : BABYLON.Scene) : void {
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        console.log('In defineLights');
        var light : BABYLON.Light;
        light = new BABYLON.DirectionalLight("Sun", new BABYLON.Vector3(-0.3843,-0.8911,-0.2413), scene);
        light.position = new BABYLON.Vector3(3.6959,6.3095,2.6116);
        light.id = "Sun";
        light.intensity = 1;
        light.diffuse = new BABYLON.Color3(1,1,1);
        light.specular = new BABYLON.Color3(1,1,1);
    }

    export function defineShadowGen(scene : BABYLON.Scene) : void {
        if (typeof(BABYLON.Engine.Version) === "undefined" || Number(BABYLON.Engine.Version.substr(0, 4)) < 1.13) throw "Babylon version too old";
        console.log('In defineShadowGen');
        var light : BABYLON.Light;
        var shadowGenerator : BABYLON.ShadowGenerator;
        var renderList : Array<BABYLON.Mesh>;
        light = scene.getLightByID("Sun");
        shadowGenerator = new BABYLON.ShadowGenerator(512, light);
        shadowGenerator.useVarianceShadowMap = false;
        renderList = shadowGenerator.getShadowMap().renderList;
        renderList.push(scene.getMeshByID("Cube"));
    }

}