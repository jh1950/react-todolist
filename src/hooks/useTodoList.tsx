import { useState, useEffect } from "react";



export interface TodoType {
	id: number;
	label?: string;
	important?: boolean;
	completed?: boolean;
};

export interface FullTodoType extends TodoType {
	createdAt: number;
	modifiedAt?: number;
	completedAt?: number;
};



const getTime = () => {
	return new Date().getTime();
};

export default function useTodoList() {
	const init = JSON.parse(localStorage.getItem("todoList") || "[]") as FullTodoType[];
	const [todoList, setTodoList] = useState(init);

	useEffect(() => {
		localStorage.setItem("todoList", JSON.stringify(todoList));
	}, [todoList]);

	const addTodoList = (item: Omit<TodoType, "id">) => {
		setTodoList(prev => [...prev, {
			id: (prev[prev.length-1]?.id || 0) + 1,
			...item,
			createdAt: getTime(),
		}]);
	};

	const updateTodoList = (item: TodoType) => {
		const update: Partial<FullTodoType> = {...item};
		if (item.label) update.modifiedAt = getTime();
		if (item.completed !== undefined) update.completedAt = item.completed ? getTime() : undefined;

		setTodoList(p => p.map(prev => {
			if (prev.id !== item.id) return prev;
			return {
				...prev,
				...item,
				...update,
			};
		}));
	};

	const removeTodoList = (id: number) => {
		setTodoList(prev => prev.filter(x => x.id !== id));
	};

	return [todoList, addTodoList, updateTodoList, removeTodoList] as [typeof todoList, typeof addTodoList, typeof updateTodoList, typeof removeTodoList];
};
