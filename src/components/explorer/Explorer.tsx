import React, { useCallback, useState } from "react";
import { FaChevronDown, FaChevronRight, FaCube, FaRegSquare } from "react-icons/fa";
import { ObjectsAction } from "../../utils/Types";
import { ObjectTree, SceneObject, SceneObject2D } from "../../utils/SceneObject";
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
	const { startDrag, dragging, mouseX, mouseY } = useMouseDrag();

	function listItemMouseDown(obj: SceneObject, evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
		setDraggedObj(obj);
		startDrag(evt);
		document.addEventListener("mousemove", dragging);
		document.addEventListener("mouseup", documentMouseUp);
	}

	function listItemMouseUp(obj: SceneObject, evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
		if (draggedObj && draggedObj.name !== obj.name) {
			objectsDispatch({ type: "moveInto", parentName: obj.name, newChild: draggedObj });
			setExpandedObjNames([...expandedObjNames, obj.name]);
		}
		document.removeEventListener("mousemove", dragging);
		document.removeEventListener("mouseup", documentMouseUp);
		setDraggedObj(undefined);
		evt.stopPropagation();
	}

	function objectListMouseUp(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (draggedObj) {
			objectsDispatch({ type: "moveInto", newChild: draggedObj });
			document.removeEventListener("mousemove", dragging);
			document.removeEventListener("mouseup", documentMouseUp);
			setDraggedObj(undefined);
			evt.stopPropagation();
		}
	}

	const documentMouseUp = useCallback(() => {
		document.removeEventListener("mousemove", dragging);
		document.removeEventListener("mouseup", documentMouseUp);
		setDraggedObj(undefined);
	}, []);

	//#region RENDER FUNCTIONS
	function renderHeader(): JSX.Element {
		return (
			<div className="flex-column">
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
				<div className="flex-row align-center justify-space-between">
					<button
						onClick={() => {
							let newExpanded = [];
							for (const obj of objects.preOrderTraversal()) {
								newExpanded.push(obj.name);
							}
							setExpandedObjNames(newExpanded);
						}}
					>
						Expand all
					</button>
					<button
						onClick={() => {
							setExpandedObjNames([]);
						}}
					>
						Collapse all
					</button>
				</div>
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
					onClick={() => select(obj)}
					onMouseDown={(evt) => listItemMouseDown(obj, evt)}
					onMouseUp={(evt) => listItemMouseUp(obj, evt)}
				>
					{obj.children.length > 0 ? (
						renderExpander(obj.name, expanded)
					) : (
						<div className="object-list-spacer" />
					)}
					{renderObjectIcon(obj instanceof SceneObject2D)}
					{obj.name}
				</li>
				{renderListItemChildren(expanded, obj)}
			</React.Fragment>
		);
	}

	function renderListItemChildren(expanded: boolean, obj: SceneObject) {
		if (expanded) {
			return (
				<ul key={`sub-list-item-${obj.name}`} className="sub-object-list">
					{obj.children.map((child, index) => renderObjectListItem(child))}
				</ul>
			);
		}
	}

	function renderObjectIcon(is2D: boolean) {
		return is2D ? <FaRegSquare className="object-list-icon" /> : <FaCube className="object-list-icon" />;
	}

	function renderExpander(objName: string, expanded: boolean) {
		if (expanded) {
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
			<div className="object-list-container" onMouseUp={objectListMouseUp}>
				<ul className="object-list">{objects.getObjectList().map((obj) => renderObjectListItem(obj))}</ul>
			</div>
			{renderDraggedObjGhost()}
		</div>
	);
}

function useMouseDrag() {
	const [mouseX, setMouseX] = useState<number>(-1);
	const [mouseY, setMouseY] = useState<number>(-1);

	const dragging = useCallback((evt: MouseEvent) => {
		setMouseX(evt.clientX);
		setMouseY(evt.clientY);
	}, []);

	const startDrag = useCallback((evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		setMouseX(evt.clientX);
		setMouseY(evt.clientY);
	}, []);

	return { startDrag, dragging, mouseX, mouseY };
}
