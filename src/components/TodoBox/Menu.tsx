import { forwardRef } from "react";



interface MenuProps extends React.ComponentPropsWithoutRef<"div"> {
	active?: boolean;
};



const Menu = forwardRef<HTMLDivElement, MenuProps>(({
	active=false,
	className="",
	role="menu",
	hidden,
	"aria-hidden": ariaHidden,
	...props
}, ref) => {
	return (
		<div
			ref={ref}
			className={`
				${className}
				flex flex-col
				[&_button]:px-4 [&_button]:py-1
				[&_button]:hover:bg-(--bd-color)
			`.replace(/\s+/g, " ").trim()}
			role={role}
			hidden={hidden !== undefined ? hidden : active}
			aria-hidden={ariaHidden !== undefined ? ariaHidden : active}
			{...props}
		/>
	);
});

export default Menu;
