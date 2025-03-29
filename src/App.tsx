import { useState } from "react";
import { FaArrowDown19, FaStar, FaRegCircleCheck } from "react-icons/fa6";

import { useDarkmode, useTodoList } from "./hooks";
import { updateLocalStorageState as updateState } from "./common";
import { Header, Section, Form, IconButton, ToggleButton, TodoBox } from "./components";



const getItem = (key: string) => {
	return localStorage.getItem(key);
};

export default function App() {
	const [darkmode, updateDarkmode] = useDarkmode();
	const [todoList, addTodoList, updateTodoList, removeTodoList] = useTodoList();

	const [reverse, setReverse] = useState(getItem("reverse") === "true");
	const [important, setImportant] = useState(getItem("important") === "true");
	const [completed, setCompleted] = useState(getItem("completed") === "true");

	const items = (reverse ? [...todoList].reverse() : todoList)
	.filter(x => important ? x.important : x)
	.filter(x => completed ? x : x.completed !== true)

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		const val = form.input.value.trim() as string;
		if (!val) return;
		addTodoList({label: val});

		form.reset();
	};

	return (<>
		<Header>
			Todo List
			<ToggleButton className="absolute right-4" aria-label="Dark Mode: On/Off" active={darkmode} onClick={() => updateDarkmode()}/>
		</Header>

		<Section className="flex gap-2 items-center">
			<Form className="flex-1" onSubmit={submit}/>
		</Section>

		{todoList.length !== 0 && <Section>
			<div className="border-t-1 border-dashed border-(--bd-color) py-4 flex gap-2 flex-wrap">
				<IconButton
					active={reverse}
					onClick={() => updateState(setReverse, "reverse")}
					title="Sort by Oldest"
					aria-label="Sort by Oldest"
					aria-pressed={reverse}
					children={<FaArrowDown19/>}
				/>
				<IconButton
					active={important}
					onClick={() => updateState(setImportant, "important")}
					title="Show Only Important"
					aria-label="Show Only Important"
					aria-pressed={important}
					children={<FaStar/>}
				/>
				<IconButton
					active={completed}
					onClick={() => updateState(setCompleted, "completed")}
					title="Show all Completed"
					aria-label="Show all Completed"
					aria-pressed={completed}
					children={<FaRegCircleCheck/>}
				/>
			</div>
			<div className="flex flex-col gap-4">
				{items.map(x => <TodoBox key={x.id} update={updateTodoList} remove={removeTodoList} {...x}/>)}
			</div>
		</Section>}
	</>);
};
