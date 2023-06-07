import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture} from "@babylonjs/core"

export class StandardMaterials {
    scene: Scene;
    engine: Engine;

    constructor(private canvas:HTMLCanvasElement) {
        this.engine = new Engine(this.canvas, true);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    CreateScene():Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
        camera.attachControl();
        camera.speed = .25;

        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);

        hemiLight.intensity = 1;

        const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10}, this.scene);
        ground.material = this.CreateGroundMaterial();

        const ball = MeshBuilder.CreateSphere("ball", {diameter: 1}, this.scene);
        ball.material = this.CreateBallMaterial();
        ball.position = new Vector3(0, 1, 0);

        return scene;
    }

    CreateGroundMaterial(): StandardMaterial {
        const groundMat = new StandardMaterial("ground-material", this.scene);
        const scale = 4;
        const textures: Texture[] = [];

        const diffTexture = new Texture(
            "./textures/stone/cobblestone_05_diff_1k.jpg",
            this.scene
        )
        groundMat.diffuseTexture = diffTexture;
        textures.push(diffTexture);

        const aoTexture = new Texture(
            "./textures/stone/cobblestone_05_ao_1k.jpg",
            this.scene
        )
        groundMat.ambientTexture = aoTexture;
        textures.push(aoTexture);
        
        const normalTexture = new Texture(
            "./textures/stone/cobblestone_05_nor_gl_1k.jpg",
            this.scene
        )
        groundMat.bumpTexture = normalTexture;
        textures.push(normalTexture);

        const specTexture = new Texture(
            "./textures/stone/cobblestone_05_spec_1k.jpg",
            this.scene
        )
        groundMat.specularTexture = specTexture;
        textures.push(specTexture);

        textures.forEach(texture => {
            texture.uScale = scale;
            texture.vScale = scale;
        })

        return groundMat;
    }

    CreateBallMaterial(): StandardMaterial {
        const ballMat = new StandardMaterial("ball-material", this.scene);
        const scale = 2;
        const textures: Texture[] = [];

        const diffTexture = new Texture(
            "./textures/metal/metal_plate_diff_1k.jpg",
            this.scene
        )
        ballMat.diffuseTexture = diffTexture;
        textures.push(diffTexture);

        const aoTexture = new Texture(
            "./textures/metal/metal_plate_ao_1k.jpg",
            this.scene
        )
        ballMat.ambientTexture = aoTexture;
        textures.push(aoTexture);
        
        const normalTexture = new Texture(
            "./textures/metal/metal_plate_nor_gl_1k.jpg",
            this.scene
        )
        ballMat.bumpTexture = normalTexture;
        ballMat.invertNormalMapX = true;
        ballMat.invertNormalMapY = true;
        textures.push(normalTexture);

        const specTexture = new Texture(
            "./textures/metal/metal_plate_spec_1k.jpg",
            this.scene
        )
        ballMat.specularTexture = specTexture;
        textures.push(specTexture);

        textures.forEach(texture => {
            texture.uScale = scale;
            texture.vScale = scale;
        })

        return ballMat;
    }

}
