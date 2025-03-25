import { useState } from "react";

import { TodoType } from "../hooks";
import { Form, Button } from "../components";



interface TodoBoxProps extends TodoType {
	update: (id: string, label: string) => void;
	remove: () => void;
};

export default function TodoBox({
	id,
	label,
	update,
	remove,
}: TodoBoxProps) {
	const [isMod, setIsMod] = useState(false);

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		update(id, e.currentTarget.input.value);
		setIsMod(false);
	};

	return (
		<article className="bg-(--bd-color)/40 rounded-md shadow-md p-2 flex items-center gap-2">
			{
				isMod
				? <Form className="w-full" onSubmit={submit} defaultValue={label} label="Save"/>
				: <>
					<span className="flex-1 break-all">{label}</span>
					<Button className="bg-(--bd-color)" onClick={() => setIsMod(true)}>Mod</Button>
					<Button className="bg-red-500/90" onClick={remove}>Del</Button>
				</>
			}
		</article>
	);
};
