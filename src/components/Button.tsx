import { forwardRef } from "react";



export type ButtonProps = React.ComponentPropsWithRef<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    type="button",
	onClick,
	...props
}, ref) => {
	const click = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		if (onClick) onClick(e);
	};

	return (
		<button
			ref={ref}
            type={type}
			onClick={click}
			{...props}
		/>
	);
});

export default Button;
