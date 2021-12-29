import React, { useReducer } from "react";
import { SceneObject2D, SceneObject3D } from "../../utils/SceneObject";
import { Color } from "../../utils/Colors";
import { Vector3 } from "../../utils/Vectors";
import { Objects, ObjectsAction } from "../../utils/Types";
import "./Modeler.scss";
import Explorer from "../../components/explorer/Explorer";
import ResizableDiv from "../../components/resizable-div/ResizableDiv";

export default function Modeler() {
	//#region OBJECT ARRAY
	const [objects, objDispatch] = useReducer(objectsReducer, 20, objectsInit);

	function objectsInit(initialAmount: number): Objects {
		let newObjs: Objects = [];

		for (let i = 0; i < initialAmount; i++) {
			newObjs.push(generateRandomObj(i));
		}

		return newObjs;
	}

	function objectsReducer(state: Objects, action: ObjectsAction): Objects {
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
		<div className="full-screen modeler">
			<ResizableDiv resizeFrom="right" className="explorer-container">
				<Explorer objects={objects} objectsDispatch={objDispatch} />
			</ResizableDiv>
			<div>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, pariatur?</p>
			</div>
			<ResizableDiv resizeFrom="left" className="explorer-container">
				<Explorer objects={objects} objectsDispatch={objDispatch} />
			</ResizableDiv>
			{/* <button onClick={() => objDispatch({ type: "addRnd" })}>Add +</button>
			<button
				onClick={() => {
					let usrInput = prompt("Name to remove", "Obj_0");

					if (usrInput != null) {
						objDispatch({ type: "remove", name: usrInput });
					}
				}}
			>
				Remove
			</button>
			<button
				onClick={() => {
					let usrInput = prompt("Index to remove", "0");

					if (usrInput != null) {
						objDispatch({ type: "pop", index: parseInt(usrInput) });
					}
				}}
			>
				Pop
			</button>
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
			</ul> */}
		</div>
	);
}
