import { FaCheck } from "react-icons/fa6";

import { InputProps } from "./Input";



export default function CheckBox({
	label,
	active=false,
	className="",
	...props
}: {
	label: string;
	active?: boolean;
} & InputProps) {
	return (
		<label
			className={`
				${className}
				inline-flex items-center gap-1
				cursor-pointer
			`.replace(/\s+/g, " ").trim()}
		>
			<input
				type="checkbox"
				className={`
					appearance-none transition
					relative w-4 h-4 rounded-sm border-1
					border-(--bd-color) bg-transparent
					hover:border-theme-primary hover:bg-transparent
					checked:border-theme-primary checked:bg-theme-primary
					checked:hover:border-theme-dark checked:hover:bg-theme-dark
				`.replace(/\s+/g, " ").trim()}
				checked={active}
				aria-checked={active}
				{...props}
			/>
			<FaCheck className={`absolute p-0.5 transition-[color] ${active ? "text-(--bg-color)" : "text-transparent"}`}/>
			{label}
		</label>
	);
};
