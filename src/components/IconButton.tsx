import { Button, ButtonProps } from ".";



export default function IconButton({
	color="var(--bd-color)",
	active=false,
	className="",
	style={},
	...props
}: {
	color?: string;
	active?: boolean;
} & ButtonProps) {
	return (
		<Button
			className={`
				${className}
				${active ? "text-theme-primary" : "text-(--color)"}
				${active ? "hover:text-theme-dark" : "hover:text-theme-primary"}
			`.replace(/\s+/g, " ").trim()}
			style={{
				"--color": color,
				...style,
			} as React.CSSProperties}
			{...props}
		/>
	);
};
