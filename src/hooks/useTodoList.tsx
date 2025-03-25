import { useState } from "react";
import { v4 as uuidv4 } from "uuid";



export interface TodoType {
	id: string;
	label: string;
};



export default function useTodoList(init: string[] = []) {
	const [todoList, setTodoList] = useState<TodoType[]>(init.map(x => ({id: uuidv4(), label: x})));

	const addTodoList = (label: string) => {
		setTodoList(prev => [...prev, {
			id: uuidv4(),
			label: label,
		}]);
	};

	const removeTodoList = (id: string) => {
		setTodoList(prev => prev.filter(x => x.id !== id));
	};

	return [todoList, addTodoList, removeTodoList] as [typeof todoList, typeof addTodoList, typeof removeTodoList];
};
