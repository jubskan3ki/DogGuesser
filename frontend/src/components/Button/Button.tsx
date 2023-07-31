import './Button.css';

interface ButtonProps {
    onClick?: () => void;
    label: string;
    type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ onClick, label , type}) => (
    <button type={type} className="Button" onClick={onClick}>
        {label}
    </button>
);

export default Button;
