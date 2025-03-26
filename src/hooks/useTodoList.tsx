import { useState, useEffect } from "react";



export interface TodoType {
	id: number;
	label?: string;
	important?: boolean;
};



export default function useTodoList() {
	const init = JSON.parse(localStorage.getItem("todoList") || "[]") as TodoType[];
	const [todoList, setTodoList] = useState(init);

	useEffect(() => {
		localStorage.setItem("todoList", JSON.stringify(todoList));
	}, [todoList]);

	const addTodoList = (item: Omit<TodoType, "id">) => {
		setTodoList(prev => [...prev, {
			id: (prev[prev.length-1]?.id || 0) + 1,
			...item,
		}]);
	};

	const updateTodoList = (item: TodoType) => {
		setTodoList(p => p.map(prev => {
			if (prev.id !== item.id) return prev;
			return {
				...prev,
				...item,
			};
		}));
	};

	const removeTodoList = (id: number) => {
		setTodoList(prev => prev.filter(x => x.id !== id));
	};

	return [todoList, addTodoList, updateTodoList, removeTodoList] as [typeof todoList, typeof addTodoList, typeof updateTodoList, typeof removeTodoList];
};
