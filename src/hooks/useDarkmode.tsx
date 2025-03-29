import { useState, useEffect } from "react";

import { updateLocalStorageState as updateState } from "../common";



export default function useDarkmode() {
	const init = localStorage.getItem("darkmode") || window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [darkmode, setDarkmode] = useState(typeof init === "boolean" ? init : init === "true");

	useEffect(() => {
		document.documentElement.setAttribute("mode", darkmode ? "dark" : "light");
	}, [darkmode]);

	const updateDarkmode = (darkmode?: boolean) => {
		updateState(setDarkmode, "darkmode", darkmode);
	};

	return [darkmode, updateDarkmode] as [typeof darkmode, typeof updateDarkmode];
};
