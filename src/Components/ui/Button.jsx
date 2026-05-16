    const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false }) => {

        const base = "px-4 py-2 rounded font-medium transition-all duration-200 cursor-pointer disabled:opacity-50"


        return (
            <button type={type} onClick={onClick} disabled={disabled} className={`${base} 
            ${variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
            ${variant === "secondary" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : ""}`}> {children}</button>

        );
    };

    export default Button