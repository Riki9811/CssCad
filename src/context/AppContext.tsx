import React, { useEffect, useState } from "react";

type Context = {
	theme: "dark" | "light" | undefined;
	setTheme: (value: "dark" | "light") => void;
};

export const AppContext = React.createContext<Context | undefined>(undefined);

export default function ContextProvider(props: any): JSX.Element {
	const [theme, setTheme] = useState<"dark" | "light" | undefined>();

	useEffect(() => {
		const storageUserPref = localStorage.getItem("user-theme-preference");
		if (storageUserPref) {
			setTheme(storageUserPref === "dark" ? "dark" : "light");
		} else {
			const userPrefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
			setTheme(userPrefersLight ? "light" : "dark");
		}
	}, []);

	useEffect(() => {
		if (theme === "light") {
			onToggleThemes([
				"var(--clr-light-400)",
				"var(--clr-light-300)",
				"var(--clr-light-500)",
				"var(--clr-dark-300)",
				"var(--clr-dark-600)",
				"var(--clr-dark-600)",
				"var(--clr-blue-400)",
			]);
			localStorage.setItem("user-theme-preference", "light");
		} else if (theme === "dark") {
			onToggleThemes([
				"var(--clr-dark-400)",
				"var(--clr-dark-300)",
				"var(--clr-dark-500)",
				"var(--clr-light-600)",
				"var(--clr-light-300)",
				"var(--clr-light-600)",
				"var(--clr-blue-400)",
			]);
			localStorage.setItem("user-theme-preference", "dark");
		}
	}, [theme]);

	function onToggleThemes(newVariables: string[]) {
		const root = document.documentElement;
		root.style.setProperty("--clr-bg", newVariables[0]);
		root.style.setProperty("--clr-bg-lighter", newVariables[1]);
		root.style.setProperty("--clr-bg-darker", newVariables[2]);
		root.style.setProperty("--clr-text", newVariables[3]);
		root.style.setProperty("--clr-text-main", newVariables[4]);
		root.style.setProperty("--clr-link", newVariables[5]);
		root.style.setProperty("--clr-link-highlighted", newVariables[6]);
	}

	return <AppContext.Provider value={{ theme, setTheme }}>{props.children}</AppContext.Provider>;
}
