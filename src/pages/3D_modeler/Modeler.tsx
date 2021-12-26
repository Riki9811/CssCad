import React, { useEffect, useState } from "react";
import { Color } from "../../interfaces/Colors";
import { SceneObject2D, SceneObject3D } from "../../interfaces/SceneObject";
import { Vector3 } from "../../interfaces/Vectors";
import "./Modeler.scss";

export default function Modeler() {
	const [objects, setObjects] = useState<Array<SceneObject2D | SceneObject3D>>([]);

    useEffect(() => {
        addObj(20)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function addObj(n: number) {
        let newObjs: Array<SceneObject2D | SceneObject3D> = [];

        for (let i = 0; i < n; i++) {
            let newObj: SceneObject2D = {
				name: `Obj_${objects.length + i}`,
				width: 20,
				height: 10,
				position: Vector3.Random(),
				rotation: Vector3.Random(),
				color: Color.Random(),
            };
            newObjs.push(newObj);
        }
		
		setObjects([...objects, ...newObjs]);
	}

	return (
		<div>
			Prova
			<button onClick={() => addObj(1)}>Add +</button>
			<ul>
                {objects.map((elem: SceneObject2D | SceneObject3D) => {
                    let contrastingCol = elem.color.toContrastingBlackWhite();
					let str = `${elem.name}, POS${elem.position}, ROT${elem.rotation}`;
					let styleBg = elem.color.toString();
                    let styleColor = contrastingCol.toString();
					return (
						<li key={elem.name} style={{ backgroundColor: styleBg, marginBottom: ".2em" }}>
							<p style={{ color: styleColor, paddingBlock: ".3em" }}>{str}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
