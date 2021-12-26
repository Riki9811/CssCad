import React from "react";
import { useNavigate } from "react-router";
import "./PageNotFound.scss";

export default function PageNotFound(): JSX.Element {
	const navigate = useNavigate();

	return (
		<div>
			<div className="full-screen center-content error-404-container">
				<h1>That's a problem!</h1>
				<p>We can't seem to find the page you asked for.</p>
				<p>
					Are you sure that the URL <code className="bold">'{window.location.pathname}'</code> is correct?
				</p>
				<code className="bold">Error code: 404</code>
				<br />
				<button className="go-back-btn" onClick={() => navigate(-1)}>
					Go back
				</button>
			</div>
		</div>
	);
}
