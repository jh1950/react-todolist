import { useState } from "react";

import { useDarkmode, useTodoList } from "./hooks";
import { Header, Section, Form, CheckBox, ToggleButton, TodoBox } from "./components";



const getItem = (key: string) => {
	return localStorage.getItem(key);
};

const updateState = (setState: (value: React.SetStateAction<boolean>) => void, key: string, val?: boolean) => {
	setState(p => {
		const v = val !== undefined ? val : !p;
		localStorage[key] = v;
		return v;
	});
};

export default function App() {
	const [darkmode, updateDarkmode] = useDarkmode();
	const [todoList, addTodoList, updateTodoList, removeTodoList] = useTodoList();

	const [latest, setLatest] = useState(getItem("latest") !== "false");
	const [important, setImportant] = useState(getItem("important") === "true");
	const [completed, setCompleted] = useState(getItem("completed") !== "false");

	const items = (latest ? [...todoList].reverse() : todoList)
	.filter(x => important ? x.important : x)
	.filter(x => completed ? x : x.completed !== true)

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const val = e.currentTarget.input.value.trim() as string;
		if (!val) return;
		addTodoList({label: val});

		e.currentTarget.reset();
	};

	const remove = (id: number) => {
		removeTodoList(id);
	};

	return (
		<>
			<Header>
				Todo List
				<ToggleButton className="absolute right-4" aria-pressed={darkmode} onClick={() => updateDarkmode()}/>
			</Header>

			<Section className="flex gap-2 items-center">
				<Form className="flex-1" onSubmit={submit}/>
			</Section>

			{todoList.length !== 0 && <Section>
				<div className="border-t-1 border-dashed border-(--bd-color) py-4 flex gap-x-3 gap-y-2 flex-wrap">
					<CheckBox label="Sort by Latest" checked={latest} onChange={() => updateState(setLatest, "latest")}/>
					<CheckBox label="Important" checked={important} onChange={() => updateState(setImportant, "important")}/>
					<CheckBox label="Completed" checked={completed} onChange={() => updateState(setCompleted, "completed")}/>
				</div>
				<div className="flex flex-col gap-4">
					{items.map(x => <TodoBox key={x.id} update={updateTodoList} remove={remove} {...x}/>)}
				</div>
			</Section>}
		</>
	);
};
