import { useRef, useState, useEffect } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

import { TodoType } from "../hooks";
import { Form, Button } from "../components";



interface TodoBoxProps extends TodoType {
	update: (id: number, label: string) => void;
	remove: (id: number) => void;
};

export default function TodoBox({
	id,
	label,
	update,
	remove,
}: TodoBoxProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const btnRef = useRef<HTMLButtonElement>(null);
	const [isMod, setIsMod] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		update(id, e.currentTarget.input.value);
		setIsMod(false);
		btnRef.current?.focus();
	};

	useEffect(() => {
		if (isMod !== true) return;
		formRef.current?.input.focus();
	}, [isMod]);

	useEffect(() => {
		const menu = menuRef.current;
		const btn = btnRef.current;

		const close = (node: Node | null) => {
			const menu = menuRef.current;
			const btn = btnRef.current;
			if (!menu || !btn) return;
			if (menu.contains(node) || btn.contains(node)) return;
			setMenuOpen(false);
		};

		const handleMouse = (e: MouseEvent) => {
			close(e.target as Node);
		};

		const handleBlur = (e: FocusEvent) => {
			close(e.relatedTarget as Node | null);
		};

		window.addEventListener("mousedown", handleMouse);
		menu?.addEventListener("focusout", handleBlur);
		btn?.addEventListener("blur", handleBlur);

		return () => {
			window.removeEventListener("mousedown", handleMouse);
			menu?.removeEventListener("focusout", handleBlur);
			btn?.removeEventListener("blur", handleBlur);
		};
	}, []);

	return (
		<article className="bg-(--bd-color)/40 rounded-md shadow-md p-2">
			<div className="relative flex items-center gap-2" aria-hidden={isMod} hidden={isMod}>
				<span className="flex-1 break-all">{label}</span>
				<button ref={btnRef} id={`menu-button-${id}`} type="button" aria-expanded={menuOpen} aria-haspopup="menu" onClick={() => setMenuOpen(p => !p)}>
					<FaEllipsisVertical/>
				</button>
				<div
					ref={menuRef}
					className={`
						${menuOpen ? "" : "hidden"}
						absolute right-4 top-1
						bg-(--bg-color) rounded-md shadow-md
						flex flex-col

						[&_button]:px-4 [&_button]:py-1
						[&_button]:hover:bg-(--bd-color)
					`.replace(/\s+/g, " ").trim()}
					role="menu"
					aria-orientation="vertical"
					aria-labelledby={`menu-button-${id}`}
					tabIndex={-1}
				>
					<Button role="menuitem" className="text-(--text-color)" onClick={() => setIsMod(true)}>Modify</Button>
					<Button role="menuitem" className="text-red-500" onClick={() => remove(id)}>Delete</Button>
				</div>
			</div>
			{isMod &&
				<Form ref={formRef} className="w-full" onSubmit={submit} defaultValue={label} label="Save"/>
			}
		</article>
	);
};
