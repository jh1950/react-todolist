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
			className={`
				${className}
				relative px-3
				my-4 mx-auto
				max-w-[550px]
			`.replace(/\s+/g, " ").trim()}
			{...props}
		/>
	);
};
