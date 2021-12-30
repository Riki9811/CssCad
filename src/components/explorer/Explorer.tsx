import React, { useState } from "react";
import { SceneObject2D, SceneObject3D } from "../../utils/SceneObject";
import { FaChevronDown, FaChevronRight, FaMinus } from "react-icons/fa";
import { Objects, ObjectsAction } from "../../utils/Types";
import "./Explorer.scss";

interface Props {
	objects: Objects;
	objectsDispatch: React.Dispatch<ObjectsAction>;
	total: number;
	selected: SceneObject2D | SceneObject3D | undefined;
	select: (obj: SceneObject2D | SceneObject3D) => void;
}

export default function Explorer(props: Props) {
	const { objects, objectsDispatch, total, selected, select } = props;

	const [expandedObjNames, setExpandedObjNames] = useState<Array<string>>([]);

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

	function renderObjectListItem(obj: SceneObject2D | SceneObject3D): JSX.Element {
		let className: string;
		let expanded: boolean = expandedObjNames.includes(obj.name);
		if (selected && obj.name === selected.name) className = "object-list-item object-list-item-selected";
		else className = "object-list-item";

		let subList = (
			<ul key={`sub-list-item-${obj.name}`} className="sub-object-list">
				{obj.children.map((child) => renderObjectListItem(child))}
			</ul>
		);

		return (
			<React.Fragment key={`list-item-container-${obj.name}`}>
				<li
					key={`list-item-${obj.name}`}
					className={className}
					onClick={() => {
						select(obj);
					}}
				>
					{renderExpander(obj.name, obj.children.length > 0, expanded)}
					{obj.name}
				</li>
				{expanded ? subList : null}
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
							setExpandedObjNames([...expandedObjNames.slice(0, index), ...expandedObjNames.slice(index + 1)]);
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

	return (
		<div className="flex-column explorer">
			<h3>Explorer</h3>
			{renderHeader()}
			<div className="object-list-container">
				<ul className="object-list">{objects.map((obj) => renderObjectListItem(obj))}</ul>
			</div>
		</div>
	);
}
