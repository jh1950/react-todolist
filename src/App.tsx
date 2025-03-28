import { useState } from "react";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";

import { useDarkmode, useTodoList } from "./hooks";
import { Header, Section, Form, Button, ToggleButton, TodoBox } from "./components";



export default function App() {
	const [darkmode, updateDarkmode] = useDarkmode();
	const [todoList, addTodoList, updateTodoList, removeTodoList] = useTodoList();
	const [reverse, setReverse] = useState(localStorage.getItem("reverse") === "true");
	const items = reverse ? [...todoList].reverse() : todoList;

	const updateReverse = () => {
		setReverse(p => {
			localStorage["reverse"] = !p;
			return !p;
		});
	};

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
				<Button onClick={updateReverse} role="switch" children={reverse ? <FaArrowUpShortWide/> : <FaArrowDownWideShort/>}/>
				<Form className="flex-1" onSubmit={submit}/>
			</Section>

			{items.length !== 0 && <Section>
				<div className="flex flex-col gap-4 py-4 border-t-1 border-dashed border-(--bd-color)">
					{items.map(x => <TodoBox key={x.id} update={updateTodoList} remove={remove} {...x}/>)}
				</div>
			</Section>}
		</>
	);
};
