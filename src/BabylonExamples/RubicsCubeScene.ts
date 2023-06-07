import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh} from "@babylonjs/core"

export class RubicsCubeScene {
    scene: Scene;
    engine: Engine;

    front = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    back = [18, 19, 20, 21, 22, 23, 24, 25, 26];
    left = [0, 3, 6, 9, 12, 15, 18, 21, 24];
    right = [2, 5, 8, 11, 14, 17, 20, 23, 26];
    bottom = [0, 1, 2, 9, 10, 11, 18, 19, 20];
    top = [6, 7, 8, 15, 16, 17, 24, 25, 26];

    constructor(private canvas:HTMLCanvasElement) {
        this.engine = new Engine(this.canvas, true);
        this.scene = this.CreateScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    CreateScene():Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera", new Vector3(0, 6, -10), this.scene);
        camera.attachControl();

        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);

        hemiLight.intensity = 0.5;

        // const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10}, this.scene);

        // const ball = MeshBuilder.CreateSphere("ball", {diameter: 1}, this.scene);
        // ball.position = new Vector3(0, 1, 0);

        // const square = MeshBuilder.CreateBox("testbox", {size: -1}, this.scene);
        // square.position = new Vector3(0, 1, 1);
        const cells = [];

        for(let i = 0; i < 27; i++) {
            const cell = MeshBuilder.CreateBox("testbox", {size: .8}, this.scene);
            cells.push(cell);
        }

        for(const i of this.top) {
            cells[i].addRotation(0, Math.PI/4, 0);
        }

        for(let i = 0; i < 27; i++) {
            cells[i].locallyTranslate(new Vector3(i % 3 - 1, Math.floor(i / 3) % 3 - 1, Math.floor(i / 9) % 3 - 1));
        }

        return scene;
    }
}