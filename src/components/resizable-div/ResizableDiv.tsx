import React, { useCallback, useEffect, useState } from "react";
import "./ResizableDiv.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	resizeFrom: "left" | "right";
}

export default function ResizableDiv(props: Props) {
	let { children, resizeFrom, className, ...divProps } = props;

	const [dragging, setDragging] = useState<boolean>(false);
	const [startX, setStartX] = useState<number>(-1);
	const [startW, setStartW] = useState<number>(-1);
	const [element, setElement] = useState<HTMLElement>();

	const doDrag = useCallback(
		(evt: MouseEvent) => {
            if (element && startX && startW) {
                if (resizeFrom === "left") element.style.width = startW + startX - evt.clientX + "px";
                else element.style.width = startW + evt.clientX - startX + "px";
			}
		},
		[startW, startX, element, resizeFrom]
	);

	useEffect(() => {
		if (dragging) {
			window.addEventListener("mousemove", doDrag);
		} else {
			window.removeEventListener("mousemove", doDrag);
		}
	}, [dragging, doDrag]);

	function startDrag(evt: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		var parent = evt.currentTarget.parentElement;
		if (!parent) return;
		if (!document.defaultView) return;

		if (!element) setElement(parent);
		setStartX(evt.clientX);
		setStartW(parseInt(document.defaultView.getComputedStyle(parent).width));
		setDragging(true);
        window.addEventListener("mouseup", endDrag);
	}

	function endDrag(): void {
		setDragging(false);
	}

	return (
		<div {...divProps} className={`resizable-div${className ? ` ${className}` : ""}`}>
			{children}
			<div className={`resizer ${resizeFrom}-resizer`} onMouseDown={startDrag} />
		</div>
	);
}
