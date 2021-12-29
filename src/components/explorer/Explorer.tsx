import React from "react";
import { Objects, ObjectsAction } from "../../utils/Types";
import "./Explorer.scss";

interface Props {
	objects: Objects;
	objectsDispatch: React.Dispatch<ObjectsAction>;
}

export default function Explorer(props: Props) {



	return (
		<div className="explorer">
			Explorer {props.objects.length}
		</div>
	);
}
