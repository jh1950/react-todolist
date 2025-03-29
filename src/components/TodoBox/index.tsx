import { useRef, useState, useEffect } from "react";
import { FaStar, FaRegCircleCheck, FaEllipsisVertical } from "react-icons/fa6";

import { TodoType, FullTodoType } from "../../hooks";

import { timeToString } from "../../common";
import { Form, Button, IconButton } from "..";
import Completed from "./Completed";
import Menu from "./Menu";



interface TodoBoxProps extends FullTodoType {
	update: (item: TodoType) => void;
	remove: (id: number) => void;
};

export default function TodoBox({
	id,
	label,
	important=false,
	completed=false,
	createdAt,
	modifiedAt,
	completedAt,
	update,
	remove,
}: TodoBoxProps) {
	const minHeight = "3rem";
	const maxHeight = "10rem";

	const formRef = useRef<HTMLFormElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const btnRef = useRef<HTMLButtonElement>(null);
	const [boxOpen, setBoxOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [editmode, setEditmode] = useState(false);

	const updateEditmode = (value: React.SetStateAction<boolean>) => {
		setEditmode(value);
		setMenuOpen(false);
	};

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		update({id, label: e.currentTarget.input.value.trim()});
		updateEditmode(false);
	};

	useEffect(() => {
		if (editmode !== true) return;
		formRef.current?.input.focus();
	}, [editmode]);

	useEffect(() => {
		if (!menuOpen) return;
		menuRef.current?.focus();
	}, [menuOpen]);

	useEffect(() => {
		const menu = menuRef.current;
		const btn = btnRef.current;

		const close = (node: Node | null) => {
			const menu = menuRef.current;
			const btn = btnRef.current;
			if (!menu || !btn || !node) return;
			if (menu === node || menu.contains(node) || btn === node || btn.contains(node)) return;
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
		<article
			className="relative"
			style={{
				"--box-height": boxOpen ? maxHeight : minHeight,
				"--box-min-height": minHeight,
				"--box-max-height": maxHeight,
			} as React.CSSProperties}
		>
			<div
				className={`
					relative
					overflow-hidden
					p-2 shadow-md
					bg-(--bd-color)/50 rounded-md
					h-(--box-height)
					border-1
					transition-[height,box-shadow,border-color]
					${important ? "border-theme-primary/75" : "border-(--bd-color)/25"}
				`.replace(/\s+/g, " ").trim()}
			>
				<Completed
					active={completed}
					className={`
						absolute
						top-0 left-0
						h-full w-full
					`.replace(/\s+/g, " ").trim()}
				/>
				<Button
					className={`
						absolute top-0 left-0
						h-(--box-min-height) w-full
						text-(--text-color) overflow-hidden
						border-b-1 border-dashed
						transition-[border]
						${boxOpen ? "border-(--bd-color)" : "border-transparent"}
					`.replace(/\s+/g, " ").trim()}
					onClick={() => setBoxOpen(p => !p)}
					aria-label={`${boxOpen ? "Hide" : "Show"} Details`}
					aria-expanded={boxOpen}
					aria-controls={`details-${id}`}
				/>
				<IconButton
					color="var(--bg-color)"
					active={important}
					className={`
						absolute top-[calc((var(--box-min-height)-1em)/2)] left-2
					`.replace(/\s+/g, " ").trim()}
					onClick={() => update({id, important: !important})}
					aria-label={`${important ? "Unmark" : "Mark"} as Important`}
					aria-pressed={important}
					children={<FaStar/>}
				/>
				<IconButton
					active={completed}
					className={`
						absolute top-[calc((var(--box-min-height)-1em)/2)] left-8
						transition-[opacity] ${boxOpen ? "opacity-100" : "opacity-0"}
					`.replace(/\s+/g, " ").trim()}
					onClick={() => update({id, completed: !completed})}
					aria-label={`${important ? "Unmark" : "Mark"} as Completed`}
					aria-pressed={important}
					aria-hidden={boxOpen}
					tabIndex={boxOpen ? 0 : -1}
					children={<FaRegCircleCheck/>}
				/>
				<IconButton
					ref={btnRef}
					color="var(--text-color)"
					className={`
						absolute right-2
						top-[calc((var(--box-min-height)-1em)/2)]
						${!boxOpen && editmode ? "opacity-0 -z-1" : "opacity-100 z-1"}
					`.replace(/\s+/g, " ").trim()}
					onClick={() => setMenuOpen(p => !p)}
					aria-label={`${menuOpen ? "Close" : "Open"} Menu`}
					aria-expanded={menuOpen}
					aria-haspopup="menu"
					aria-controls={`menu-${id}`}
					aria-hidden={!boxOpen && editmode}
					tabIndex={!boxOpen && editmode ? -1 : 0}
					children={<FaEllipsisVertical/>}
				/>

				<div
					className={`
						relative
						transition-[top,left,width]
						${boxOpen ? "top-(--box-min-height)" : "top-[4px]"}
						${boxOpen ? "left-0" : "left-[24px]"}
						${boxOpen ? "w-full" : "w-[calc(100%-24px)]"}
					`.replace(/\s+/g, " ").trim()}
				>
					{
						!editmode
						? <span
							className={`
								w-full
								text-left text-(--text-color)
								block overflow-hidden overflow-ellipsis
								transition-[padding-right]
								${boxOpen ? "pr-0" : "pr-[16px] cursor-pointer"}
							`.replace(/\s+/g, " ").trim()}
							onClick={boxOpen ? undefined : () => setBoxOpen(p => !p)}
							children={label}
						/>
						: <Form
							ref={formRef}
							className="relative -top-[3px]"
							defaultValue={label}
							label="Save"
							cancel={() => setEditmode(false)} onSubmit={submit}
						/>
					}
				</div>

				<div
					className={`
						absolute top-[calc(var(--box-min-height)*2-.5rem)]
						flex flex-col
						text-(--text-color)/50
						text-sm
					`.replace(/\s+/g, " ").trim()}
				>
					<span>Created at: {timeToString(createdAt)}</span>
					<span>Modified at: {modifiedAt ? timeToString(modifiedAt) : "-"}</span>
					<span>Completed at: {completedAt ? timeToString(completedAt) : "-"}</span>
				</div>
			</div>

			<Menu ref={menuRef} active={menuOpen} id={`menu-${id}`} className="absolute top-2 right-6 z-1 bg-(--bg-color) rounded-md shadow-md">
				<Button
					role="menuitem"
					className="btn text-(--text-color)"
					onClick={() => updateEditmode(true)}
					disabled={editmode}
					aria-pressed={editmode}
					children="Edit"
				/>
				<Button
					role="menuitem"
					className="btn text-theme-red"
					onClick={() => remove(id)}
					children="Delete"
				/>
			</Menu>
		</article>
	);
};
