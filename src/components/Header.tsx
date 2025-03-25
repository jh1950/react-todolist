type HeaderProps = React.ComponentPropsWithoutRef<"header">;



export default function Header({
	className="",
	...props
}: HeaderProps) {
	return (
		<header
			className={`${className} relative text-center text-lg font-semibold px-2 py-4`.trim()}
			{...props}
		/>
	);
};
