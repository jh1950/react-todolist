type ButtonProps = React.ComponentPropsWithoutRef<"button">;



export default function Section({
	className="",
    type="button",
	...props
}: ButtonProps) {
	return (
		<button
			className={`${className} px-2.5 py-0.75 rounded-md text-theme-text-dark font-semibold`.trim()}
            type={type}
			{...props}
		/>
	);
};
