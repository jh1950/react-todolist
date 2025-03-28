export type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "children">;



export default function Input({
	className="",
	onClick,
	...props
}: InputProps) {
	const click = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		e.stopPropagation();
		if (onClick) onClick(e);
	};

	return (
		<input
			className={`
				${className}
				outline-0 transition
				border-b-1 focus:border-theme-primary
				placeholder-(--text-color)/50
			`.replace(/\s+/g, " ").trim()}
			onClick={click}
			{...props}
		/>
	);
};
