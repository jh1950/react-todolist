import Button, { ButtonProps } from "./Button";



interface ToggleButtonProps extends Omit<ButtonProps, "children"> {
	color?: string;
};



export default function ToggleButton({
	color="var(--color-theme-primary)",
	className="",
	style={},
	"aria-pressed": isPressed = false,
	...props
}: ToggleButtonProps) {
	return (
		<Button
			className={`
				${className}
				${isPressed == true ? "bg-(--color) border-(--color)" : "bg-(--bd-color) border-transparent"}
				border-1 rounded-full
				h-[1.25em] w-[2.25em]
				px-[.125em]
				transition-[background-color]
				hover:[&_span]:bg-(--text-color)
			`.replace(/\s+/g, " ").trim()}
			aria-pressed={isPressed}
			style={{
				"--color": color,
				"--offset": ".125em",
				...style,
			} as React.CSSProperties}
			{...props}
		>
			<span
				className={`
					relative transition-[background-color,left]
					${isPressed ? "left-[calc(100%-1em)]" : "left-0"}
					bg-(--bg-color) rounded-full
					block h-[1em] w-[1em]
				`.replace(/\s+/g, " ").trim()}
			/>
		</Button>
	);
};
