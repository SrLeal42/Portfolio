import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import { CreateProjectsScene } from "../scenes/ProjectsScene";

import styles from "../pages//home/Home.module.css";

export function BabylonScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    let scene: Scene | null = null;
    let isMounted = true;
   
    const initScene = async () => {
      const createdScene = await CreateProjectsScene(engine, canvasRef.current!);

      scene = createdScene;

      if (!isMounted) {
        scene.dispose();
        return;
      }
      
      engine.runRenderLoop(() => {
        scene?.render();
      });
    };

    initScene();

    const resize = () => engine.resize();
    window.addEventListener("resize", resize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", resize);
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvasBabylon}  />;
}
