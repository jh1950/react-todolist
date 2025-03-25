import { useRef, useState, useEffect } from "react";
import { FaXmark, FaEllipsisVertical } from "react-icons/fa6";

import { TodoType } from "../hooks";
import { Form } from "../components";



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
	const formRef = useRef<HTMLFormElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const [isMod, setIsMod] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		update(id, e.currentTarget.input.value);
		setIsMod(false);
		closeMenu();
	};

	useEffect(() => {
		if (isMod !== true) return;
		formRef.current?.input.focus();
	}, [isMod]);

	useEffect(() => {
		const handle = (e: MouseEvent) => {
			const menu = menuRef.current;
			if (!menu) return;
			if (menu.contains(e.target as Node)) return;
			setMenuOpen(false);
		};

		window.addEventListener("mousedown", handle);

		return () => {
			window.removeEventListener("mousedown", handle);
		};
	}, [menuOpen]);

	return (
		<article className="relative bg-(--bd-color)/40 rounded-md shadow-md p-2 flex items-center gap-2">
			{
				isMod
				? <Form ref={formRef} className="w-full" onSubmit={submit} defaultValue={label} label="Save"/>
				: <>
					<span className="flex-1 break-all">{label}</span>
					{
						!menuOpen
						? 
							<button id={`menu-button-${id}`} type="button" aria-expanded={menuOpen} aria-haspopup="menu" onClick={() => setMenuOpen(true)}>
								<FaEllipsisVertical/>
							</button>
						:
							<div
								ref={menuRef}
								className={`
									absolute right-1 top-1
									bg-(--bg-color) rounded-md shadow-md
									flex flex-col

									[&_button]:px-4 [&_button]:py-1 [&_button]:rounded-md
									[&_button]:hover:bg-(--bd-color)
								`.replace(/\s+/g, " ").trim()}
								role="menu"
								aria-orientation="vertical"
								aria-labelledby={`menu-button-${id}`}
							>
								<button className="text-(--text-color) flex justify-center" type="button" onClick={closeMenu}><FaXmark/></button>
								<button className="text-(--text-color)" type="button" onClick={() => setIsMod(true)}>Mod</button>
								<button className="text-red-500" type="button" onClick={remove}>Del</button>
							</div>
					}
				</>
			}
		</article>
	);
};
