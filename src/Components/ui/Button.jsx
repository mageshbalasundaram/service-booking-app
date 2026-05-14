const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false }) => {

    const base = "px-4 py-2 rounded font-medium transition-all duration-200 cursor-pointer disabled:opacity-50"

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]}`}> {children}</button>

    );
};

export default Button