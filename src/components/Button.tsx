type ButtonProps = React.ComponentPropsWithoutRef<"button">;



export default function Section({
	className="",
    type="button",
	...props
}: ButtonProps) {
	return (
		<button
			className={`${className} px-3 py-1 rounded-md text-theme-text-dark font-semibold`.trim()}
            type={type}
			{...props}
		/>
	);
};
