import Section from "./Section";



type HeaderProps = React.ComponentPropsWithoutRef<"header">;



export default function Header({
	className="",
	...props
}: HeaderProps) {
	return (
		<Section
			as="header"
			className={`${className} relative text-center text-lg font-semibold mb-8`.trim()}
			{...props}
		/>
	);
};
