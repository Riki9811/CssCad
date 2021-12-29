import { Color } from "./Colors";
import { Vector3 } from "./Vectors";

interface SceneObject {
    name: string;
	position: Vector3;
    rotation: Vector3;
    color: Color;
}

export interface SceneObject2D extends SceneObject {
    width: number;
    height: number;
}

export interface SceneObject3D extends SceneObject {
    width: number;
    height: number;
    depth: number;
}