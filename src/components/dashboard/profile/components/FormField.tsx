import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
    id: string,
    label: string,
    type?: string,
    placeholder?: string,
    className?: string,
    value?: string,
    defaultValue?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    disabled?: boolean
}

const FormField = ({
    id,
    label,
    type = 'text',
    placeholder,
    className = '',
    value,
    defaultValue,
    onChange,
    disabled
}: FormFieldProps) => {
    return (
        <div className={`flex items-center gap-3 border-b border-b-gray-100 px-6 py-4 ${className}`}>
            <Label htmlFor={id} className='min-w-3/12 text-gray-600'>
                {label}
            </Label>

            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                className='bg-gray-50 focus:bg-white'
                disabled={disabled}
            />
        </div>
    );
};

export default FormField;