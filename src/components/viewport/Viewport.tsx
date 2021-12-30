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
			<div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", margin: "1em 4em" }}>
				{props.objects.map((elem) => (
					<p key={`list-item-${elem.name}`}>• {elem.name}</p>
				))}
			</div>
		</div>
	);
}
