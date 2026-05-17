import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';

const UserForm = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const FormField = ({
        id,
        label,
        type = 'text',
        placeholder,
        className = '',
    }: {
        id: string,
        label: string,
        type?: string,
        placeholder?: string,
        className?: string
    }) => {
        return (
            <div className={`flex items-center gap-3 border-b border-b-gray-100 px-6 py-4 ${className}`}>
                <Label htmlFor={id} className='min-w-3/12 text-gray-600'>
                    {label}
                </Label>

                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className='bg-gray-50 focus:bg-white'
                    disabled={!isEditMode}
                />
            </div>
        );
    };

    const SelectField = ({
        id,
        label,
        placeholder,
        options,
        className = '',
    }: {
        id: string,
        label: string,
        placeholder?: string,
        options: string[],
        className?: string
    }) => {
        return (
            <div className={`flex items-center gap-3 border-b border-b-gray-100 px-6 py-4 ${className}`}>
                <Label htmlFor={id} className='min-w-3/12 text-gray-600'>
                    {label}
                </Label>

                <Select disabled={!isEditMode}>
                    <SelectTrigger
                        id={id}
                        className='bg-gray-50 focus:bg-white w-full'
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>

                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    };

    return (
        <div className='bg-white border border-gray-200/30 rounded-xl'>
            <div className='border-b pb-6 flex justify-between items-center p-6'>
                <div>
                    <h4 className='font-medium'>Personal information</h4>
                    <p className='text-sm text-gray-500'>
                        Update your name, email, and academic details
                    </p>
                </div>

                <Button onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? 'Save profile' : 'Edit profile'}</Button>
            </div>

            <form>
                <FormField
                    id="full_name"
                    label="Full name"
                    placeholder="Your full name"
                />

                <FormField
                    id="email"
                    type='email'
                    label="Email address"
                    placeholder="Your email address"
                />

                <FormField
                    id="school"
                    label="School"
                    placeholder="Name of the institution"
                />

                <SelectField
                    id="program"
                    label="Program type"
                    placeholder="Select program type"
                    options={['ADN', 'BSN', 'LPN', 'ABSN']}
                />

                <FormField
                    id="expected_graduation"
                    label="Expected graduation"
                    placeholder="e.g, Summer 2026"
                />
            </form>
        </div>
    );
};

export default UserForm;