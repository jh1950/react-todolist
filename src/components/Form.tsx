import { useRef, forwardRef } from "react";

import Button from "./Button";
import Input from "./Input";



interface FormProps extends Omit<React.ComponentPropsWithoutRef<"form">, "children"> {
	defaultValue?: string;
	label?: string;
	cancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Form = forwardRef<HTMLFormElement, FormProps>(({
	className="",
	defaultValue,
	label="Add",
	cancel,
	onSubmit,
	...props
}, propsRef) => {
	const formRef = useRef<HTMLFormElement>(null);
	const ref = (propsRef || formRef) as React.RefObject<HTMLFormElement | null>;

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = ref.current;
		const input = form?.input as HTMLInputElement | null;
		const val = input?.value.trim();
		if (!form || !input) return;

		if (!val) {
			input.classList.add("error");
			return;
		}

		if (onSubmit) onSubmit(e);
	};

	return (
		<form ref={ref} className={`${className} flex items-center gap-2`.trim()} onSubmit={submit} {...props}>
			<Input
				name="input"
				className="flex-1 [&.error]:border-theme-red"
				placeholder="New Item..."
				defaultValue={defaultValue}
				onFocus={e => e.currentTarget.classList.remove("error")}
				autoComplete="off"
				size={1}
			/>
			{cancel !== undefined &&
				<Button
					className={`
						btn text-(--text-color)
						border-1 border-(--bd-color)
						bg-(--bd-color) hover:bg-transparent
					`.replace(/\s+/g, " ").trim()}
					onClick={cancel}
					children="Cancel"
				/>
			}
			<Button
				className={`
					btn border-1 text-theme-text-dark
					border-theme-primary hover:border-theme-dark
					bg-theme-primary hover:bg-theme-dark
				`.replace(/\s+/g, " ").trim()}
				type="submit"
				children={label}
			/>
		</form>
	);
});

export default Form;
