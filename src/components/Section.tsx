interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
	as?: React.ElementType;
};



export default function Section({
	as,
	className="",
	...props
}: SectionProps) {
	const Elem = as || "section";

	return (
		<Elem
			className={`${className} relative my-4 mx-auto max-w-[550px] px-3`.trim()}
			{...props}
		/>
	);
};
