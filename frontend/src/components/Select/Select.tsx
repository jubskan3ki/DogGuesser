import './Select.css';

interface OptionType {
    value: string;
    label: string;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: OptionType[];
}

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => (
    <select className="Select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

export default Select;
