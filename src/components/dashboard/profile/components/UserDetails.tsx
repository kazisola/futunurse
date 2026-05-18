import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IUser } from '@/types/User';
import axios from 'axios';

interface UserDetailsProps {
    user: IUser | null,
    setUser: Dispatch<SetStateAction<IUser | null>>
}

const UserDetails = ({ user, setUser }: UserDetailsProps ) => {
    useEffect(() => {
        const handleGetUser = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/user`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                setUser(response.data?.user)
            }
        }
        handleGetUser();
    }, []);
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
            <section className='grid grid-cols-3 max-md:grid-cols-2 gap-4'>
                <div className='bg-white border border-gray-200/30 rounded-xl p-5'>
                    <span className='uppercase text-gray-500 text-sm'>Program</span>
                    <h4 className='my-1 font-bold text-xl'>{user?.program_type}</h4>
                    <p className='text-gray-700 text-sm'>Degree track</p>
                </div>
                <div className='bg-white border border-gray-200/30 rounded-xl p-5'>
                    <span className='uppercase text-gray-500 text-sm'>Graduating</span>
                    <h4 className='my-1 font-bold text-xl'>{user?.expected_graduation || "N/A"}</h4>
                    <p className='text-gray-700 text-sm'>Expected graduation</p>
                </div>
                <div className='bg-white border border-gray-200/30 rounded-xl p-5'>
                    <span className='uppercase text-gray-500 text-sm'>Months left</span>
                    <h4 className='my-1 font-bold text-xl'>N/A</h4>
                    <p className='text-gray-700 text-sm'>Until graduation</p>
                </div>
            </section>
        </div>
    )
}

export default UserDetails;