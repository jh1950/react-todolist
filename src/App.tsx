import { useState } from "react";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";

import { useDarkmode, useTodoList } from "./hooks";
import { Header, Section, Input, Button, ToggleButton, TodoBox } from "./components";



export default function App() {
	const [darkmode, updateDarkmode] = useDarkmode();
	const [todoList, addTodoList, removeTodoList] = useTodoList();
	const [reverse, setReverse] = useState(localStorage.getItem("reverse") === "true");

	const updateReverse = () => {
		setReverse(p => {
			localStorage["reverse"] = !p;
			return !p;
		});
	};

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const val = e.currentTarget.input.value.trim();
		if (!val) return;
		addTodoList(val);

		e.currentTarget.reset();
	};

	return (
		<>
			<Header>
				Todo List
				<ToggleButton className="absolute right-4" aria-pressed={darkmode} onClick={() => updateDarkmode()}/>
			</Header>

			<Section>
				<form className="flex items-center gap-2" onSubmit={submit}>
					<button type="button" onClick={updateReverse} role="switch">{reverse ? <FaArrowUpShortWide/> : <FaArrowDownWideShort/>}</button>
					<Input name="input" className="flex-1" placeholder="New Item..."/>
					<Button className="bg-theme-primary hover:bg-theme-dark" type="submit">Add</Button>
				</form>
			</Section>

			{todoList.length !== 0 && <Section>
				<div className={`flex ${reverse ? "flex-col-reverse" : "flex-col"} gap-4 py-4 border-t-1 border-dashed border-(--bd-color)`}>
					{todoList.map(x => <TodoBox key={x.id} remove={() => removeTodoList(x.id)} {...x}/>)}
				</div>
			</Section>}
		</>
	);
};
