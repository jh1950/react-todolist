export default function timeToString(timestamp: number, locales?: Intl.LocalesArgument, options: Intl.DateTimeFormatOptions = {}) {
	const lang = locales || document.documentElement.getAttribute("lang") || "en";
	return new Date(timestamp).toLocaleTimeString(lang, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		...options,
	});
};
