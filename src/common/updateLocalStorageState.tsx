export default function updateLocalStorageState(setState: (value: React.SetStateAction<boolean>) => void, key: string, val?: boolean) {
	setState(p => {
		const v = val !== undefined ? val : !p;
		localStorage[key] = v;
		return v;
	});
};
