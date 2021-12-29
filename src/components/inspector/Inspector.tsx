import React from "react";
import { SceneObject2D, SceneObject3D } from "../../utils/SceneObject";
import "./Inspector.scss";

interface Props {
	object: SceneObject2D | SceneObject3D;
	// TODO: Modify object method
}

export default function Inspector(props: Props) {
	return (
		<div className="inspector">
			<h3>Inspector</h3>
			<p>selected object: {props.object.name}</p>
		</div>
	);
}
