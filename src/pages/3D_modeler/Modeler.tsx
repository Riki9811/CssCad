import React, { useDebugValue, useMemo, useReducer, useState } from "react";
import { Color } from "../../utils/Colors";
import { Vector3 } from "../../utils/Vectors";
import { ObjectsAction } from "../../utils/Types";
import "./Modeler.scss";
import Explorer from "../../components/explorer/Explorer";
import ResizableDiv from "../../components/resizable_div/ResizableDiv";
import Inspector from "../../components/inspector/Inspector";
import Viewport from "../../components/viewport/Viewport";
import { ObjectTree, SceneObject, SceneObject2D } from "../../utils/SceneObject";

export default function Modeler() {
	//#region STATE
	const { objects, objDispatch } = useObjectReducer();

	const totalCount = useMemo((): number => {
		return objects.getObjectCount();
	}, [objects]);

	const [selectedObj, setSelectedObj] = useState<SceneObject>();
	//#endregion

	function explorerSelect(obj: SceneObject) {
		if (selectedObj && selectedObj.name === obj.name) setSelectedObj(undefined);
		else setSelectedObj(obj);
	}

	return (
		<div className="full-screen modeler">
			<ResizableDiv resizeFrom="right" className="explorer-container">
				<Explorer
					objects={objects}
					objectsDispatch={objDispatch}
					total={totalCount}
					selected={selectedObj}
					select={explorerSelect}
				/>
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

function useObjectReducer() {
	const [objects, objDispatch] = useReducer(objectsReducer, 20, objectsInit);

	function objectsInit(initialAmount: number): ObjectTree {
		let newObjs: ObjectTree = new ObjectTree();

		for (let i = 0; i < initialAmount; i++) {
			newObjs.insert(generateRandomObj());
		}

		return newObjs;
	}

	function objectsReducer(state: ObjectTree, action: ObjectsAction): ObjectTree {
        let copy: ObjectTree = state.copy();

		switch (action.type) {
			case "add":
				copy.insert(action.obj);
				break;
			case "addRnd":
				copy.insert(generateRandomObj());
				break;
			case "remove":
				copy.remove(action.name);
				break;
			case "moveInto":
				copy.moveInto(action.newChild, action.parentName);
				break;
			case "reset":
				copy = objectsInit(action.initialAmount);
				break;
			default:
				throw new Error("Object array - ACTION ERROR: action type not found.");
		}
        
		return copy;
	}

	function generateRandomObj(): SceneObject2D {
		return new SceneObject2D(`Obj`, Vector3.Random(), Vector3.Random(), Color.Random(), 20, 10, []);
	}

	return { objects, objDispatch };
}
