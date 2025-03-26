type ButtonProps = React.ComponentPropsWithoutRef<"button">;



export default function Button({
	className="",
    type="button",
	onClick,
	...props
}: ButtonProps) {
	const click = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		if (onClick) onClick(e);
	};

	return (
		<button
			className={`${className} px-2.5 py-0.75 rounded-md font-semibold`.trim()}
            type={type}
			onClick={click}
			{...props}
		/>
	);
};
