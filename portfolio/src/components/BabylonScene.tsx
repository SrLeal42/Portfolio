import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import { CreateProjectsScene } from "../scenes/ProjectsScene";

export function BabylonScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene: Scene = CreateProjectsScene(engine, canvasRef.current);

    engine.runRenderLoop(() => {
      scene.render();
    });

    const resize = () => engine.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "800px" }} />;
}
