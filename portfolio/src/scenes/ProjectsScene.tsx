import * as B from "@babylonjs/core";
// import { GizmoManager } from "@babylonjs/core/Gizmos/gizmoManager";
import { LightGizmo } from "@babylonjs/core/Gizmos/lightGizmo";

import * as C from '../constants/Constants';
// import { type ProjectData } from "../interfaces/ProjectData";

export async function CreateProjectsScene(engine: B.Engine, canvas: HTMLCanvasElement) {
  const scene = new B.Scene(engine);
  scene.clearColor = new B.Color4(.078, .078, .078, 1);

  CreateCamera(scene, canvas, false);
  CreateLights(scene, true);
  
  const projectMeshes = await CreateProjectsModels(scene);

  AttachModelAnimations(scene, projectMeshes);

  return scene;
}


function CreateCamera(scene:B.Scene, canvas:HTMLCanvasElement,attachControl=false) : B.Camera {

  const camera = new B.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 2,
    8,
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


  const light = new B.PointLight("light", new B.Vector3(0, 0, -8), scene); //new B.Vector3(2, 3, 2)
  light.intensity = 1.5;

  const light2 = new B.PointLight("light2", new B.Vector3(0, 0, 8), scene);
  light2.intensity = 1.5;

  if (gizmos) {
    const lightGizmo = new LightGizmo();
    lightGizmo.light = light2;
    lightGizmo.scaleRatio = 1; // tamanho do ícone
  }

  return light2;

}


async function CreateProjectsModels(scene : B.Scene) : Promise<B.AbstractMesh[]> {
  
  const projects = await LoadJson("/projects/projects.json");
  
  const projectMeshes: B.AbstractMesh[] = [];

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
      rootMesh.position = new B.Vector3(...project.position);
      rootMesh.scaling = new B.Vector3(project.scale, project.scale, project.scale);
      rootMesh.rotation = new B.Vector3(0,0,0);

      rootMesh.metadata = {
        url: project.url,
        name: project.name,
        basePosition: project.position
      };
      
      projectMeshes.push(rootMesh);
      
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



function AttachModelAnimations(scene:B.Scene, projectMeshes: B.AbstractMesh[]) : void {
  
  let hoveredMesh: B.AbstractMesh | null = null;

  scene.onPointerObservable.add((pointerInfo) => {
    
    if (pointerInfo.type === B.PointerEventTypes.POINTERMOVE) {
  
      const pick = scene.pick(scene.pointerX, scene.pointerY);

      if (pick?.hit && pick.pickedMesh) {
        const root = pick.pickedMesh.parent || pick.pickedMesh;

        if (projectMeshes.includes(root as B.AbstractMesh)) {
          hoveredMesh = root as B.AbstractMesh;
        } else {
          hoveredMesh = null;
        }
  
      } else {
        hoveredMesh = null;
      }
  
    }
  
  });


  scene.onBeforeRenderObservable.add(() => {
    for (const mesh of projectMeshes) {
      mesh.rotation.y += C.MODEL_SPIN_VEL;
      

      const baseZ = mesh.metadata.basePosition[2];
    
      // if (hoveredMesh) {
      //   console.log(baseZ);
      // } 

      const targetZ = mesh === hoveredMesh
        ? baseZ + C.MODEL_OFFSET_Z   // aproxima
        : baseZ;        // posição original

      mesh.position.z = B.Scalar.Lerp(mesh.position.z, targetZ, 0.05);
    
    }
    
  });

}