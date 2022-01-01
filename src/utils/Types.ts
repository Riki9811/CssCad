import { SceneObject, SceneObject2D, SceneObject3D, SceneObjectInterface } from "./SceneObject";

export type ObjectsAction =
	| { type: "add"; obj: SceneObject2D | SceneObject3D }
	| { type: "addRnd" }
	| { type: "remove"; name: string }
	| { type: "reset"; initialAmount: number }
	| { type: "moveInto"; parentName?: string; newChild: SceneObject };
