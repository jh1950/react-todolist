type InputProps = React.ComponentPropsWithoutRef<"input">;



export default function Input({
	className="",
	autoComplete="off",
	...props
}: InputProps) {
	return (
		<input
			className={`${className} outline-0 transition border-b-1 focus:border-theme-primary placeholder-(--text-color)/50`.trim()}
			autoComplete={autoComplete}
			{...props}
		/>
	);
};
