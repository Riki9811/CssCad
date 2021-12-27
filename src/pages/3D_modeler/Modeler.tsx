import React, { useReducer } from "react";
import { Color } from "../../interfaces/Colors";
import { SceneObject2D, SceneObject3D } from "../../interfaces/SceneObject";
import { Vector3 } from "../../interfaces/Vectors";
import "./Modeler.scss";

type ObjectsAction =
	| { type: "add"; obj: SceneObject2D | SceneObject3D }
	| { type: "addRnd" }
	| { type: "remove"; name: string }
	| { type: "pop"; index: number }
	| { type: "reset"; initialAmount: number };

type ObjectsState = Array<SceneObject2D | SceneObject3D>;

export default function Modeler() {
    //#region OBJECT ARRAY
	const [objects, objDispatch] = useReducer(objectsReducer, 20, objectsInit);

	function objectsInit(initialAmount: number): ObjectsState {
		let newObjs: ObjectsState = [];

		for (let i = 0; i < initialAmount; i++) {
			newObjs.push(generateRandomObj(i));
		}

		return newObjs;
	}

	function objectsReducer(state: ObjectsState, action: ObjectsAction): ObjectsState {
		switch (action.type) {
            case "add":
                // Check if name is already in use
				let names: string[] = state.map((obj: SceneObject2D | SceneObject3D) => obj.name);
                if (names.includes(action.obj.name)) throw new Error("Object array - ADD ERROR: name already in use.");
                // If not, add the new object
				return [...state, action.obj];
            case "addRnd":
                // Generate and add a new random obj
				return [...state, generateRandomObj(state.length)];
            case "remove":
                // Remove the object with the name given
				return state.filter((obj: SceneObject2D | SceneObject3D) => obj.name !== action.name);
            case "pop":
                // If no index given error
                if (action.index === undefined) throw new Error("Object array - POP ERROR: index not given.");
                // If index equals -1 do simple slice operation
                else if (action.index === -1) return [...state.slice(0, action.index)];
                // Else do complex slicing
				return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
            case "reset":
                // If no initial amount is given error
                if (action.initialAmount === undefined) throw new Error("Object array - RESET ERROR: initial amount not given.");
                // Reset to a starting condition (n amount of random objects)
				return objectsInit(action.initialAmount);
			default:
				throw new Error("Object array - ACTION ERROR: action type not found.");
		}
    }
    //#endregion

	function generateRandomObj(n: number): SceneObject2D {
		return {
			name: `Obj_${n}`,
			width: 20,
			height: 10,
			position: Vector3.Random(),
			rotation: Vector3.Random(),
			color: Color.Random(),
		};
	}

	return (
		<div className="modeler">
			Prova
			<button onClick={() => objDispatch({ type: "addRnd" })}>Add +</button>
			<button onClick={() => objDispatch({ type: "reset", initialAmount: 20 })}>Reset</button>
			<ul>
				{objects.map((elem: SceneObject2D | SceneObject3D) => {
					let contrastingCol = elem.color.toContrastingBlackWhite();
					let str = `${elem.name}, POS${elem.position}, ROT${elem.rotation}`;
					let styleBg = elem.color.toString();
					let styleColor = contrastingCol.toString();
					return (
						<li key={elem.name} style={{ backgroundColor: styleBg, marginBottom: ".2em" }}>
							<p style={{ color: styleColor, paddingBlock: ".3em" }}>{str}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
