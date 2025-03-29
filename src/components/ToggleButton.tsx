import Button, { ButtonProps } from "./Button";



interface ToggleButtonProps extends Omit<ButtonProps, "children"> {
	active?: boolean;
	color?: string;
};



export default function ToggleButton({
	active=false,
	color="var(--color-theme-primary)",
	className="",
	style={},
	role="switch",
	...props
}: ToggleButtonProps) {
	return (
		<Button
			role={role}
			className={`
				${className}
				border-1 rounded-full
				px-[.125em] h-[1.25em] w-[2.25em]
				${active == true ? "bg-(--color)" : "bg-(--bd-color)"}
				${active == true ? "border-(--color)" : "border-transparent"}
				transition-[background-color]
				hover:[&_span]:bg-(--text-color)
			`.replace(/\s+/g, " ").trim()}
			style={{
				"--color": color,
				...style,
			} as React.CSSProperties}
			aria-checked={active}
			{...props}
		>
			<span
				className={`
					relative block h-[1em] w-[1em]
					bg-(--bg-color) rounded-full
					transition-[background-color,left]
					${active ? "left-[calc(100%-1em)]" : "left-0"}
				`.replace(/\s+/g, " ").trim()}
			/>
		</Button>
	);
};
