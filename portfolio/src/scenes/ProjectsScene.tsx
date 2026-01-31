import * as B from "@babylonjs/core";
// import { GizmoManager } from "@babylonjs/core/Gizmos/gizmoManager";
import { LightGizmo } from "@babylonjs/core/Gizmos/lightGizmo";

import * as C from '../constants/Constants';
import { Normalize } from "../assets/OtherScripts";
// import { type ProjectData } from "../interfaces/ProjectData";

let eng: B.Engine;

let projectMeshes : B.TransformNode[];

let hoverLight : B.PointLight;

export async function CreateProjectsScene(engine: B.Engine, canvas: HTMLCanvasElement) {
  eng = engine;

  const scene = new B.Scene(engine);
  scene.clearColor = new B.Color4(.078, .078, .078, 1);

  CreateCamera(scene, canvas, false);
  CreateLights(scene, false);
  
  projectMeshes = await CreateProjectsModels(scene);
  
  AttachModelAnimations(scene, projectMeshes);

  engine.onResizeObservable.add(() => {
    UpdateResponsiveLayout();
  });
  UpdateResponsiveLayout();
  

  return scene;
}


function CreateCamera(scene:B.Scene, canvas:HTMLCanvasElement,attachControl=false) : B.Camera {

  const camera = new B.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 2,
    6,
    B.Vector3.Zero(),
    scene
  );

  if (attachControl){
    camera.attachControl(canvas, true);
  }

  return camera;

}

function CreateLights(scene:B.Scene, gizmos=false) : B.PointLight {

  const HemiLight = new B.HemisphericLight("light", new B.Vector3(0, 1, 0), scene);
  HemiLight.intensity = .75;


  const light = new B.PointLight("light", new B.Vector3(0, 0, -2), scene); //new B.Vector3(2, 3, 2)
  light.intensity = 1.5;

  const light2 = new B.PointLight("light2", new B.Vector3(0, 0, 2), scene);
  light2.intensity = 2;

  // Criando a HoverLight
  hoverLight = new B.PointLight("hoverLight", new B.Vector3(0, 0, 0), scene);
  hoverLight.intensity = 0;
  hoverLight.radius = 10;

  if (gizmos) {
    const lightGizmo = new LightGizmo();
    lightGizmo.light = light2;
    lightGizmo.scaleRatio = 1; // tamanho do ícone
  }

  return light2;

}


async function CreateProjectsModels(scene : B.Scene) : Promise<B.TransformNode[]> {
  
  const projects = await LoadJson("/projects/projects.json");
  
  const projectMeshes: B.TransformNode[] = [];

  for (const project of projects) {
    
    const modelPath =
      project.model && project.model.trim() !== ""
        ? project.model
        : C.DEFAULT_MODEL_PATH;

    try {
      
      const result = await B.SceneLoader.ImportMeshAsync(
        "",
        modelPath,
        "",
        scene
      );

      const rootMesh = result.meshes[0];
      
      const pivot = new B.TransformNode(project.id + "_pivot", scene);
      pivot.position = new B.Vector3(...project.position);

      rootMesh.parent = pivot;
      rootMesh.scaling.setAll(project.scale);
      rootMesh.rotation = new B.Vector3(0,0,0);

      const renderMeshes = result.meshes.filter(m => m.getTotalVertices() > 0);
      
      pivot.metadata = {
        basePosition: project.position,
        baseScale: project.scale,
        root: rootMesh,
        meshes: renderMeshes,
        outlineWidthCurrent: 0
      };

      projectMeshes.push(pivot); // a lista guarda pivôs

      
    } catch (err) {
      console.error(`Erro ao carregar modelo ${modelPath}`, err);
      return projectMeshes;
    }
    
  }

  return projectMeshes;

} 



export async function LoadJson(path: string): Promise<any> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Erro ao carregar modelos "${path}": ${response.statusText}`);
  }

  const json = await response.json();

  return json;
}



function AttachModelAnimations(scene:B.Scene, projectMeshes: B.TransformNode[]) : void {
  
  let hoveredMesh: B.AbstractMesh | null = null;

  scene.onPointerObservable.add((pointerInfo) => {
    
    if (pointerInfo.type === B.PointerEventTypes.POINTERMOVE) {
  
      const pick = scene.pick(scene.pointerX, scene.pointerY);

      if (pick?.hit && pick.pickedMesh) {
        const root = pick.pickedMesh;

        let pivot = root;
        while (pivot.parent && !projectMeshes.includes(pivot)) {
          pivot = pivot.parent as B.AbstractMesh;
        }

        hoveredMesh = pivot;

        pivot.metadata.hoverPoint = pick.pickedPoint;
  
      } else {
        hoveredMesh = null;
      }
  
    }
  
  });


  scene.onBeforeRenderObservable.add(() => {
    for (const mesh of projectMeshes) {
      mesh.rotation.y += C.MODEL_SPIN_VEL;
      
      // const model = mesh.metadata.root as B.AbstractMesh;
      
      const baseZ = mesh.metadata.basePosition[2];
    
      const targetZ = mesh === hoveredMesh
        ? baseZ + C.MODEL_OFFSET_Z
        : baseZ;

      mesh.position.z = B.Scalar.Lerp(mesh.position.z, targetZ, C.MODEL_OFFSET_VEL);
      
      // ------- OUTLINE -------
      const meshes = mesh.metadata.meshes as B.AbstractMesh[];
      for (const m of meshes) {
        const current = mesh.metadata.outlineWidthCurrent as number;
        const target  = mesh === hoveredMesh ? C.WIDTH_OUTLINE : 0;

        const next = B.Scalar.Lerp(current, target, C.VEL_OUTLINE);

        mesh.metadata.outlineWidthCurrent = next;

        m.outlineWidth = next;
        m.outlineColor = new B.Color3(...C.COLOR_OUTLINE);
        m.renderOutline = next > 0.001; // só ativa quando visível
      }

      // if (hoveredMesh) {
      //   const pos = hoveredMesh.getAbsolutePosition();

      //   hoverLight.position = B.Vector3.Lerp(hoverLight.position, pos, 0.1);
      //   hoverLight.intensity = B.Scalar.Lerp(hoverLight.intensity, 3, 0.1);
      // } else {
      //   hoverLight.intensity = B.Scalar.Lerp(hoverLight.intensity, 0, 0.1);
      // }

    }
    
  });

}


function UpdateResponsiveLayout() : void {

  const width = eng.getRenderWidth();

  const t = Normalize(width, C.MIN_SCREEN_RESPONSIVE, C.MAX_SCREEN_RESPONSIVE); 

  let scaleFactor = B.Scalar.Lerp(0.5, 1.0, t);
  let HSpacingFactor = B.Scalar.Lerp(0.35, 1.0, t);
  let VSpacingFactor = B.Scalar.Lerp(0.7, 1.0, t);

  for (const mesh of projectMeshes) {
    const model = mesh.metadata.root as B.AbstractMesh;

    const basePos = mesh.metadata.basePosition;
    const baseScale = mesh.metadata.baseScale as number;
    
    model.scaling.setAll(baseScale * scaleFactor);

    mesh.position.x = basePos[0] * HSpacingFactor;
    mesh.position.y = basePos[1] * VSpacingFactor;
  }

}



