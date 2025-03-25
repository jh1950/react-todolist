import Button from "./Button";
import Input from "./Input";



interface FormProps extends Omit<React.ComponentPropsWithoutRef<"form">, "children"> {
	defaultValue?: string;
	label?: string;
};

export default function Form({
	className="",
	defaultValue,
	label="Add",
	...props
}: FormProps) {
	return (
		<form className={`${className} flex items-center gap-2`.trim()} {...props}>
			<Input name="input" defaultValue={defaultValue} className="flex-1" placeholder="New Item..."/>
			<Button className="bg-theme-primary hover:bg-theme-dark text-theme-text-dark" type="submit">{label}</Button>
		</form>
	);
};
