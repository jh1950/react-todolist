interface ToggleButtonProps extends Omit<React.ComponentPropsWithoutRef<"button">, "children"> {
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
		<button
			className={`
				${className}
				${isPressed == true ? "bg-(--color) border-(--color)" : "bg-(--bd-color) border-transparent"}
				border-1 rounded-full
				h-[1.25em] w-[2.25em]
				px-[.125em]
				transition-[background-color]
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
		</button>
	);
};
