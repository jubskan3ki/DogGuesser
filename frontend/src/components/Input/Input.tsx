import './Input.css';

interface InputProps {
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ type , value, onChange, placeholder }) => (
    <input
        className="Input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
    />
);

export default Input;
