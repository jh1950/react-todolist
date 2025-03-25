import { useState } from "react";
import { FaArrowDownWideShort, FaArrowUpShortWide } from "react-icons/fa6";

import { Header, Section, Input, Button } from "./components";



export default function App() {
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
		console.log( val );

		e.currentTarget.reset();
	};

	return (
		<>
			<Header>Todo List</Header>

			<Section>
				<form className="flex items-center gap-2" onSubmit={submit}>
					<label role="switch">
						{reverse ? <FaArrowUpShortWide/> : <FaArrowDownWideShort/>}
						<Button onClick={updateReverse} hidden/>
					</label>
					<Input name="input" className="flex-1" placeholder="New Item..."/>
					<Button className="bg-theme-primary" type="submit">Add</Button>
				</form>
			</Section>
		</>
	);
};
