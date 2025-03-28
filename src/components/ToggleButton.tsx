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
				${active == true ? "bg-(--color) border-(--color)" : "bg-(--bd-color) border-transparent"}
				border-1 rounded-full
				h-[1.25em] w-[2.25em]
				px-[.125em]
				transition-[background-color]
				hover:[&_span]:bg-(--text-color)
			`.replace(/\s+/g, " ").trim()}
			style={{
				"--color": color,
				"--offset": ".125em",
				...style,
			} as React.CSSProperties}
			aria-checked={active}
			{...props}
		>
			<span
				className={`
					relative transition-[background-color,left]
					${active ? "left-[calc(100%-1em)]" : "left-0"}
					bg-(--bg-color) rounded-full
					block h-[1em] w-[1em]
				`.replace(/\s+/g, " ").trim()}
			/>
		</Button>
	);
};
