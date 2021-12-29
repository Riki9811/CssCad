import React from "react";
import { Objects } from "../../utils/Types";
import "./Viewport.scss";

interface Props {
	objects: Objects;
}

export default function Viewport(props: Props) {
	return (
		<div className="viewport">
			<h3>Viewport</h3>
			<p>Objects to render:</p>
			<ul>
				{props.objects.map((elem) => (
					<li key={`list-item-${elem.name}`}>{elem.name}</li>
				))}
			</ul>
		</div>
	);
}
