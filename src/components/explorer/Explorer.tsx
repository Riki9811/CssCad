import React, { useState } from "react";
import { FaChevronDown, FaChevronRight, FaMinus } from "react-icons/fa";
import { ObjectsAction } from "../../utils/Types";
import { ObjectTree, SceneObject } from "../../utils/SceneObject";
import "./Explorer.scss";

interface Props {
	objects: ObjectTree;
	objectsDispatch: React.Dispatch<ObjectsAction>;
	total: number;
	selected: SceneObject | undefined;
	select: (obj: SceneObject) => void;
}

export default function Explorer(props: Props) {
	const { objects, objectsDispatch, total, selected, select } = props;

	const [expandedObjNames, setExpandedObjNames] = useState<Array<string>>([]);
	const [draggedObj, setDraggedObj] = useState<SceneObject>();
	const [mouseX, setMouseX] = useState<number>(-1);
	const [mouseY, setMouseY] = useState<number>(-1);

	function trackMousePos(evt: MouseEvent) {
		setMouseX(evt.clientX);
		setMouseY(evt.clientY);
	}

	//#region RENDER FUNCTIONS
	function renderHeader(): JSX.Element {
		return (
			<div className="flex-row align-center justify-space-between">
				<p>
					{total} object{total !== 1 ? "s" : ""} in total
				</p>
				<button
					onClick={() => {
						objectsDispatch({ type: "addRnd" });
					}}
				>
					Add +
				</button>
			</div>
		);
	}

	function renderObjectListItem(obj: SceneObject): JSX.Element {
		let className: string;
		let expanded: boolean = expandedObjNames.includes(obj.name);
		if (selected && obj.name === selected.name) className = "object-list-item object-list-item-selected";
		else className = "object-list-item";

		return (
			<React.Fragment key={`list-item-container-${obj.name}`}>
				<li
					key={`list-item-${obj.name}`}
					className={className}
					onClick={() => {
						select(obj);
					}}
					onMouseDown={(evt) => {
						setDraggedObj(obj);
						setMouseX(evt.clientX);
						setMouseY(evt.clientY);
						document.addEventListener("mousemove", trackMousePos);
					}}
                    onMouseUp={() => {
                        if (draggedObj && draggedObj.name !== obj.name) {
                            objectsDispatch({type: "moveInto", parentName: obj.name, newChild: draggedObj})
                            setExpandedObjNames([...expandedObjNames, obj.name]);
                        }
                        setDraggedObj(undefined);
                        document.removeEventListener("mousemove", trackMousePos);
                    }}
				>
					{renderExpander(obj.name, obj.children.length > 0, expanded)}
					{obj.name}
				</li>
				{expanded ? (
					<ul key={`sub-list-item-${obj.name}`} className="sub-object-list">
						{obj.children.map((child) => renderObjectListItem(child))}
					</ul>
				) : null}
			</React.Fragment>
		);
	}

	function renderExpander(objName: string, canExpand: boolean, expanded: boolean) {
		if (!canExpand) {
			return <FaMinus className="object-list-indicator" />;
		} else if (expanded) {
			return (
				<FaChevronDown
					className="object-list-expander"
					onClick={(evt) => {
						evt.stopPropagation();
						var index = expandedObjNames.indexOf(objName);
						if (index !== -1) {
							setExpandedObjNames([
								...expandedObjNames.slice(0, index),
								...expandedObjNames.slice(index + 1),
							]);
						}
					}}
				/>
			);
		} else {
			return (
				<FaChevronRight
					className="object-list-expander"
					onClick={(evt) => {
						evt.stopPropagation();
						setExpandedObjNames([...expandedObjNames, objName]);
					}}
				/>
			);
		}
	}

	function renderDraggedObjGhost() {
		if (draggedObj)
			return (
				<div className="dragged-object-ghost" style={{ top: mouseY, left: mouseX + 20 }}>
					{draggedObj.name}
				</div>
			);
	}
	//#endregion

	return (
		<div className="flex-column explorer">
			<h3>Explorer</h3>
			{renderHeader()}
			<div className="object-list-container">
				<ul className="object-list">{objects.getObjectList().map((obj) => renderObjectListItem(obj))}</ul>
			</div>
			{renderDraggedObjGhost()}
		</div>
	);
}
