import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { IUser } from '@/types/User';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FormField from './FormField';
import { toast } from 'react-toastify';

interface UserDetailsProps {
    user: IUser | null,
}

const UserForm = ({ user }: UserDetailsProps) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const [userData, setUserData] = useState<IUser>({
        email: '',
        fullName: '',
        program_type: undefined,
        expected_graduation: '',
        school: ''
    })

    useEffect(() => {
        if (user) {
            setUserData({
                email: user?.email || '',
                fullName: user?.fullName || '',
                program_type: user?.program_type || undefined,
                expected_graduation: user?.expected_graduation || '',
                school: user?.school || ''
            })
        }
    }, [user])

    const handleUpdateUser = async () => {
        console.log("user Data:", userData)
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE}/api/user`, { ...userData }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("response:", response);
            if(response.status === 200) {
                setIsEditMode(false);
                toast.success("Updated profile successfully!")
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to update profile!")
        }
    }



    const SelectField = ({
        id,
        label,
        placeholder,
        options,
        className = '',
        value,
        onChange
    }: {
        id: string,
        label: string,
        placeholder?: string,
        options: string[],
        className?: string,
        value?: string,
        onChange: (value: string) => void
    }) => {
        return (
            <div className={`flex sm:items-center gap-3 max-sm:flex-col border-b border-b-gray-100 px-6 py-4 ${className}`}>
                <Label htmlFor={id} className='min-w-3/12 text-gray-600'>
                    {label}
                </Label>

                <Select disabled={!isEditMode} value={value} onValueChange={onChange}>
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
                {isEditMode ? (
                    <div className='flex items-center gap-2'>
                        <Button type='reset' onClick={() => setIsEditMode(false)} variant={'outline'}>Cancel</Button>
                        <Button type='submit' onClick={handleUpdateUser}>Save profile</Button>
                    </div>
                )
                    :
                    <Button type='button' onClick={() => setIsEditMode(true)}>Edit profile</Button>
                }

            </div>

            <form>
                <FormField
                    id="full_name"
                    label="Full name"
                    placeholder="Your full name"
                    value={userData.fullName}
                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                    disabled={!isEditMode}
                />

                <FormField
                    id="email"
                    type='email'
                    label="Email address"
                    placeholder="Your email address"
                    defaultValue={userData.email}
                    disabled={true}
                />

                <FormField
                    id="school"
                    label="School"
                    placeholder="Name of the institution"
                    value={userData.school}
                    onChange={(e) => setUserData({ ...userData, school: e.target.value })}
                    disabled={!isEditMode}
                />

                <SelectField
                    id="program"
                    label="Program type"
                    placeholder="Select program type"
                    options={['ADN', 'BSN', 'LPN', 'ABSN']}
                    value={userData.program_type}
                    onChange={(value) => setUserData({... userData, program_type: value as IUser['program_type']})}
                />

                <FormField
                    id="expected_graduation"
                    label="Expected graduation"
                    placeholder="e.g, Summer 2026"
                    value={userData.expected_graduation}
                    onChange={(e) => setUserData({ ...userData, expected_graduation: e.target.value })}
                    disabled={!isEditMode}
                />
            </form>
        </div>
    );
};

export default UserForm;