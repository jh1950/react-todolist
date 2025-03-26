import { useState, useEffect } from "react";



export interface TodoType {
	id: number;
	label: string;
};



export default function useTodoList() {
	const init = JSON.parse(localStorage.getItem("todoList") || "[]") as TodoType[];
	const [todoList, setTodoList] = useState<TodoType[]>(init);

	useEffect(() => {
		localStorage.setItem("todoList", JSON.stringify(todoList));
	}, [todoList]);

	const addTodoList = (label: string) => {
		setTodoList(prev => [...prev, {
			id: (prev[prev.length-1]?.id || 0) + 1,
			label: label,
		}]);
	};

	const updateTodoList = (id: number, label: string) => {
		setTodoList(prev => prev.map(x => x.id === id ? { ...x, label } : x));
	};

	const removeTodoList = (id: number) => {
		setTodoList(prev => prev.filter(x => x.id !== id));
	};

	return [todoList, addTodoList, updateTodoList, removeTodoList] as [typeof todoList, typeof addTodoList, typeof updateTodoList, typeof removeTodoList];
};
