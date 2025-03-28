import { InputProps } from "./Input";



export default function CheckBox({
	label,
	className,
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
					appearance-none relative
					border-1 border-(--bd-color)
					w-4 h-4 rounded-sm font-bold
					flex justify-center items-center
					hover:border-theme-primary checked:hover:bg-theme-dark
					checked:bg-theme-primary checked:border-theme-primary
					checked:before:absolute checked:before:content-["\\2713"]
				`.replace(/\s+/g, " ").trim()}
				checked={checked}
				aria-checked={ariaChecked !== undefined ? ariaChecked : checked}
				{...props}
			/>
			{label}
		</label>
	);
};
