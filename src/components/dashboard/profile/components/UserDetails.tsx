import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IUser } from '@/types/User';

interface UserDetailsProps {
    user: IUser | undefined,
}

const UserDetails = ({ user }: UserDetailsProps) => {
    const tags: { type: string, value: string | undefined }[] = [
        { type: 'program_type', value: user?.program_type },
        { type: 'school', value: user?.school },
        { type: 'expected_graduation', value: user?.expected_graduation }
    ]
    const userAttr = user?.fullName.split(" ").map(n => n[0]).join("");
    return (
        <div className='space-y-6'>
            <section className='flex items-center gap-4 max-sm:flex-col max-sm:text-center bg-white border border-gray-200/30 rounded-xl p-6'>
                <Avatar className='w-20 h-20'>
                    <AvatarImage />
                    <AvatarFallback className='bg-teal-600 text-white font-semibold text-2xl'>{userAttr}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className='font-bold text-2xl mb-1'>{user?.fullName}</h3>
                    <p className='text-gray-600'>{user?.email}</p>
                    <ul className='flex items-center gap-2 max-sm:flex-col mt-3'>
                        {tags.map(tag => (
                            tag.value && <li key={tag.type} className={`px-3 py-0.5 rounded-full border font-medium text-sm 
                                ${tag.type == 'program_type' ? 'bg-teal-200/20 text-teal-500 border-teal-200/70' :
                                    tag.type == 'school' ? 'bg-blue-200/20 text-blue-500 border-blue-200/70' :
                                        'bg-slate-200/20 text-slate-500 border-slate-200/70'
                                }`}>
                                {tag.value}
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default UserDetails;