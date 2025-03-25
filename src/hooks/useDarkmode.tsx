import { useState } from "react";



export default function useDarkmode() {
	const [darkmode, setDarkmode] = useState(localStorage.getItem("darkmode") === "true");

	const applyDarkmode = (darkmode: boolean) => {
		document.documentElement.setAttribute("mode", darkmode ? "dark" : "light");
		localStorage["darkmode"] = darkmode;
	};

	const updateDarkmode = (darkmode?: boolean) => {
		setDarkmode(p => {
			const tmp = darkmode !== undefined ? darkmode : !p;
			applyDarkmode(tmp);
			return tmp;
		});
	};

	applyDarkmode(darkmode);

	return [darkmode, updateDarkmode] as [typeof darkmode, typeof updateDarkmode];
};
