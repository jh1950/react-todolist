import { FaCertificate, FaCheck } from "react-icons/fa6";



export default function Completed({
	active=false,
	className="",
	...props
}: {
	active?: boolean;
} & React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={`
				${className}
				inline-flex justify-center items-center gap-1
				text-lg font-semibold italic -rotate-5
				transition-[opacity] ${active ? "opacity-5" : "opacity-0"}
				after:content-["Completed!"]
			`.replace(/\s+/g, " ").trim()}
			aria-hidden={!active}
			{...props}
		>
			<div className="relative">
				<FaCertificate/>
				<FaCheck className="text-(--bg-color) absolute top-[25%] left-[25%] h-[50%] w-[50%]"/>
			</div>
		</div>
	);
};
