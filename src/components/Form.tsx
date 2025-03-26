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
			<Input name="input" defaultValue={defaultValue} className="flex-1 [&.error]:border-theme-red" placeholder="New Item..." onFocus={e => e.currentTarget.classList.remove("error")}/>
			{cancel !== undefined && <Button className="btn border-1 border-(--bd-color) bg-(--bd-color) hover:bg-transparent text-(--text-color)" onClick={cancel}>Cancel</Button>}
			<Button className="btn border-1 border-theme-primary hover:border-theme-dark bg-theme-primary hover:bg-theme-dark text-theme-text-dark" type="submit">{label}</Button>
		</form>
	);
});

export default Form;
