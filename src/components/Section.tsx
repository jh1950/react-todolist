type SectionProps = React.ComponentPropsWithoutRef<"section">;



export default function Section({
	className="",
	...props
}: SectionProps) {
	return (
		<section
			className={`${className} my-4 mx-auto max-w-[550px] px-2`.trim()}
			{...props}
		/>
	);
};
