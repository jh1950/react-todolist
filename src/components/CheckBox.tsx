import { FaCheck } from "react-icons/fa6";

import { InputProps } from "./Input";



export default function CheckBox({
	label,
	className="",
	checked,
	"aria-checked": ariaChecked,
	...props
}: {
	label: string;
} & InputProps) {
	return (
		<label
			className={`
				${className}
				inline-flex items-center gap-1
			`.replace(/\s+/g, " ").trim()}
		>
			<input
				type="checkbox"
				className={`
					appearance-none transition
					relative w-4 h-4 rounded-sm
					border-1 border-(--bd-color)
					hover:border-theme-primary checked:bg-theme-primary
					checked:border-theme-primary checked:hover:bg-theme-dark
				`.replace(/\s+/g, " ").trim()}
				checked={checked}
				aria-checked={ariaChecked !== undefined ? ariaChecked : checked}
				{...props}
			/>
			<FaCheck className={`absolute p-0.5 transition-[color] ${checked ? "text-(--bg-color)" : "text-transparent"}`}/>
			{label}
		</label>
	);
};
