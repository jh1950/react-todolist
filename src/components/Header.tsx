import Section from "./Section";



type HeaderProps = React.ComponentPropsWithoutRef<"header">;



export default function Header({
	className="",
	...props
}: HeaderProps) {
	return (
		<Section
			as="header"
			className={`
				${className}
				mb-8 text-center
				text-lg font-semibold
			`.replace(/\s+/g, " ").trim()}
			{...props}
		/>
	);
};
