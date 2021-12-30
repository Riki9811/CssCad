import React, { useMemo, useReducer, useState } from "react";
import { SceneObject2D, SceneObject3D } from "../../utils/SceneObject";
import { Color } from "../../utils/Colors";
import { Vector3 } from "../../utils/Vectors";
import { Objects, ObjectsAction } from "../../utils/Types";
import "./Modeler.scss";
import Explorer from "../../components/explorer/Explorer";
import ResizableDiv from "../../components/resizable-div/ResizableDiv";
import Inspector from "../../components/inspector/Inspector";
import Viewport from "../../components/viewport/Viewport";

function objectsInit(initialAmount: number): Objects {
	let newObjs: Objects = [];

	for (let i = 0; i < initialAmount; i++) {
		newObjs = objectsReducer(newObjs, { type: "add", obj: generateRandomObj() });
	}

	return newObjs;
}

function objectsReducer(state: Objects, action: ObjectsAction): Objects {
	let names: string[] = state.map((obj: SceneObject2D | SceneObject3D) => obj.name);
	switch (action.type) {
		case "add":
			// Check if name is already in use
            if (names.includes(action.obj.name)) {
                let newName = action.obj.name;
				newName = `${newName}_${names.filter((elem) => elem.startsWith(newName)).length}`;
				action.obj.name = newName;
			}
			// If not, add the new object
			return [...state, action.obj];
		case "addRnd":
			// Generate and add a new random obj
			return objectsReducer(state, { type: "add", obj: generateRandomObj() });
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

function generateRandomObj(): SceneObject2D {
	return {
		name: `Obj`,
		width: 20,
		height: 10,
		position: Vector3.Random(),
		rotation: Vector3.Random(),
		color: Color.Random(),
		children: [],
	};
}

export default function Modeler() {
	//#region STATE
	const [objects, objDispatch] = useReducer(objectsReducer, 20, objectsInit);

	const totalCount = useMemo((): number => {
		function countTotal(objs: Objects) {
			let tot = objs.length;
			objs.forEach((obj) => {
				tot += countTotal(obj.children);
			});
			return tot;
		}
		console.log("Recomputed total count");
		return countTotal(objects);
	}, [objects]);

	const [selectedObj, setSelectedObj] = useState<SceneObject2D | SceneObject3D>();
	//#endregion

	function explorerSelect(obj: SceneObject2D | SceneObject3D) {
		if (selectedObj && selectedObj.name === obj.name) setSelectedObj(undefined);
		else setSelectedObj(obj);
	}

	return (
		<div className="full-screen modeler">
			<ResizableDiv resizeFrom="right" className="explorer-container">
				<Explorer objects={objects} objectsDispatch={objDispatch} total={totalCount} selected={selectedObj} select={explorerSelect} />
			</ResizableDiv>
			<div className="viewport-container">
				<Viewport objects={objects} />
			</div>
			<ResizableDiv resizeFrom="left" className="inspector-container">
				<Inspector object={selectedObj} />
			</ResizableDiv>
		</div>
	);
}
