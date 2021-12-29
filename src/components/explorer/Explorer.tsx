import React from "react";
import { SceneObject2D, SceneObject3D } from "../../utils/SceneObject";
import { Objects, ObjectsAction } from "../../utils/Types";
import "./Explorer.scss";

interface Props {
	objects: Objects;
	objectsDispatch: React.Dispatch<ObjectsAction>;
	selected: number;
	select: (n: number) => void;
}

export default function Explorer(props: Props) {
	const { objects, objectsDispatch, selected, select } = props;

	function renderHeader(): JSX.Element {
		return (
			<div className="flex-row align-center justify-space-between">
				<p>
					{objects.length} object{objects.length !== 1 ? "s" : ""} in total
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

	function renderObjectListItem(obj: SceneObject2D | SceneObject3D, index: number): JSX.Element {
		if (index === selected) {
			return (
				<li
					key={`list-item-${obj.name}`}
					className="object-list-item object-list-item-selected"
					onClick={() => {
						select(index);
					}}
				>
					{obj.name}
				</li>
			);
		}
		return (
			<li
				key={`list-item-${obj.name}`}
				className="object-list-item"
				onClick={() => {
					select(index);
				}}
			>
				{obj.name}
			</li>
		);
	}

	return (
		<div className="explorer">
			<h3>Explorer</h3>
			{renderHeader()}
			<ul className="object-list">{objects.map((obj, index) => renderObjectListItem(obj, index))}</ul>
		</div>
	);
}
