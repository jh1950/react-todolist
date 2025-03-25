import { TodoType } from "../hooks";
import { Button } from "../components";



interface TodoBoxProps extends TodoType {
	remove: () => void;
};

export default function TodoBox({
	label,
	remove,
}: TodoBoxProps) {
	return (
		<article className="bg-(--bd-color)/40 rounded-md shadow-md p-2 flex items-center gap-2">
			<span className="flex-1 break-all">{label}</span>
			<Button className="bg-red-500/90" onClick={remove}>Del</Button>
		</article>
	);
};
