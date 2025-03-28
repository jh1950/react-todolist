import { useState } from "react";



const setHTMLAttr = (darkmode: boolean) => {
	document.documentElement.setAttribute("mode", darkmode ? "dark" : "light");
};

export default function useDarkmode() {
	const init = localStorage.getItem("darkmode") || window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [darkmode, setDarkmode] = useState(typeof init === "boolean" ? init : init === "true");

	const updateDarkmode = (darkmode?: boolean) => {
		setDarkmode(p => {
			const tmp = darkmode !== undefined ? darkmode : !p;
			localStorage["darkmode"] = tmp;
			setHTMLAttr(tmp);
			return tmp;
		});
	};

	setHTMLAttr(darkmode);

	return [darkmode, updateDarkmode] as [typeof darkmode, typeof updateDarkmode];
};
