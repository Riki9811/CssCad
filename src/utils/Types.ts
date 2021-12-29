import { SceneObject2D, SceneObject3D } from "./SceneObject";

export type ObjectsAction =
	| { type: "add"; obj: SceneObject2D | SceneObject3D }
	| { type: "addRnd" }
	| { type: "remove"; name: string }
	| { type: "pop"; index: number }
	| { type: "reset"; initialAmount: number };

export type Objects = Array<SceneObject2D | SceneObject3D>;
